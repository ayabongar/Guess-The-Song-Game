import { createUser, getUserByUsername, getUserAndPasswordByUsername } from "../services/RepoService.js"
import { authenticate, verify } from '../services/AuthService.js';
import { hash, uniqueId } from "../services/CryptoService.js";
import { validateUsername, validatePassword } from "../services/ValidationService.js";

export const register = async (req, res) => {

    const { username, password1 } = req.body;

    if (!validateUsername(req.body.username) || !validatePassword(req.body.password1, req.body.password2)) {
        return res
            .status(200)
            .json({ 
                message: "Failed",
                reason: "Username or password invalid."
            });
    }

    let existingUser = await getUserByUsername(username);
    existingUser = existingUser[0];

    if (existingUser.length > 0) {
        return res
            .status(200)
            .json({ 
                message: "Failed",
                reason: "Username already exists."
            });
    }

    const userId = uniqueId();

    const result = await createUser(userId, username, hash(password1));

    return res
            .status(200)
            .json({ message: "Success" });

}

export const login = async (req, res) => {

    const { username, password } = req.body;

    if (!validateUsername(req.body.username) || !validatePassword(req.body.password, req.body.password)) {
        return res
            .status(200)
            .json({ 
                message: "Failed",
                reason: "Username or password invalid."
            });
    }

    let result = await getUserAndPasswordByUsername(username);
    result = result[0];

    if (result.length < 1)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Invalid username or password"
            });

    const matchUser = result[0];

    const { status, message, reason, data } = authenticate(username, hash(password), matchUser, res);

    return res
            .status(status)
            .json({
                message: message,
                reason: reason,
                data: data
            });
}

export const authorize = async (req, res) => {

    if (!req.body.token || !req.body.user)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Verification not provided"
            });

    let result = await getUserAndPasswordByUsername(req.body.user);
    result = result[0];

    if (result.length < 1)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Invalid username or password"
            });
    
    const { newToken, user } = verify(result[0].user_id, req.body.token);

    if (user == req.body.user) {
        return res
                .status(200)
                .json({
                    message: "Success",
                    reason: "Successfully verified",
                    data: {
                        token: newToken,
                        user: user
                    }
                });
    }

    return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Verification failed"
            });
}