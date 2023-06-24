import { createUser, getUserByUsername, getUserAndPasswordByUsername } from "../services/RepoService.js"
import { authenticate, verify } from '../services/AuthService.js';
import { hash, uniqueId } from "../services/CryptoService.js";

export const register = async (req, res) => {

    const { username, password } = req.body;

    const existingUser = await getUserByUsername(username);

    if (existingUser.length > 0) {
        return res
            .status(200)
            .json({ 
                message: "Failed",
                reason: "Username already exists."
            });
    }

    const userId = uniqueId();

    const result = await createUser(userId, username, hash(password));

    return res
            .status(200)
            .json({ message: "Success" });

}

export const login = async (req, res) => {

    const { username, password } = req.body;

    const result = await getUserAndPasswordByUsername(username);

    if (result.length < 1)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Invalid username or password"
            });

    const matchUser = result[0];

    const { status, message, reason } = authenticate(username, hash(password), matchUser, res);

    return res
            .status(status)
            .json({
                message: message,
                reason: reason
            })
}

export const authorize = async (req, res) => {

    if (!req.body.token || !req.body.user)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Verification not provided"
            });

    const result = await getUserAndPasswordByUsername(req.body.user);

    if (result.length < 1)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Invalid username or password"
            });
    
    const user = verify(result[0].user_id, req.body.token);

    if (user == req.body.user) {
        return res
                .status(200)
                .json({
                    message: "Success",
                    reason: "Successfully verified"
                });
    }

    return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Verification failed"
            });
}