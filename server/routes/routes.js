module.exports = (app) => {
    const staticResourceController = require("../controllers/StaticResourceController");
    const userController = require("../controllers/userController");
    const gameController = require("../controllers/gameController");
    
    //Game
    app.get("/past-scores", userController.getPastScores);
    app.post("/score", gameController.getScore);
    app.post("/add-score", userController.insertScore);

    app.get("/getGame", gameController.createGame);
    app.post("/submit", gameController.submitAnswer);

    /* Pages */
    app.get("/", staticResourceController.getHomePage);
    app.get("/authenticate", staticResourceController.getAuthPage);
}
