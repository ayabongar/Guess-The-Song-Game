import path from 'path'
import url from 'url'

import * as AuthService from '../services/AuthService.js'
import { readFileStream } from '../services/FileReaderService.js';

const rootPath = path.resolve("./", "static");
console.log(rootPath);

export const homePage = async (req, res) => {

    res.setHeader("Content-Type", "text/html");

    try {
        const result = await AuthService.verify(req.cookies.token);
        const fileStream = readFileStream(path.resolve(rootPath, "html", "home.html"));
        fileStream.pipe(res);
    }
    catch (error) {
        loginPage(req, res);
    }
}

export const loginPage = (req, res) => {
    const fileStream = readFileStream(path.resolve(rootPath, "html", "login.html"));
    fileStream.pipe(res);
}