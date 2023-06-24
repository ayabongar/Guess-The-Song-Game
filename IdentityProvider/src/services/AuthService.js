import jsonwebtoken from 'jsonwebtoken';

export const authenticate = (username, password, matchUser, res) => {

    if (username == matchUser.username && password == matchUser.hashed_password) {
        res.cookie('token', jsonwebtoken.sign({ user: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME}), { httpOnly: true });
        return {
            status: 200,
            message: "Success",
            reason: "Authentication successfull"
        }
    }

    console.log(username, password);
    console.log(matchUser);
    
    return {
        status: 401,
        message: "Failed",
        reason: "Invalid username or password"
    }
}

export const verify = (token) => {
    try {
        const { user } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return user;
    }
    catch (error) {
        console.log(error)
        return undefined;
    }
}