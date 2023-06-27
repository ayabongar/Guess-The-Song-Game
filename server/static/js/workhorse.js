const mainUrl = "http://localhost:8080";

let game = { }

function logoutExecute() {
    console.log("logging out");
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    location.href = "/authenticate";
}

async function getGame() {

    console.log("getting game");

    let config = {
        withCredentials: true
    }

    const result = await axios.get(
        mainUrl + "/getGame",
        config
    );

    console.log(result);

    game = result.data;
}

function getNextRound() {
    return (game.rounds.length > 0)? game.rounds.shift() : undefined;
}

async function submitAnswer(roundID, title, artist) {

    let config = {
        withCredentials: true
    }

    let data = {
        gameId: game.gameId,
        roundId: roundID,
        answer: {
            artist: artist,
            title: title
        }
    }

    console.log(data);

    const result = await axios.post(
        mainUrl + "/submit",
        data,
        config
    );

    const nextRound = getNextRound();

    if (nextRound == undefined) {

        data = {
            gameId: game.gameId,
            username: getCookie("user")
        }

        const result = await axios.post(
            mainUrl + "/add-score",
            data,
            config
        );

        await switchScore();
        return;
    }

    await switchRound(nextRound.roundId, nextRound.lyrics, nextRound.options);
}

async function getScore() {

    let config = {
        withCredentials: true
    }

    let data = {
        "gameId": game.gameId
    }

    const result = await axios.post(
        mainUrl + "/score",
        data,
        config
    );

    console.log(result.data);

    return result.data;
}

async function getPastGames() {

    let config = {
        withCredentials: true
    }

    const result = await axios.get(
        mainUrl + "/past-scores?userId=" + document.cookie.username,
        config
    );

    return result.data;
}