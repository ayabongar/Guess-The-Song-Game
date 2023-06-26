const connection = require("../dbService/conn");

exports.findAll = (req, res) => {
    connection.query(`SELECT [id]
        ,[user_id]
        ,[songs_number]
        ,[time_spent]
        ,[points]
        FROM [GuessDB].[dbo].[Score]`, function (err, recordset) {

        if(err) console.log(err);

        res.send(recordset);
    });
}

exports.findByUserId = (req, res) => {
    const request = new connection.Request;
    
    request.input("userId", connection.Int, req.query.userId);

    request.query(`SELECT [id]
        ,[user_id]
        ,[songs_number]
        ,[time_spent]
        ,[points]
        FROM [dbo].[Score] WHERE [user_id] = @userId`, function (err, recordset) {
            if(err) console.log(err);
    
            res.send(recordset);
        });
}

exports.createScore = (req, res) => {

    const request = new connection.Request;

    request.input("userId", connection.Int, req.query.userId);
    request.input("songsNumber", connection.Int, req.query.songsNumber);
    request.input("timeSpent", connection.Int, req.query.timeSpent);
    request.input("points", connection.Int, req.query.points);

    request.query(`INSERT INTO [dbo].[Score]
        ([user_id]
        ,[songs_number]
        ,[time_spent]
        ,[points])
        VALUES
        (@userId
        ,@songsNumber
        ,@timeSpent
        ,@points)`, function (err, recordset) {
        if(err) console.log(err);

        res.send(recordset);
    });
}

exports.updateScore = (req, res) => {

    const request = new connection.Request;

    request.input("userId", connection.Int, req.query.userId);
    request.input("points", connection.Int, req.query.points);

    request.query(`UPDATE [dbo].[Score]
        SET [points] = @points
        WHERE [user_id] = @userId`, function (err, recordset) {
        if(err) console.log(err);

        res.send(recordset);
    });
}
