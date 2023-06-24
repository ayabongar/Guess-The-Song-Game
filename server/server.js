import express from "express";
import * as cors from "cors";
import 'dotenv/config'
import {routes} from "./routes/routes.js";

const serverPort = process.env.SERVER_PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

routes(app);

app.listen(serverPort, function () {
    console.log(`Server is running on port ${serverPort}...`);
}); 
