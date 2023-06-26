const express = require('express');
const app = express();

app.get('/retrieve-lyrics', (req, res) => {






  res.send(lyrics);
});


app.post('/retrieve-song-options', (req, res) => {
  const lyrics = req.body.lyrics;


  res.json(songOptions);
});

//this is to fetch lyrics from db, and the correct song as well,  also make API call
//for the extra songs, the checking if the clicked option and the correct song match will be done here
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
