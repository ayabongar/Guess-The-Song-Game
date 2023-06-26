import jsonwebtoken from 'jsonwebtoken';

export const authenticate = (username, password, matchUser, res) => {

    if (username == matchUser.username && password == matchUser.hashed_password) {

        const token =  jsonwebtoken.sign({ user: username }, process.env.JWT_SECRET + matchUser.user_id, { expiresIn: process.env.JWT_EXPIRATION_TIME});

        res.cookie('token', token, { 
            httpOnly: true,
            sameSite: "None",
            secure: false
        });
        res.cookie('user', username, { 
            httpOnly: true,
            sameSite: "lax",
            secure: true
        });

        return {
            status: 200,
            message: "Success",
            reason: "Authentication successfull",
            data: {
                token: token,
                username: username
            }
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
        const newToken =  jsonwebtoken.sign({ user: user }, process.env.JWT_SECRET + userId, { expiresIn: process.env.JWT_EXPIRATION_TIME});

        console.log(token);
        console.log(newToken);

        return { newToken, user };
    }
    catch (error) {
        return { undefined, undefined };
    }
}