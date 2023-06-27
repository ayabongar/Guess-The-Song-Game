import fs from 'fs'

export function readFile(filePath) {
    return fs.readFileSync(filePath);
}

export function readFileStream(filePath) {
    return fs.createReadStream(filePath);
}