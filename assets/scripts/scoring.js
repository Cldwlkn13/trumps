function calculateShowdownPointsGained(score1, score2, winner){
    return (winner == 1 ? score1 - score2 : 0) * 2;
}

function getGameScore(){
    return parseInt(sessionStorage.getItem("score"));
}

function setGameScore(gameScore, element = null){
    if(element != null) {
        element.text(gameScore);
    }
    sessionStorage.setItem("score", gameScore); 
}

function resetGameScore(element = null){
    if(element != null){
        element.text(0);
    }
    sessionStorage.removeItem("score");   
}

function calculateGameScore(showdownPointsGained, gameScore) {
    if (isNaN(gameScore)){
        return showdownPointsGained;
    }
    else {
        return gameScore + showdownPointsGained;
    }
}

function getCurrentHighScore(){
    return parseInt(localStorage.getItem("high-score"));
}

function setCurrentHighScore(gameScore){
    localStorage.setItem("high-score", gameScore);
}


/**
  * This function updates the High Score based upon context of current score
  * @param {int} gameScore current game score
  * @param {int} currentHigh current persisted high score
  * @param {string} element element to update if required
*/
function updateHighScore(gameScore, currentHigh, element = null){   
    if (isNaN(currentHigh) && gameScore == 0) {
        if(element != null) { 
            element.text(0);
        }
        setCurrentHighScore(0);
        return;
    }
    if (isNaN(currentHigh) && gameScore > 0) {
        if(element != null) { 
            element.text(gameScore);
        }
        setCurrentHighScore(gameScore);
        return;
    }
    if(gameScore >= currentHigh) {
        if(element != null) { 
            element.text(gameScore);
        }
        setCurrentHighScore(gameScore);
    }
    else {
        if(element != null) { 
            element.text(currentHigh);
        }
        setCurrentHighScore(currentHigh);
    }
}