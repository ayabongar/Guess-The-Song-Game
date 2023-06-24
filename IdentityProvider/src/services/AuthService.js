import jsonwebtoken from 'jsonwebtoken';

export const authenticate = (username, password, matchUser, res) => {

    if (username == matchUser.username && password == matchUser.hashed_password) {
        res.cookie('token', jsonwebtoken.sign({ user: username }, process.env.JWT_SECRET + matchUser.user_id, { expiresIn: process.env.JWT_EXPIRATION_TIME}), { httpOnly: true });
        return {
            status: 200,
            message: "Success",
            reason: "Authentication successfull"
        }
    }
    
    return {
        status: 401,
        message: "Failed",
        reason: "Invalid username or password"
    }
}

export const verify = (userId, token) => {
    try {
        const { user } = jsonwebtoken.verify(token, process.env.JWT_SECRET + userId);
        return user;
    }
    catch (error) {
        return undefined;
    }
}