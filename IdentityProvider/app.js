/* Imports */
import './src/config.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';


import * as AuthController from './src/controller/AuthController.js';


const App = express();
App.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
App.use(express.json());
App.use(cookieParser());

const Port = process.env.PORT || 8081;


App.post("/register", AuthController.register);
App.post("/authenticate", AuthController.login);
App.post("/verify", AuthController.authorize);


App.listen(Port, () => {
    console.log("Identity server running on port: " + Port);
});