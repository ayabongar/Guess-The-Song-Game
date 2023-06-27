exports.shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

exports.removeAnswersFromGame = (gameData) => {
    const newObj = JSON.parse(JSON.stringify(gameData));
    newObj.rounds.map((round) => {
        delete round.correctAnswer;
        return round;
    });

    return newObj;
};

