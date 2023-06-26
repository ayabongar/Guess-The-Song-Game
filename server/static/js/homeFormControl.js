function switchMenu(){

    const mainEl = document.getElementById("mainEl");

    const containerEl = document.createElement("div");
    containerEl.setAttribute("id", "menuContainer");

    const btnPlayEl = document.createElement("button");
    btnPlayEl.setAttribute("class", "menuButton");
    btnPlayEl.innerText = "Play";

    const btnPastGamesEl = document.createElement("button");
    btnPastGamesEl.setAttribute("class", "menuButton");
    btnPastGamesEl.innerText = "Past Games";

    const btnLogoutEl = document.createElement("button");
    btnLogoutEl.setAttribute("class", "menuButton");
    btnLogoutEl.innerText = "Logout";

    containerEl.appendChild(btnPlayEl);
    containerEl.appendChild(btnPastGamesEl);
    containerEl.appendChild(btnLogoutEl);

    mainEl.appendChild(containerEl);
}