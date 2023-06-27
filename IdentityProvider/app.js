/* Imports */
import './src/config.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';


import * as AuthController from './src/controller/AuthController.js';


const App = express();

App.use(express.json());
App.use(cookieParser());
App.use((req, res, next) => {
  const allowedOrigins = ["https://i7vwspeb2s.us-east-1.awsapprunner.com", "http://localhost:8080"]
  if (allowedOrigins.includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const Port = process.env.PORT || 8081;


App.post("/register", AuthController.register);
App.post("/authenticate", AuthController.login);
App.post("/verify", AuthController.authorize);


App.listen(Port, () => {
    console.log("Identity server running on port: " + Port);
});