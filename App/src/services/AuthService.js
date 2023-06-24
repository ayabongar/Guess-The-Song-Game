import axios from "axios"

const IdentityProviderUrl = process.env.IDENTITY_PROVIDER_URL;

export const verify = async (token) => {
    return axios.post(
        IdentityProviderUrl,
        { resource: "default" },
        {
            headers: {
                "Authorization": token,
                "Content-Type": "text/json"
            }
        }
    );
}