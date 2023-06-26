const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const routes = require("./routes/routes");
const authMiddleware = require("./middleware/AuthMiddleware");

const serverPort = process.env.SERVER_PORT || 8080;

const app = express();

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static", "js")));
app.use(express.static(path.resolve(__dirname, "static", "css")));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

//app.use(authMiddleware.verifyRequest);

routes(app);

app.listen(serverPort, function () {
    console.log(`Server is running on port ${serverPort}...`);
});