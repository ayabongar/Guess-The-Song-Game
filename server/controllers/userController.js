const connection = require('../dbService/conn');
const roundsService = require('../services/roundsService');

exports.getPastScores = (req, res) => {
    let sql = "SELECT username, score, overall_result, date FROM Game WHERE username = ?";

    console.log(req.query.username);

    connection.query(sql, [req.query.username], function (err, results) {
        if (err) throw err;
        console.log(results);

        let current = 0;
        let max = 0;

        results.forEach(r => {
            current+= Number(r.score);
            max+= Number(r.overall_result);
        });

        res.json({
            rating: Math.round( current / max * 100),
            games: results
        });
    });
}

exports.insertScore = (req, res) => {
    let gameId = req.body.gameId;
    let username = req.body.username;
    let {score, amount} = roundsService.getGameScore(req.body.gameId);
    let date = Date.now();

    const parameters = [gameId, username, score, amount, date];
    let sql = "INSERT INTO Game (game_id, username, score, overall_result, date) VALUES (?,?,?,?,?)";

    connection.query(sql, parameters, function (err, results) {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
}

exports.getScore = (req, res) => {
    const result = [
        {
            roundID: "1",
            lyrics: "Baby, bay, baby... ohhh",
            yourAnswer: {
                artist: "Justin Bieber",
                title: "Baby"
            },
            isCorrect: true
        },
        {
            roundID: "2",
            lyrics: "Got so much wood I can build me a fort",
            yourAnswer: {
                artist: "Bob",
                title: "FML"
            },
            isCorrect: false
        },
        {
            roundID: "3",
            lyrics: "Hush little baby dont you cry, everything is gonna be alright",
            yourAnswer: {
                artist: "Eminem",
                title: "Mockingbird"
            },
            isCorrect: true
        },
        {
            roundID: "4",
            lyrics: "Christian Dior Dior...",
            yourAnswer: {
                artist: "Hopsin",
                title: "Illmind 6"
            },
            isCorrect: false
        }
    ];

    res.json(result);
}

