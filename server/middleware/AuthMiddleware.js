const authenticationController = require("../controllers/AuthenticationController");


const verifyRequest = async (req, res, next) => {

    if (req.path == "/authenticate") {
        next();
        return;
    }

    if ((!req.cookies.token || !req.cookies.user)) {
        console.log("no cookies or token");
        console.log(req.cookies.token);
        console.log(req.cookies.user);
        res.redirect("/authenticate");
    }
    else {

        const verificationResult = await authenticationController.verifyToken(req.cookies.user, req.cookies.token);
        console.log("verify result");
        console.log(verificationResult);

        if (verificationResult.data.message == "Success") {
            next();
        }
        else {
            res.redirect("/authenticate");
        }
    }
}

module.exports = {
    verifyRequest
}