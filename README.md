# guess-the-song
Use only part of the lyrics to guess the song

Local setup:

clone the repo:
git clone https://github.com/benedictdube/guess-the-song.git

change directory into server and do the following:
- install node packages:
  npm install

- create a file called .env and add the following contents:</br>
  DB_ENDPOINT = "\<your mysql db endpoint\>"</br>
  DB_USERNAME = "\<your db name\>"</br>
  DB_PASSWORD = "\<your mysql master password\>"</br>
  IDENTITY_PROVIDER_URL = "http://localhost:8081/"</br>
  LYRICS_API_KEY="\<your lyrics api key\>"</br>

change directory into IdentityServer and install node packages:
- install node packages:
  npm install

- create a file called .env and add the following contents:</br>
  JWT_SECRET = "\<your JWT secret key\>"</br>
  JWT_EXPIRATION_TIME = "\<your JWT expiration time\>"</br>
  DB_ENDPOINT = "\<your mysql db endpoint\>"</br>
  DB_USERNAME = "\<your db name\>"</br>
  DB_PASSWORD = "\<your mysql master password\>"</br>
  ALLOWED_ORIGIN = "http://localhost:8080"</br>
