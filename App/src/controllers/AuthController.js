import { verify } from "../services/AuthService.js"

export const verifyUser = async (req, res) => {
    const result = await verify(req.headers.authorization);
    res.json(result.data);
}