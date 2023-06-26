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
    inputPasswordEl.setAttribute("type", "text");
    inputPasswordEl.setAttribute("id", "loginPassword");

    const loginButtonEl = document.createElement("button");
    loginButtonEl.setAttribute("onclick", "loginExecute()");
    loginButtonEl.innerText = "Login";

    form.appendChild(inputUsernameEl);
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

    const inputUsernameEl = document.createElement("input");
    inputUsernameEl.setAttribute("type", "text");
    inputUsernameEl.setAttribute("id", "registerUsername");

    const inputPasswordEl1 = document.createElement("input");
    inputPasswordEl1.setAttribute("type", "text");
    inputPasswordEl1.setAttribute("id", "registerPassword1");

    const inputPasswordEl2 = document.createElement("input");
    inputPasswordEl2.setAttribute("type", "text");
    inputPasswordEl2.setAttribute("id", "registerPassword2");

    const loginButtonEl = document.createElement("button");
    loginButtonEl.setAttribute("onclick", "registerExecute()");
    loginButtonEl.innerText = "Register";

    form.appendChild(inputUsernameEl);
    form.appendChild(inputPasswordEl1);
    form.appendChild(inputPasswordEl2);
    form.appendChild(loginButtonEl);
}