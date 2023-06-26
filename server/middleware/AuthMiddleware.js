const authenticationController = require("../controllers/AuthenticationController");


const verifyRequest = async (req, res, next) => {

    if (req.path == "/authenticate") {
        next();
        return;
    }

    if ((!req.cookies.token || !req.cookies.user)) {
        console.log("No auth");
        res.redirect("/authenticate");
    }
    else {

        try{
            const verificationResult = await authenticationController.verifyToken(req.cookies.user, req.cookies.token);
            if (verificationResult.data.message == "Success") {
                console.log(verificationResult.data);
                console.log(req.cookies.token);
                console.log(verificationResult.data.data.token);
                res.cookie("token", verificationResult.data.data.token);
                res.cookie("user", verificationResult.data.data.user);
                next();
            }
            else {
                console.log(verificationResult);
                res.redirect("/authenticate");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    verifyRequest
}