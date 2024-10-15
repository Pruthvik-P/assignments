const fs = require("fs");

async function cleanFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err){
            console.error('Error reading the file:', err);
            return;
        }
    })
    const cleaner = data.replace(/\s+/g, ' ').trim();
}