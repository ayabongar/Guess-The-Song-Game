const express = require("express");
const cors = require("cors");
require('dotenv').config();
const routes = require("./routes/routes");

const serverPort = process.env.SERVER_PORT;

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

routes(app);

app.listen(serverPort, function () {
    console.log(`Server is running on port ${serverPort}...`);
}); 