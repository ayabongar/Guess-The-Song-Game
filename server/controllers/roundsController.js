const roundsService = require("../services/roundsService");

exports.startNewRound = async (req, res) => {
    const roundData = await roundsService.getGameRoundData();

    res.status(roundData.status);
    res.json(roundData);
};

exports.checkRoundResponse = async (req, res) => {
    const result = await roundsService.getRoundResult(req.params.roundId, req.body);

    res.status(result.status);
    res.json(result);
};
