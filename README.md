# guess-the-song
Use only part of the lyrics to guess the song

## Lyrics API
We are using MusixMatch API to source the lyrics used in the song.
These are the steps you follow to make the service work:
1. Create an account here: https://developer.musixmatch.com/signup
2. Create an application in your new profile
3. Copy the API KEY from the new application which you can find here: https://developer.musixmatch.com/admin/applications
4. Type a new variable in the  .env  file (in the root of the project) with the key "LYRICS_API_KEY".

If done properly,  your .env file will contain an entry like this: `LYRICS_API_KEY="a1b2c3d4e5f6g7h8i9j0"`
