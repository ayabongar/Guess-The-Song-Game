const axios = require("axios");

const IdentityProviderUrl = process.env.IDENTITY_PROVIDER_URL;

const verify = async (user, token) => {
    return axios.post(
        IdentityProviderUrl + "verify",
        {
            token: token,
            user: user
        }
    );
}

module.exports = {
    verify
}