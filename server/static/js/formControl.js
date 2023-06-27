function switchToLogin() {

    const switchLikEl = document.createElement("a");
    switchLikEl.setAttribute("id", "switchLink");
    switchLikEl.innerText = "Register";
    switchLikEl.setAttribute("onclick", "switchToRegister()");

    const accMssgEl = document.getElementById("accountMessage");
    accMssgEl.innerText = "No account? "
    accMssgEl.appendChild(switchLikEl);

    const form = document.getElementById("formEl");
    form.innerHTML = "";

    const inputUsernameEl = document.createElement("input");
    inputUsernameEl.setAttribute("type", "text");
    inputUsernameEl.setAttribute("id", "loginUsername");

    const inputPasswordEl = document.createElement("input");
    inputPasswordEl.setAttribute("type", "password");
    inputPasswordEl.setAttribute("id", "loginPassword");

    const loginButtonEl = document.createElement("button");
    loginButtonEl.setAttribute("onclick", "loginExecute()");
    loginButtonEl.setAttribute("class", "authBtn");
    loginButtonEl.innerText = "Login";

    const unLbl = document.createElement("p");
    unLbl.innerText = "username";

    const pwLbl = document.createElement("p");
    pwLbl.innerText = "password";

    form.appendChild(unLbl);
    form.appendChild(inputUsernameEl);
    form.appendChild(pwLbl);
    form.appendChild(inputPasswordEl);
    form.appendChild(loginButtonEl);
}

function switchToRegister() {
    const switchLikEl = document.createElement("a");
    switchLikEl.setAttribute("id", "switchLink");
    switchLikEl.innerText = "Login";
    switchLikEl.setAttribute("onclick", "switchToLogin()");

    const accMssgEl = document.getElementById("accountMessage");
    accMssgEl.innerText = "Already have an account? "
    accMssgEl.appendChild(switchLikEl);

    const form = document.getElementById("formEl");
    form.innerHTML = "";

    const unLbl = document.createElement("p");
    unLbl.innerText = "username";

    const inputUsernameEl = document.createElement("input");
    inputUsernameEl.setAttribute("type", "text");
    inputUsernameEl.setAttribute("id", "registerUsername");

    const pw1Lbl = document.createElement("p");
    pw1Lbl.innerText = "password";

    const inputPasswordEl1 = document.createElement("input");
    inputPasswordEl1.setAttribute("type", "password");
    inputPasswordEl1.setAttribute("id", "registerPassword1");

    const pw2Lbl = document.createElement("p");
    pw2Lbl.innerText = "retype password";

    const inputPasswordEl2 = document.createElement("input");
    inputPasswordEl2.setAttribute("type", "password");
    inputPasswordEl2.setAttribute("id", "registerPassword2");

    const loginButtonEl = document.createElement("button");
    loginButtonEl.setAttribute("onclick", "registerExecute()");
    loginButtonEl.innerText = "Register";
    loginButtonEl.setAttribute("class", "regBtn");

    form.appendChild(unLbl);
    form.appendChild(inputUsernameEl);
    form.appendChild(pw1Lbl);
    form.appendChild(inputPasswordEl1);
    form.appendChild(pw2Lbl);
    form.appendChild(inputPasswordEl2);
    form.appendChild(loginButtonEl);
}