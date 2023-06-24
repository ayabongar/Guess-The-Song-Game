import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    StatusCodes,
    getReasonPhrase
} from "http-status-codes";
import {getChart} from './billboard-top-100.js';
import constants from '../utils/constants.js';
import {shuffleArray} from "../utils/utils.js";

let savedRoundId;
let correctAnswer;

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
            apikey: constants.LYRICS_API_KEY
        }
    };

    try {
        const URL = constants.LYRICS_API_BASE_URL + constants.LYRIC_MATCHER;
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
    const chart = await getChart('hot-100', getRandomDateString());

    if (!chart.ok) {
        console.log(`Error ${err.code} while getting random songs: ${err.message}`);
        return {
            ok: false,
            status: err.code || 424,
            data: {
                message: 'Failed to get random billboard songs',
                err: err.message
            }
        };
    }

    return {
        ok: true,
        status: StatusCodes.OK,
        data: shuffleArray(chart?.data?.songs).slice(0, 10)
    };
};

export const getGameRoundData = async () => {
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

    savedRoundId = uuidv4();
    correctAnswer = selectedSong;

    const choices = songs.slice(0, 3)

    choices.push(selectedSong)

    return {
        ok: true,
        status: StatusCodes.OK,
        data: {
            roundId: savedRoundId,
            options: choices.map(song => {
                return {artist: song.artist, title: song.title, cover: song.cover}
            }),
            lyrics: lyrics
        }
    };
};

export const getRoundResult = (roundId, answer) => {
    if(!roundId || !answer || !answer.artist || !answer.title) {
        return {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            data: {
                message: 'Invalid response. Please check the response you are submitting to this server',
                err: getReasonPhrase(StatusCodes.BAD_REQUEST)
            }
        };
    }

    try {
        let message;
        let result;

        if(roundId === savedRoundId) {
            message = "CORRECT";
            result = true;
        } else {
            message = "WRONG"
            result = false;
        }

        return {
            ok: true,
            status: 201,
            data: {
                message: message,
                result: result
            }
        }
    } catch(err) {
        return {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            data: {
                message: 'Failed to process result',
                err: err.message
            }
        }
    }
};
