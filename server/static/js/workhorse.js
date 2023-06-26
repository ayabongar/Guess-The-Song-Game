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

function getGame() {
    const result = {
        gameID: "example",
        rounds: [
            {
                roundId: "1",
                lyrics: "Baby, bay, baby.. ohhh",
                options: [
                    {
                        artist: "Justin Bieber",
                        title: "Baby"
                    },
                    {
                        artist: "Post Malone",
                        title: "Love Me"
                    },
                    {
                        artist: "John Cena",
                        title: "Goodness"
                    },
                    {
                        artist: "Bob",
                        title: "FML"
                    }
                ]
            },
            {
                roundId: "2",
                lyrics: "'Got so much wood I can build me a fort",
                options: [
                    {
                        artist: "Justin Bieber",
                        title: "Baby"
                    },
                    {
                        artist: "Post Malone",
                        title: "Love Me"
                    },
                    {
                        artist: "John Cena",
                        title: "Goodness"
                    },
                    {
                        artist: "Bob",
                        title: "FML"
                    }
                ]
            }
        ]
    }

    game = result;
}

function getNextRound() {
    return (game.rounds.length > 0)? game.rounds.shift() : undefined;
}

async function submitAnswer(roundID, title, artist) {

    //send gameID too

    const result = {
        isCorrect: true
    }

    const nextRound = getNextRound();

    if (nextRound == undefined) {
        await switchScore();
        return;
    }

    await switchRound(nextRound.roundID, nextRound.lyrics, nextRound.options);
}

async function getScore() {

    let config = {
        withCredentials: true
    }

    const result = await axios.get(
        mainUrl + "/score",
        config
    );

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

    console.log(result);

    return result.data;
}