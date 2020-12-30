function dealCardsRandomly() {         
    stackOne = []; //Empty stack
    stackTwo = []; //Empty stack
    var pushedStackOneCardIds = []; //Array to store ids of stackOne locally
    var cards = gameObj.cards; //Extract cards array
 
    var i = 1;
    do {
        var rnd = getRandomInt(1, cards.length); //get random number between 1 and total cards length
        if(pushedStackOneCardIds.includes(rnd)) { continue; } //if pushed cards already contains Id continue 
        var card = findCardInArray(cards, rnd); //find card by its Id
        stackOne.push(card); //push this card to stackOne
        pushedStackOneCardIds.push(rnd); //push this Id to local Id store
        i++;
    } while(i <= (cards.length / 2))

    for (var j = 1; j <= (cards.length); j++)
    {
        if(pushedStackOneCardIds.includes(j)) { continue; } //if stackOne already has this card        
        var card = findCardInArray(cards, j); //find card by its Id
        stackTwo.push(card) //push this card to stackTwo
    }
}

function handlePlayerAction(category, caller){       
    if(!continueProcessing) {
        return;
    }
    
    //DIM BACKGROUND TO FOCUS ALERTS
    $(".alert-bg").toggleClass("opacity-cover");

    //DETERMINE THE WINNER OF THE SHOWDOWN
    var winner = determineShowdown(
            stackOne[0].values[category], 
            stackTwo[0].values[category]
        );

    //DISPLAY SHOWDOWN ALERT FOR 7s
    showdownAlert(category, caller, 7000);

    //AFTER 7s DISPLAY WINNER SHOWDOWN FOR ANOTHER 7s; UPDATE SCORE
    setTimeout(function() {
        showdownWinnerAlert(winner, category, 7000);
        updateScore(calculateShowdownPointsGained(stackOne[0].values[category], stackTwo[0].values[category], winner));
    }, 7000);
    

    //AFTER 14s CLEAR DOWN ALERTS AND SET UP UI FOR NEXT MOVE 
    setTimeout(function() {    
        var isMatchWinner = goToNextShowdown(winner); 

        //IF FLAG RETURNED THAT EITHER STACK IS EMPTY THEN RE-ROUTE TO MATCH WINNER ALERT FLOW
        if(isMatchWinner) {
            winner == 1 ? declareWinner(1) : declareWinner(2);
            return;   
        } 

        if(winner == 1){
            renderCards(winner);
            updateTotals();
        }
        else {
            handlePlayerAction(stackTwo[0].best, 2); //IF P2 WINS THEN RECALL THIS FOR THEIR NEXT MOVE
        }

        nextMoveAlert(winner); //SET UP THE ALERT TO PROMPT THE NEXT MOVE
        $(".alert-bg").toggleClass("opacity-cover"); //RESET THE DIMMED BACKGROUND
        clearInterval(arrowAnimationInterval); //RESET THE ARROW ANIMATION
    }, 14000);

    //AFTER 1 FURTHER SECOND PLAY SOME ADDITIONAL ANIMATION & AUDIO
    setTimeout(function(){
        if(!continueProcessing) {
            return;
        }   
        winner == 1 ? sounds.find(n => n.name == "game-positive-1").audio.play() : sounds.find(n => n.name == "game-error-2").audio.play();
        var color = $("#player-score-value").css("color");
        $("#player-score-value").flash(2, 500,'', function() { $("#player-score-value").css("color", color) });
    }, 15000);
}

function determineShowdown(value1, value2){
    if(value1 > value2){
        console.log(`P1 WINS Showdown: ${value1} beats ${value2}`);
        return 1;
    }
    console.log(`P2 WINS Showdown with ${value2} beats ${value1}`);
    return 2;
}

function pushToArray(winningCardArray, losingCardArray){
    var winningCard = winningCardArray.splice(0, 1)[0]; //TAKE WINNING CARD
    var losingCard = losingCardArray.splice(0, 1)[0]; //TAKE LOSING CARD

    winningCardArray.push(winningCard); //PUSH WINNING CARD TO BACK OF WINNING ARRAY
    winningCardArray.push(losingCard); //PUSH LOSING CARD TO BACK OF WINNING ARRAY
}

function goToNextShowdown(winner) {
    turn = winner; //SET NEXT TURN TO THE WINNING PLAYER
    switch(winner)
    {
        case 1:
            pushToArray(stackOne, stackTwo); 
            break;

        case 2:
            pushToArray(stackTwo, stackOne);
            break;

        default:
            turn = 1
    }
    if(stackOne.length === 0 || stackTwo.length === 0) {
        return true; //IF EITHER STACK HAS NO CARDS LEFT, RETURN FLAG THAT MATCH IS WON
    }

    return false; //IF EITHER STACK HAS SOME CARDS LEFT, RETURN FLAG THAT MATCH IS NOT WON
}

function declareWinner(winner){
    matchWinnerAlert(winner);
    setTimeout(function(){ 
        processing = false;
    }, 2000);
}