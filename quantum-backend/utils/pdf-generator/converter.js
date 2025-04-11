const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generatePDF(data, outputPath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(outputPath);
        
        doc.pipe(stream);
        
        // PDF Metadata
        doc.info.Title = 'Receipt Export';
        doc.info.Author = 'Receipt Processor';

        // Header
        doc.font('Helvetica-Bold')
           .fontSize(18)
           .text('Receipt Details', { align: 'center' });
        doc.moveDown();

        // Data Table
        const tableTop = doc.y;
        const rowHeight = 20;
        const colWidth = 250;

        // Table Headers
        doc.font('Helvetica-Bold')
           .fillColor('#3498db')
           .text('Field', 50, tableTop)
           .text('Value', 50 + colWidth, tableTop);

        // Table Rows
        doc.font('Helvetica')
           .fillColor('black');

        Object.entries(data).forEach(([key, value], i) => {
            const y = tableTop + (i + 1) * rowHeight;
            
            // Alternate row background
            if (i % 2 === 0) {
                doc.rect(50, y, 500, rowHeight)
                   .fillColor('#f2f2f2')
                   .fill()
                   .fillColor('black');
            }
            
            doc.text(key, 50, y + 5)
               .text(String(value || 'N/A'), 50 + colWidth, y + 5);
        });

        doc.end();
        
        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
    });
}

// Command-line execution
if (require.main === module) {
    if (process.argv.length < 4) {
        console.error('Usage: node converter.js <input.json> <output.pdf>');
        process.exit(1);
    }

    const inputPath = process.argv[2];
    const outputPath = process.argv[3];

    try {
        const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
        generatePDF(data, outputPath)
            .then(() => process.exit(0))
            .catch(err => {
                console.error('PDF generation failed:', err);
                process.exit(1);
            });
    } catch (err) {
        console.error('Error processing input:', err);
        process.exit(1);
    }
}

module.exports = { generatePDF };