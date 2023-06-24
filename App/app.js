import './src/config.js'
import express from 'express';
import cookieParser from 'cookie-parser';

import * as AuthController from './src/controllers/AuthController.js'
import * as StaticResourceController from './src/controllers/StaticResourceController.js'


const App = express();
App.use(cookieParser());
App.use(express.static('static'));

const Port = process.env.Port || 8080;

/* Pages */
App.get("/", StaticResourceController.loginPage);
App.get("/home", StaticResourceController.homePage);
App.get("/login", StaticResourceController.loginPage);

App.post("/secure", AuthController.verifyUser);

App.listen(Port, () => {
    console.log("App listening on port: " + Port);
});