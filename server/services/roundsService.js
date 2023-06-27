const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const {
    StatusCodes,
    getReasonPhrase
} = require('http-status-codes');
const Billboard100 = require('./billboard-top-100');
const Constants = require('../utils/constants');
const Utils = require('../utils/utils.js');
const {removeAnswersFromGame} = require("../utils/utils");

const allGamesState = [];
let chart;

const getRandomDateString = () => {
    function randomValueBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    const date1 = new Date('01-01-2005').getTime();
    const date2 = new Date().getTime()

    return new Date(randomValueBetween(date2, date1)).toISOString().slice(0, 10);
};

const getLyrics = async (artistName, songName) => {
    const options = {
        params: {
            format: 'json',
            callback: 'callback',
            q_artist: artistName,
            q_track: songName,
            apikey: Constants.LYRICS_API_KEY
        }
    };

    try {
        const URL = Constants.LYRICS_API_BASE_URL + Constants.LYRIC_MATCHER;
        const response = await axios.get(URL, options);

        return {
            ok: response.data.message?.header?.status_code === 200,
            status: response.data.message?.header?.status_code || response.status,
            data: JSON.stringify(response.data.message.body?.lyrics?.lyrics_body)
        };
    } catch (err) {
        return {
            ok: false,
            status: err instanceof TypeError ? 400 : err.code,
            data: {
                message: 'Failed to get lyrics',
                err: err
            }
        };
    }
};

const getRandomSongs = async () => {
    if(!chart || !chart.data?.songs?.length || chart.data.songs.length <= 10) {
        chart = await Billboard100.getChart('hot-100', getRandomDateString());
        Utils.shuffleArray(chart.data.songs)
    }

    if (!chart.ok) {
        return {
            ok: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: {
                message: 'Failed to get random billboard songs',
                err: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            }
        };
    }

    const chosenSongs = [];

    while(chosenSongs.length < 10) {
        chosenSongs.push(chart.data.songs.pop());
    }

    return {
        ok: true,
        status: StatusCodes.OK,
        data: chosenSongs
    };
};

const generateRoundData = async () => {
    let attempts = 0;
    let songs;

    while (attempts < 3) {
        const songsResponse = await getRandomSongs();

        if (songsResponse.ok) {
            songs = songsResponse.data;
            break;
        }

        attempts++;
    }

    if (!songs) {
        return {
            ok: false,
            status: StatusCodes.SERVICE_UNAVAILABLE,
            data: {
                message: 'Error while fetching songs',
                err: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE)
            }
        };
    }

    attempts = 0;
    let selectedSong;
    let lyrics;
    while (attempts < 3) {
        const chosenIndex = Math.floor(Math.random() * songs.length);

        selectedSong = songs[chosenIndex];

        const lyricsResponse = await getLyrics(selectedSong.artist, selectedSong.title);
        if (lyricsResponse.ok) {
            lyrics = lyricsResponse.data;
            songs.splice(chosenIndex, 1);

            break;
        }
    }

    if (!lyrics) {
        return {
            ok: false,
            status: StatusCodes.SERVICE_UNAVAILABLE,
            data: {
                message: 'Failed to get lyrics',
                err: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE)
            }
        };
    }

    const choices = songs.slice(0, 3)

    choices.push(selectedSong)

    return {
        ok: true,
        status: StatusCodes.OK,
        data: {
            roundId: uuidv4(),
            correctAnswer: selectedSong,
            options: choices.map(song => {
                return {artist: song.artist, title: song.title, cover: song.cover}
            }),
            isCorrect: false,
            lyrics: lyrics
        }
    };
};

exports.generateGameData = async () => {
    const newGame = {};
    const rounds = [];

    while (rounds.length < 5) {
        const response = await generateRoundData();
        if(response.ok)
        rounds.push(response.data);
    }

    newGame.gameId = uuidv4();
    newGame.rounds = rounds;

    if (!newGame || !newGame.gameId || !newGame.rounds) {
        throw 'Failed to generate game data';
    } else {
        allGamesState.push(newGame);
        const userGame = removeAnswersFromGame(newGame);

        return {
            ok: true,
            status: StatusCodes.OK,
            data: {
                gameId: userGame.gameId,
                rounds: userGame.rounds
            }
        };
    }
};

const generateRoundResult = (answer, round, gameId) => {
    try {
        const result = answer.title === round.correctAnswer.title && answer.artist === round.correctAnswer.artist;
        
        console.log(answer);
        console.log(round.correctAnswer);

        if (result) {
            const matchingGame = allGamesState.find((game) => gameId === game.gameId);
            matchingGame.rounds.find((r) => r.roundId === round.roundId).isCorrect = true;
        }

        return {
            ok: true,
            status: StatusCodes.OK,
            data: {
                isCorrect: result
            }
        }
    } catch (err) {
        return {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            data: {
                message: 'Failed to process result',
                err: err.message
            }
        }
    }
}

exports.processRoundAnswer = (body) => {
    const gameId = body?.gameId;
    const roundId = body?.roundId;
    const answer = body?.answer;

    let errorMessage;
    let matchingRound;

    if (!gameId || !answer || !roundId || !answer.artist || !answer.title) {
        return {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            data: {
                message: 'Invalid game answer. Please check the request you are submitting to this server',
                error: getReasonPhrase(StatusCodes.BAD_REQUEST)
            }
        };
    }

    const matchingGame = allGamesState.find((game) => gameId === game.gameId);

    if (!matchingGame) {
        errorMessage = 'Invalid Game ID';
    } else {
        matchingRound = matchingGame.rounds.find((round) => roundId === round.roundId);

        if(!matchingRound) {
            errorMessage = 'Invalid Round ID';
        }
    }

    if (!errorMessage) {
        return generateRoundResult(answer, matchingRound, gameId);
    } else {
        return {
            ok: false,
            status: StatusCodes.NOT_FOUND,
            data: {
                message: errorMessage,
                error: getReasonPhrase(StatusCodes.NOT_FOUND)
            }
        }
    }
};

exports.getScore = (gameId) => {

    const matchingGame = allGamesState.find((game) => gameId === game.gameId);
    let errorMessage;

    if (!matchingGame) {
        errorMessage = 'Invalid Game ID';
    } else {

        let resp = [];

        matchingGame.rounds.forEach(r => {

            let round = {}

            round = {
                lyrics: r.lyrics,
                yourAnswer: r.correctAnswer,
                isCorrect: r.isCorrect
            }

            resp.push(round);
        });

        return resp;
    }
}
