const connection = require('../dbService/conn');

exports.getPastScores = (req, res) => {
    let sql = "SELECT game_id, user_id, score, overall_result, Date FROM Game WHERE user_id = ?";

    connection.query(sql, req.query.userId, function (err, results) {
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

