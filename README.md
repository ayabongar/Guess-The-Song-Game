# guess-the-song
Use only part of the lyrics to guess the song

Local setup:

clone the repo:
git clone https://github.com/benedictdube/guess-the-song.git

change directory into server and do the following:
- install node packages:
  npm install

- create a file called .env and add the following contents:
  DB_ENDPOINT = "<your mysql db endpoint>"
  DB_USERNAME = "<your db name>"
  DB_PASSWORD = "<your mysql master password>"
  IDENTITY_PROVIDER_URL = "http://localhost:8081/"
  LYRICS_API_KEY="<your lyrics api key>"

change directory into IdentityServer and install node packages:
- install node packages:
  npm install

- create a file called .env and add the following contents:
  JWT_SECRET = <your JWT secret key>
  JWT_EXPIRATION_TIME = <your JWT expiration time>
  DB_ENDPOINT = "<your mysql db endpoint>"
  DB_USERNAME = "<your db name>"
  DB_PASSWORD = "<your mysql master password>"
  ALLOWED_ORIGIN = "http://localhost:8080"

## Lyrics API
We are using MusixMatch API to source the lyrics used in the song.
These are the steps you follow to make the service work:
1. Create an account here: https://developer.musixmatch.com/signup
2. Create an application in your new profile
3. Copy the API KEY from the new application which you can find here: https://developer.musixmatch.com/admin/applications
4. Type a new variable in the  .env  file (in the root of the project) with the key "LYRICS_API_KEY".

If done properly,  your .env file will contain an entry like this: `LYRICS_API_KEY="a1b2c3d4e5f6g7h8i9j0"`
