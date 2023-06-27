function switchMenu(){
    console.log("switch main");
    const mainEl = document.getElementById("mainEl");
    mainEl.innerHTML = "";

    const containerEl = document.createElement("div");
    containerEl.setAttribute("id", "menuContainer");

    const btnPlayEl = document.createElement("button");
    btnPlayEl.setAttribute("class", "menuButton");
    btnPlayEl.innerText = "Play";
    btnPlayEl.onclick = switchPlay;

    const btnPastGamesEl = document.createElement("button");
    btnPastGamesEl.setAttribute("class", "menuButton");
    btnPastGamesEl.innerText = "Past Games";
    btnPastGamesEl.onclick = switchPastGames;

    const btnLogoutEl = document.createElement("button");
    btnLogoutEl.setAttribute("class", "menuButton");
    btnLogoutEl.setAttribute("style", "margin-top: 100px; margin-bottom: 50px;");
    btnLogoutEl.innerText = "Logout";
    btnLogoutEl.onclick = logoutExecute;

    containerEl.appendChild(btnPlayEl);
    containerEl.appendChild(btnPastGamesEl);
    containerEl.appendChild(btnLogoutEl);

    mainEl.appendChild(containerEl);
}

async function switchPlay() {
    console.log("switch play");

    const mainEl = document.getElementById("mainEl");
    mainEl.innerHTML = "";

    const containerEl = document.createElement("div");
    containerEl.setAttribute("id", "roundContainer");
    const loader = document.createElement("div");
    loader.setAttribute("class", "loader rotating");
    containerEl.appendChild(loader);

    mainEl.appendChild(containerEl);


    await getGame();
    const firstRound = getNextRound();
    await switchRound(firstRound.roundId, firstRound.lyrics, firstRound.options);
}

async function switchRound(roundID, lyrics, options) {
    console.log("switch round");

    const containerEl = document.getElementById("roundContainer");
    containerEl.innerHTML = "";

    const lyricsEl = document.createElement("p");
    lyricsEl.setAttribute("id", "gameLyric");
    lyricsEl.innerText = lyricParser(lyrics);

    containerEl.appendChild(lyricsEl);

    for (let i=0; i<4; i++) {
        const optionEl = document.createElement("button");
        optionEl.setAttribute("class", "gameOption");
        optionEl.innerText = options[i].title + " - " + options[i].artist;
        optionEl.onclick = async function() { await submitAnswer(roundID, options[i].title, options[i].artist); }
        containerEl.appendChild(optionEl);
    }

}

async function switchScore() {

    const mainEl = document.getElementById("mainEl");
    mainEl.innerHTML = "";

    const containerEl = document.createElement("div");
    containerEl.setAttribute("id", "scoreContainer");
    containerEl.innerHTML = "";

    const btnHome = document.createElement("button");
    btnHome.setAttribute("class", "homeButton");
    btnHome.innerText = "Home";
    btnHome.onclick = goHome;

    mainEl.appendChild(containerEl);

    const score = await getScore();

    console.log(score);

    score.forEach(s => {
        const scoreEl = document.createElement("div");
        scoreEl.setAttribute("class", "scoreCard " + ((s.isCorrect)? "scoreCorrect" : "scoreWrong"));

        const lyricEl = document.createElement("p");
        lyricEl.innerText = lyricParser(s.lyrics);

        const songEl = document.createElement("p");
        songEl.innerText = s.yourAnswer.title + " - " + s.yourAnswer.artist;
        songEl.setAttribute("class", "scoreCorrect");

        scoreEl.appendChild(lyricEl);
        scoreEl.appendChild(songEl);

        containerEl.appendChild(scoreEl);
    });

    containerEl.appendChild(btnHome);
}

async function switchPastGames() {
    const mainEl = document.getElementById("mainEl");
    mainEl.innerHTML = "";

    const containerEl = document.createElement("div");
    containerEl.setAttribute("id", "pastGameContainer");
    containerEl.innerHTML = "";

    const pastGames = await getPastGames();

    const user = getCookie("user");

    const ratingEl = document.createElement("p");
    ratingEl.setAttribute("class", "ratingHeading");
    ratingEl.innerText = user + ": " + ((pastGames.rating == undefined)? "0" : pastGames.rating);

    containerEl.appendChild(ratingEl);
    
    const listContainerEl = document.createElement("div");
    listContainerEl.setAttribute("id", "pastGameListContainer");

    containerEl.appendChild(listContainerEl);

    mainEl.appendChild(containerEl);

    if (pastGames.games != undefined) pastGames.games.forEach(g => {
        const pg = document.createElement("p");
        pg.setAttribute("class", "pgItem");
        pg.innerText = g.date.substring(0, g.date.indexOf("T")) + ": " + g.score + "/" + g.overall_result;

        listContainerEl.appendChild(pg);
    });

    const btnHome = document.createElement("button");
    btnHome.setAttribute("class", "homeButton");
    btnHome.innerText = "Home";
    btnHome.onclick = goHome;

    containerEl.appendChild(btnHome);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function goHome() {
    location.href = "/";
}

function lyricParser(lyric) {
    let lyrArr = lyric.split("\\n");

    let finalLyric = "";

    if (lyrArr[2]) {
        if (lyrArr[2].charAt(0) == '"')
            lyrArr[2] = lyrArr[2].substring(1, lyrArr[2].length);
        
        finalLyric += lyrArr[2] + " ";
    }

    if (lyrArr[3]) {
        finalLyric += lyrArr[3] + " ";
    }

    if (lyrArr[4]) {
        if (lyrArr[4].charAt(0) == '"')
            lyrArr[4] = lyrArr[4].substring(1, lyrArr[4].length);
        
        finalLyric += lyrArr[4];
    }

    finalLyric = finalLyric.replace("\\", "").replace("\/", "");

    return finalLyric;
}