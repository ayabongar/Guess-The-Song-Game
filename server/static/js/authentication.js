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

    console.log(authResult);

    if (authResult.data.message == "Success") {
        document.cookie = "token=" + authResult.data.data.token;
        document.cookie = "user=" + authResult.data.data.username;
        location.href = "/";
    }
    else {
        window.alert(authResult.data.message + ": " + authResult.data.reason);
    }
}

async function register(username, password1, password2) {
    let config = {
        withCredentials: true
    }
    
    const data = {
        "username": username,
        "password1": password1,
        "password2": password2
    }

    const authResult = await axios.post(
        identityProviderUrl + "/register",
        data,
        config
    );

    console.log(authResult.data)

    if (authResult.data.message == "Success") {
        switchToLogin();
    }
    else {
        window.alert(authResult.data.message + ": " + authResult.data.reason);
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