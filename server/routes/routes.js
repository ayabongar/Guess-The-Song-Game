module.exports = (app) => {
    const userController = require("../controllers/userController");
    const scoreController = require("../controllers/scoreController");
    const staticResourceController = require("../controllers/StaticResourceController")
    
    //parameters in the query
    app.get('/users', userController.findAll);
    app.get('/scores/create', scoreController.createScore); 
    app.get('/scores', scoreController.findAll);
    app.get('/score/user', scoreController.findByUserId);
    app.get('/score/updatePoints', scoreController.updateScore);


    /* Pages */
    app.get("/", staticResourceController.getHomePage);
    app.get("/authenticate", staticResourceController.getAuthPage);
}
