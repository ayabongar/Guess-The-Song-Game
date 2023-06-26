let AllGames = undefined;

setMap();

function setMap() {
    if (AllGames == undefined)
        AllGames = new Map();
}

const createGame = (req, res) => {

    const gameID = AllGames.size + Date.now();

    const clientGame = {
        gameID: gameID,
        rounds: [
            {
                roundId: "0",
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
                roundId: "1",
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

    const game = {
        gameID: gameID,
        rounds: [
            {
                roundId: "0",
                lyrics: "Baby, bay, baby.. ohhh",
                isCorrect: false,
                options: [
                    {
                        artist: "Justin Bieber",
                        title: "Baby",
                        isCorrect: true
                    },
                    {
                        artist: "Post Malone",
                        title: "Love Me",
                        isCorrect: false
                    },
                    {
                        artist: "John Cena",
                        title: "Goodness",
                        isCorrect: false
                    },
                    {
                        artist: "Bob",
                        title: "FML",
                        isCorrect: false
                    }
                ]
            },
            {
                roundId: "1",
                isCorrect: false,
                lyrics: "'Got so much wood I can build me a fort",
                options: [
                    {
                        artist: "Justin Bieber",
                        title: "Baby",
                        isCorrect: false
                    },
                    {
                        artist: "Post Malone",
                        title: "Love Me",
                        isCorrect: false
                    },
                    {
                        artist: "John Cena",
                        title: "Goodness",
                        isCorrect: false
                    },
                    {
                        artist: "Bob",
                        title: "FML",
                        isCorrect: true
                    }
                ]
            }
        ]
    }

    AllGames.set(gameID, game);

    res.json(clientGame);
}

const submitAnswer = (req, res) => {

    const game = AllGames.get(req.body.gameId);

    let correct = {}

    console.log(AllGames);
    console.log(game);
    console.log(game.rounds[req.body.roundId].options);

    game.rounds[req.body.roundId].options.forEach(o => {
        if (o.isCorrect) {
            correct = {
                artist: o.artist,
                title: o.title
            }
        }
    });

    if (req.body.answer.title == correct.title && req.body.answer.artist == correct.artist) {
        AllGames.get(req.body.gameId).rounds[req.body.roundId].isCorrect = true;
        console.log(AllGames);
        res.json({
            isCorrect: true
        });
        return;
    }

    res.json({
        isCorrect: false
    });
}

module.exports = {
    createGame,
    submitAnswer
}