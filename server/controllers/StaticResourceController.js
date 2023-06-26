const path = require("path");

const fileReaderService = require("../services/FileReaderService");

const getHomePage = (req, res) => {
    pipeToRes("home.html", res);
}

const getAuthPage = (req, res) => {
    pipeToRes("authentication.html", res);
}

function pipeToRes(filename, res) {
    const fileStream = fileReaderService.readFileStream(path.resolve("./", "static", "html", filename));
    fileStream.pipe(res);
}

module.exports = {
    getHomePage,
    getAuthPage
}