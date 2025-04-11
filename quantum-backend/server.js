// Load environment variables from .env file before anything else
// This must be at the very top to ensure env vars are available throughout the application
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const collabService = require('./services/collabService');
const uploadService = require('./services/uploadService');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const exportsDir = path.join(__dirname, 'exports');
app.use('/exports', express.static(exportsDir));


const PORT = process.env.PORT || 3000; // Now uses PORT from .env if available

// Middleware Configuration
// -----------------------
// These middleware functions are executed for every request to the server

// Parse JSON bodies (for API requests)
app.use(bodyParser.json());

// Handle file uploads
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
    useTempFiles: false // Change to true for large files in production
}));

// Serve static files from public directory
app.use(express.static('public'));

// File Upload Endpoint
// -------------------
// Changed: Added more robust error handling and logging
const axios = require('axios');



const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const FormData = require('form-data'); // Import the form-data library

app.post('/api/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        // Ensure the 'temp' directory exists
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Save the uploaded file to the 'temp' directory
        const tempFilePath = path.join(tempDir, req.files.image.name);
        await req.files.image.mv(tempFilePath); // Move file to the temp folder
        console.log(`✅ File saved temporarily at: ${tempFilePath}`);

        // Prepare the form data using the form-data library
        const formData = new FormData();
        formData.append('image', fs.createReadStream(tempFilePath)); // Read the file for Python processing

        // Send image to Python service
        const response = await axios.post('http://localhost:5001/process-receipt', formData, {
            headers: formData.getHeaders(), // Correctly retrieve the headers
        });

        const { success, pdf_path, error } = response.data;

        if (success) {
            const downloadUrl = `http://localhost:5000/exports/${path.basename(pdf_path)}`;

            return res.json({ success: true, downloadUrl });
        } else {
            console.error('Python service error:', error);
            return res.status(500).json({ error: 'Failed to generate PDF' });
        }
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Server error during upload' });
    }
});






// File Download Endpoint
// ---------------------
// Changed: Added content-disposition header for better file naming
app.get('/api/download/:fileId', async (req, res) => {
    try {
        const { filepath, contentType } = await uploadService.getFile(req.params.fileId);
        const filename = path.basename(filepath);
        
        res.download(filepath, filename, {
            headers: {
                'Content-Type': contentType,
                // Added: Helps browsers handle file naming better
                'Content-Disposition': `attachment; filename="${filename}"`
            }
        });
    } catch (err) {
        console.error(`Download failed for file ${req.params.fileId}:`, err);
        res.status(404).json({ 
            error: err.message,
            code: 'FILE_NOT_FOUND'
        });
    }
});

// Collaboration Session Endpoints
// ------------------------------
// Changed: Added input validation and more detailed responses
app.post('/api/sessions', (req, res) => {
    try {
        if (!req.body.sessionId) {
            throw new Error('sessionId is required');
        }

        const session = collabService.createSession(
            req.body.sessionId,
            req.body.participants || []
        );
        
        console.log(`New session created: ${session.id}`);
        
        res.status(201).json({
            success: true,
            session,
            // Added: Helpful links for the new resource
            links: {
                join: `/api/sessions/${session.id}/join`,
                details: `/api/sessions/${session.id}`
            }
        });
    } catch (err) {
        console.error('Session creation error:', err);
        res.status(400).json({ 
            error: err.message,
            code: 'SESSION_CREATION_FAILED'
        });
    }
});

// PDF Generation Endpoint
// ----------------------
// Changed: Improved error handling and added environment-based configuration
app.post('/api/generate-pdf', async (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data) {
            throw new Error('No data provided');
        }

        // Added: Timeout protection for PDF generation
        const timeout = parseInt(process.env.PDF_GENERATION_TIMEOUT || '5000');
        
        const result = require('child_process').spawnSync('node', [
            'services/converter.js'
        ], {
            input: JSON.stringify(data),
            encoding: 'utf-8',
            timeout: timeout
        });

        if (result.error || result.status !== 0) {
            throw new Error(result.error || result.stderr);
        }

        const pdfPath = result.stdout.trim();
        
        // Added: Verify PDF was actually created
        if (!fs.existsSync(pdfPath)) {
            throw new Error('PDF file was not created');
        }

        res.download(pdfPath, path.basename(pdfPath), (err) => {
            if (err) {
                console.error('PDF download error:', err);
            }
            // Added: Error handling for file deletion
            try {
                fs.unlinkSync(pdfPath);
            } catch (unlinkErr) {
                console.error('Failed to cleanup PDF:', unlinkErr);
            }
        });
    } catch (err) {
        console.error('PDF generation failed:', err);
        res.status(500).json({ 
            error: err.message,
            code: 'PDF_GENERATION_FAILED',
            // Added: More details in development mode
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// Health Check Endpoint
// --------------------
// Added: Simple endpoint to verify server is running
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '1.0.0'
    });
});

// Start Server
// -----------
// Changed: Added more detailed startup logging
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`PDF Generation Timeout: ${process.env.PDF_GENERATION_TIMEOUT || '5000'}ms`);
    
    // Added: Verify required services
    try {
        fs.accessSync('utils/pdf-generator/converter.js', fs.constants.R_OK);
        console.log('PDF converter service is available');
    } catch (err) {
        console.error('WARNING: PDF converter service not found');
    }
});