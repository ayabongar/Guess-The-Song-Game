const authService = require("../services/AuthService")

const verifyToken = async (user, token) => {
    try {
        const result = await authService.verify(user, token);
        return result;
    }
    catch (error) {
        console.log("verification error");
        console.log(error.response.data)
        return error.response.data;
    }
}

module.exports = {
    verifyToken
}