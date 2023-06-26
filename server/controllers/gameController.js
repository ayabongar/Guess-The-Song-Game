const roundsService = require('../services/roundsService');
const {
    StatusCodes,
    getReasonPhrase,
} = require('http-status-codes');

exports.createGame = async (req, res) => {
    let result;

    try {
        result = await roundsService.generateGameData();

        if(!result) {
            throw 'Failed to generate game data';
        } else if(!result.ok) {
            res.status(StatusCodes.SERVICE_UNAVAILABLE);
            res.json({
                ok: false,
                message: 'Server error while generating new game',
                error: {
                    code: StatusCodes.SERVICE_UNAVAILABLE,
                    message: err.message || getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE)
                }
            });
        }
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.json({
            ok: false,
            message: 'Server error while generating new game',
            error: {
                code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
                message: err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
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
