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

function submitAnswer(roundID, title, artist) {

    //send gameID too

    const result = {
        isCorrect: true
    }

    const nextRound = getNextRound();

    if (nextRound == undefined) {
        switchScore();
        return;
    }

    switchRound(nextRound.roundID, nextRound.lyrics, nextRound.options);
}

function getScore() {
    const result = [
        {
            roundID: "1",
            lyrics: "Baby, bay, baby.. ohhh",
            yourAnswer: {
                artist: "Justin Bieber",
                title: "Baby"
            },
            isCorrect: true
        },
        {
            roundID: "2",
            lyrics: "'Got so much wood I can build me a fort",
            yourAnswer: {
                artist: "Bob",
                title: "FML"
            },
            isCorrect: false
        }
    ]

    return result;
}

function getPastGames() {
    const result = {
        rating: 50,
        games: [
            {
                date: "22/07/2023",
                score: 5,
                total : 10
            },
            {
                date: "22/20/2023",
                score: 3,
                total : 6
            }
        ]
    }

    return result;
}