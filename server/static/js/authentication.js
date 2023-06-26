const identityProviderUrl = "https://aqri6bnma6.us-east-1.awsapprunner.com";
//const identityProviderUrl = "http://localhost:8081";

async function login(username, password) {
    
    let config = {
        withCredentials: true
    }
    
    const data = {
        "username": username,
        "password": password
    }

    const authResult = await axios.post(
        identityProviderUrl + "/authenticate",
        data,
        config
    );

    document.cookie = "token=" + authResult.data.data.token;
    document.cookie = "user=" + authResult.data.data.username;

    if (authResult.data.message == "Success") {
        location.href = "/";
    }
}

async function register(username, password1, password2) {
    let config = {
        withCredentials: true
    }
    
    const data = {
        "username": username,
        "password": password1
    }

    const authResult = await axios.post(
        identityProviderUrl + "/register",
        data,
        config
    );

    if (authResult.data.message == "Success") {
        switchToLogin();
    }
}

function loginExecute() {
    const un = document.getElementById("loginUsername").value;
    const pw = document.getElementById("loginPassword").value;

    login(un, pw);
}

function registerExecute() {
    const un = document.getElementById("registerUsername").value;
    const pw1 = document.getElementById("registerPassword1").value;
    const pw2 = document.getElementById("registerPassword2").value;

    register(un, pw1, pw2);
}