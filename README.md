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
