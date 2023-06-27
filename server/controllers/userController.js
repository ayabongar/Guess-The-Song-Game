const connection = require('../dbService/conn');

exports.getPastScores = (req, res) => {
    let sql = "SELECT game_id, username, score, overall_result, Date FROM Game WHERE username = ?";

    connection.query(sql, req.query.username, function (err, results) {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
}

exports.insertScore = (req, res) => {
    let gameId = req.query.gameId;
    let username = req.query.username;
    let score = req.query.score;
    let overallResult = req.query.overallResult;
    let date = req.query.date;

    const parameters = [gameId, username, score, overallResult, date];
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

