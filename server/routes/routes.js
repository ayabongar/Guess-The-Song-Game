module.exports = (app) => {
    const userController = require("../controllers/userController");
    const staticResourceController = require("../controllers/StaticResourceController")
    
    //Game
    app.get("/users", userController.getAllUsers);
    app.get("/past-scores", userController.getPastScores);
    app.get("/score", userController.getScore);


    /* Pages */
    app.get("/", staticResourceController.getHomePage);
    app.get("/authenticate", staticResourceController.getAuthPage);
}
