import { createUser, getUserByUsername, getUserAndPasswordByUsername } from "../services/RepoService.js"
import { authenticate, verify } from '../services/AuthService.js';

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

    const result = await createUser(username, password);

    return res
            .status(200)
            .json({ message: "Success" });

}

export const login = async (req, res) => {

    const { username, password } = req.body;

    const result = await getUserAndPasswordByUsername(username);
    const matchUser = result[0];

    const { status, message, reason } = authenticate(username, password, matchUser, res);

    return res
            .status(status)
            .json({
                message: message,
                reason: reason
            })
}

export const authorize = (req, res) => {

    if (!req.body.token)
        return res
            .status(401)
            .json({
                message: "Failed",
                reason: "Verification not provided"
            });
    
    const user = verify(req.body.token);

    if (user) {
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