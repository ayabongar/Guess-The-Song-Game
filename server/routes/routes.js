module.exports = (app) => {
    const staticResourceController = require("../controllers/StaticResourceController");
    const userController = require("../controllers/userController");
    const gameController = require("../controllers/GameController");

    //Game
    app.get("/past-scores", userController.getPastScores);
    app.get("/score", userController.getScore);

    app.get("/getGame", gameController.createGame);
    app.post("/submit", gameController.submitAnswer);

    /* Pages */
    app.get("/", staticResourceController.getHomePage);
    app.get("/authenticate", staticResourceController.getAuthPage);
}
