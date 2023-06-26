module.exports = (app) => {
    const staticResourceController = require("../controllers/StaticResourceController")
    
    /* Pages */
    app.get("/", staticResourceController.getHomePage);
    app.get("/authenticate", staticResourceController.getAuthPage);
}
