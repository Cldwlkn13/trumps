function calculateShowdownPointsGained(score1, score2, winner){
    return (winner == 1 ? score1 - score2 : 0) * 2;
}

function updateScore(score) {
    var newScore = 0;
    var currentScore = parseInt(localStorage.getItem("score"));
    if (isNaN(currentScore)){
        newScore = score;
    }
    else {
        newScore = currentScore + score;
    }
    $("#player-score-value")
        .text(newScore);
    sessionStorage.setItem("score", newScore);
    console.log(`Score Updated: ${newScore}`);  
    updateHighScore(newScore);
}

function resetScore(){
    sessionStorage.removeItem("score");
    $("#player-score-value")
        .text(0);
}

function updateHighScore(currentGameScore){
    var currentHigh = parseInt(sessionStorage.getItem("high-score"));
    if (isNaN(currentHigh)) {
        $("#player-high-score-value")
            .text(0);
        localStorage.setItem("high-score", 0);
        return;
    }
    if(currentGameScore >= currentHigh) {
        $("#player-high-score-value")
            .text(currentGameScore);
        console.log(`High Score Updated: ${currentGameScore}`);
        localStorage.setItem("high-score", currentGameScore);
    }
    else {
        $("#player-high-score-value")
            .text(currentHigh);
    }
}