const connection = require("../dbService/conn");

exports.findAll = (req, res) => {
    connection.query(`SELECT [id]
            ,[name]
            ,[email]
            FROM [GuessDB].[dbo].[User]`, function (err, recordset) {

        if(err) console.log(err);

        res.send(recordset);
    });
}
