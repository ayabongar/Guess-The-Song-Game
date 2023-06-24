const identityProviderUrl = "http://localhost:8040/authenticate";

async function authenticate(username, password) {
    
    let config = {
        withCredentials: true
    }
    
    const data = {
        "username": username,
        "password": password
    }

    const authResult = await axios.post(
        identityProviderUrl,
        data,
        config
    );

    return authResult.data.message == "Success";
}