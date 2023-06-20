/* Imports */
import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { config } from 'dotenv';


/* Setups */
config();

const App = express();
App.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
App.use(express.json());
App.use(cookieParser());

const Port = process.env.Port || 8040;


App.post("/authenticate", (req, res) => {

    const { username, password } = req.body;

    if (username == "admin" && password == "admin") {
        res.cookie('token', jsonwebtoken.sign({ user: "admin" }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME}), { httpOnly: true });
        return res
            .status(200)
            .json({ message: "Success" });
    }
    
    return res
        .status(401)
        .json({ message: "The username or password is invalid" });
});

App.post("/verify", (req, res) => {

    if (!req.headers.authorization)
        return res
            .status(401)
            .json({ error: "Not Authorized: Authorization Header Not Set" });
    
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[0];

        const { user } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return res
            .status(200)
            .json({ result: user });
    }
    catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ error: "Not Authorized: Verification Failed" });
    }
});


App.listen(Port, () => {
    console.log("Identity server running on port: " + Port);
});