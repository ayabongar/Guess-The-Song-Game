import { execSQL } from "../repositories/GuessTheSongDB.js"

export const createUser = async (username, password) => {
    const sql = "INSERT INTO User (username, hashed_password) VALUES (:username, :hashed_password);";

    const parameters = {
        username: username,
        hashed_password: password
    }

    const result = await execSQL(sql, parameters);
    return result;
}

export const getUserByUsername = async (username) => {

    const sql = "SELECT username FROM User WHERE username = :username LIMIT 1;";

    const parameters = {
        username: username
    }

    const result = await execSQL(sql, parameters);
    return result;
}

export const getUserAndPasswordByUsername = async (username) => {

    const sql = "SELECT username, hashed_password FROM User WHERE username = :username LIMIT 1;";

    const parameters = {
        username: username
    }

    const result = await execSQL(sql, parameters);
    return result;
}