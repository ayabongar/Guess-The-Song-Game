const roundsService = require('../services/roundsService');
const {
    StatusCodes,
    getReasonPhrase,
} = require('http-status-codes');
const e = require("express");

exports.createGame = async (req, res) => {
    let result;

    try {
        result = await roundsService.generateGameData();

        if(!result) {
            throw new Error('Failed to generate game data');
        } else if(!result.ok && !result.data.stackTrace) {
            res.status(StatusCodes.SERVICE_UNAVAILABLE);
            res.json({
                ok: false,
                message: 'Server error while generating new game',
                error: {
                    code: StatusCodes.SERVICE_UNAVAILABLE,
                    message: err.message || getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE)
                }
            });
            return;
        } else if(!result.ok) {
            res.status(result.status || StatusCodes.INTERNAL_SERVER_ERROR);
            delete result.status;
            res.json(result);
            return;
        }
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({
            ok: false,
            message: 'Server error while generating new game',
            error: {
                code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
                message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                stackTrace: err.stack,
                caughtIn: 'GameController::createGame()'
            }
        });
        return;
    }

    res.status(result.status);
    res.json(result.data);
};

exports.submitAnswer = async (req, res) => {
    const result = await roundsService.processRoundAnswer(req.body);

    res.status(result.status);
    res.json(result.data);
};

exports.getScore = async (req, res) => {

    const result = roundsService.getScore(req.body.gameId);
    res.status(200);
    res.json(result);
}
