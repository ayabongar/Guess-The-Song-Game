const userController = require("../controllers/userController");
const scoreController = require("../controllers/scoreController");
const roundsController = require("../controllers/roundsController.js");

module.exports = (app) => {

    //parameters in the query
    app.get('/users', userController.findAll);
    app.get('/scores/create', scoreController.createScore);
    app.get('/scores', scoreController.findAll);
    app.get('/score/user', scoreController.findByUserId);
    app.get('/score/updatePoints', scoreController.updateScore);

    app.get('/play/new', roundsController.startNewRound);
    app.get('/play/:roundId', roundsController.checkRoundResponse);
}
