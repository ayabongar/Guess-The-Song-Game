const fs = require('fs');

function readFile(filePath) {
    return fs.readFileSync(filePath);
}

function readFileStream(filePath) {
    return fs.createReadStream(filePath);
}

module.exports = {
    readFile,
    readFileStream
}