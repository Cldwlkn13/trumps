function calculateShowdownPointsGained(score1, score2, winner){
    return (winner == 1 ? score1 - score2 : 0) * 2;
}

function getGameScore(){
    return parseInt(sessionStorage.getItem("score"));
}

function setGameScore(gameScore, element){
    element.text(gameScore);
    sessionStorage.setItem("score", gameScore);
    console.log(`Score Updated: ${gameScore}`); 
}

function resetGameScore(element){
    sessionStorage.removeItem("score");
    element.text(0);
}

function calculateGameScore(showdownPointsGained, gameScore) {
    if (isNaN(gameScore)){
        return showdownPointsGained;
    }
    else {
        return gameScore + showdownPointsGained;
    }
}

function updateHighScore(gameScore, element){
    var currentHigh = parseInt(localStorage.getItem("high-score"));
    if (isNaN(currentHigh)) {
        element.text(0);
        localStorage.setItem("high-score", 0);
        return;
    }
    if(gameScore >= currentHigh) {
        element.text(gameScore);
        localStorage.setItem("high-score", gameScore);
        console.log(`High Score Updated: ${gameScore}`);
    }
    else {
        element.text(currentHigh);
    }
}