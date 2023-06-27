# guess-the-song
Use only part of the lyrics to guess the song

## Local setup:

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
  JWT_EXPIRATION_TIME = "5m"</br>
  DB_ENDPOINT = "\<your mysql db endpoint\>"</br>
  DB_USERNAME = "\<your db name\>"</br>
  DB_PASSWORD = "\<your mysql master password\>"</br>
  ALLOWED_ORIGIN = "http://localhost:8080"</br>

### Lyrics API
We are using MusixMatch API to source the lyrics used in the song.
These are the steps you follow to make the service work:
1. Create an account here: https://developer.musixmatch.com/signup.
2. Create an application in your new profile.
3. Copy the API KEY from the new application which you can find here: https://developer.musixmatch.com/admin/applications.
4. Paste the lyrics API key as a value to the corresponding variable in the  .env  file,  as advised above.

If done properly,  your .env file will contain an entry like this: `LYRICS_API_KEY="a1b2c3d4e5f6g7h8i9j0"`


## DB Creation (mysql)

![image](https://github.com/benedictdube/guess-the-song/assets/109282750/5ea82e58-e39a-4e65-b204-c1fd9ebe314c)

## Starting the game
You will be redirected to the login screen when you don't have an active session. 
Unregistered users can click the Register button, where they will be able to enter a new username and password.
The password will be rejected by the server unless it:
1. is cool,  not repeating characters like its 1977.
2. has at least one special character.
3. has at least one numeric character (number).
4. has at least one lower letter.
5. has at least one upper case letter.
6. has at least ten characters in total length.

