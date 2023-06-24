import { getGameRoundData, getRoundResult } from "../services/songService.js";

export const startNewRound = async (req, res) => {
    const roundData = await getGameRoundData();

    res.status(roundData.status);
    res.json(roundData);
};

export const checkRoundResponse = async (req, res) => {
    const result = await getRoundResult(req.params.roundId, req.body);

    res.status(result.status);
    res.json(result);
};
