const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class UploadService {
    constructor(uploadDir = 'exports') { // Changed the default directory to 'exports'
        this.uploadDir = uploadDir;

        // Ensure the upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    // Save a file to the uploads directory
    async saveFile(file) {
        const fileId = uuidv4(); // Generate a unique file ID
        const extension = path.extname(file.originalname);
        const filename = `${fileId}${extension}`;
        const filepath = path.join(this.uploadDir, filename);

        // Write the file buffer to the specified filepath
        await fs.promises.writeFile(filepath, file.buffer);

        return {
            id: fileId,
            originalName: file.originalname,
            fileName: filename,
            filePath: filepath,
            mimeType: file.mimetype,
        };
    }

    // Retrieve a file by its ID
    getFile(fileId) {
        const files = fs.readdirSync(this.uploadDir); // Read all files in the directory
        const file = files.find(f => f.startsWith(fileId));

        if (!file) {
            throw new Error('File not found');
        }

        const filepath = path.join(this.uploadDir, file);

        return {
            filepath,
            contentType: this.getContentType(filepath)
        };
    }

    // Get the content type of a file based on its extension
    getContentType(filepath) {
        const extension = path.extname(filepath).toLowerCase();
        const types = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.pdf': 'application/pdf',
        };

        return types[extension] || 'application/octet-stream';
    }
}

module.exports = new UploadService();
