$('document').ready(function(){   
    
    var turn = 1;
    var stackOne = [];
    var stackTwo = [];
    var gameObj = {};
    var categories = {};
    var units = {};

    storeChosenThemeInMemory("SoccerPlayers");
    removeName();
    
    if(!validateName()) {
        chooseCardDisplayed(1);
    }
    else {
        chooseCardDisplayed(2);
    }
    
    //Functions
    function getName() {
        let name = localStorage.getItem("name");
        console.log(`Retrieving locally stored name : ${name}`);
        return name;
    }

    function storeName(name) {
        if(name.length > 0) {
            console.log(`Storing name: ${name}`);
        }

        localStorage.setItem("name", name);
    }

    function removeName() {
        console.log(`Removing locally stored name value`);
        localStorage.removeItem("name");
    }

    function validateName(name) {
        return name != null && 
            name.length > 0;
    }

    function chooseCardDisplayed(e) {
        switch(e)
        {
            case 1:
                $(".landing-card").show();
                $(".gamestart-card").hide();
                $(".gameplay").hide();    
                break; 

            case 2:
                $(".landing-card").hide();
                $(".gamestart-card").show();
                $(".gameplay").hide();   
                break;   
            
            case 3:
                $(".landing-card").hide();
                $(".gamestart-card").hide();
                $(".gameplay").show();   
                break;  
            
            default:
                $(".landing-card").show();
                $(".gamestart-card").hide();
                $(".gameplay").hide();  
                break;           
        }
    }

    function setGameStartName(name) {
        $(".gamestart-card-name")
            .text(name);
    }

    function setGamePlayName(name){
        $("#player-name-1 > .name")
            .text(name); 
    }

    function updateTotals(){
        $("#player-cards-total-1")
            .text(`${stackOne.length} out of ${gameObj.cards.length}`);

        $("#player-cards-total-2")
            .text(`${stackTwo.length} out of ${gameObj.cards.length}`);
    }

    function calculateScore(categoryScore1, categoryScore2){
        var diff = categoryScore1 - categoryScore2;
        return diff ^ 2;
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
        localStorage.setItem("score", newScore);
        console.log(`Score Updated: ${newScore}`);  
        updateHighScore(newScore);
    }

    function resetScore(){
        localStorage.removeItem("score");
        $("#player-score-value")
            .text(0);
    }

    function updateHighScore(currentGameScore){
        var currentHigh = parseInt(sessionStorage.getItem("high-score"));
        if (isNaN(currentHigh)) {
            $("#player-high-score-value")
                .text(0);
            sessionStorage.setItem("high-score", 0);
            return;
        }
        if(currentGameScore >= currentHigh) {
            $("#player-high-score-value")
                .text(currentGameScore);
            console.log(`High Score Updated: ${currentGameScore}`);
            sessionStorage.setItem("high-score", currentGameScore);
        }
        else {
            $("#player-high-score-value")
                .text(currentHigh);
        }
    }

    function storeChosenThemeInMemory(theme){
        $.getJSON(`assets/json/${theme}.json`, function(result){
            console.log(`Storing Game Object for ${theme} theme`);
            var json = JSON.stringify(result);
            sessionStorage.setItem("gameObj", json);
            gameObj = JSON.parse(json);
            categories = gameObj.categories;
            units = gameObj.units;
        });
    }

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

        console.log("P1 Cards:");
        console.log(JSON.parse(JSON.stringify(stackOne)));

        console.log("P2 Cards:");
        console.log(JSON.parse(JSON.stringify(stackTwo)));
    }

    function findCardInArray(cards, n) {
        var card = cards.find(obj => {
            return obj.cardId === n; //find card by its Id
        });
        return card;
    }

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }

    function renderCards(winner) {  
        if(stackOne.length === 0 || stackTwo.length === 0) {
            return;
        }

        renderCard(1, winner, stackOne[0]);
        renderCard(2, winner, stackTwo[0]);

        setBorders(winner, 1);
        setBorders(winner, 2);
    }

    function renderCard(stackId, winner, card) {
            console.log(`P${stackId} rendering card ${card.name}`);
            $("#name-" + stackId)
                .children("p")
                .first()
                .text(card.name);

            $("#img-" + stackId)
                .children("img")
                .first()
                .attr("src", card.img);

            for(var i = 1; i <= 4; i++) {    
                
                var element = $("#s-" + stackId + "-cat-" + i);

                var container = element
                    .children(".gamecard-details")
                    .first();

                container
                    .children(".cat-name")
                    .first()
                    .text(gameObj.categories[i] + " - "); 

                var cardValue = (stackId == 2 && winner == 1) ? "?" : card.values[i];

                container
                    .children(".cat-value")
                    .first()
                    .text(cardValue);     

                container
                    .children(".cat-unit")
                    .first()
                    .text(gameObj.units[i]);   
            } 
    }

    function setBorders(winner, stackId) {
        (winner == stackId) ? 
            $("#stack-" + stackId + "> .gamecard").css("border", "6px solid #ff3399") : 
            $("#stack-" + stackId + "> .gamecard").css("border", "6px solid black"); 
                
        (winner == stackId) ? 
            $("#player-name-" + stackId).css("border", "6px solid #ff3399") : 
            $("#player-name-" + stackId).css("border", "6px solid #400080"); 
    }

    function determineShowdown(value1, value2){
        if(value1 > value2){
            console.log(`P1 WINS Showdown: ${value1} beats ${value2}`);
            updateScore(calculateScore(value1, value2));
            return 1;
        }
        console.log(`P2 WINS Showdown with ${value2} beats ${value1}`);
        return 2;
    }

    function pushToArray(array1, array2){
            
        var winningCard = array1.splice(0, 1)[0];
        var losingCard = array2.splice(0, 1)[0];

        array1.push(winningCard);
        array1.push(losingCard);

        if(array2.length === 0) {
            return 1;
        }
        return 0;
    }

    function goToNextShowdown(winner) {
        turn = winner;
        switch(winner)
        {
            case 1:
                pushToArray(stackOne, stackTwo);
                if(stackTwo.length === 0) {
                    declareWinner(1);
                    return;   
                }
                break;

            case 2:
                pushToArray(stackTwo, stackOne);
                if(stackOne.length === 0) {
                    declareWinner(2);
                    return;
                }
                break;

            default:
                turn = 1
        }
        renderCards(winner);
        updateTotals();
        console.log(`SCORE: P1 has ${stackOne.length} cards, P2 has ${stackTwo.length} cards`);
    }

    function declareWinner(winner){
        alert(`P${winner} has won!`);
        turn = 0;
        setTimeout(function(){ 
            processing = false;
        }, 2000);
    }

    function handlePlayerAction(category){
        
        var card = winner == 1 ? stackOne[0] : stackTwo[0];

        var winner = determineShowdown(
            stackOne[0].values[category], 
            stackTwo[0].values[category]);

        setTimeout(function() {     
            showAlert($(".gameplay-alert"),`${winner == 1 ? getName() : "Player 2"} WINS with ${categories[category]} - ${card.values[category]}`, 1, false, "#fff");
            goToNextShowdown(winner);       
        }, 2000);

        setTimeout(function() {       
            nextMoveAlert(winner);
        }, 4000);
    }

    function nextMoveAlert(winner){
        winner === 1 ? 
            showAlert($(".gameplay-alert"), `${getName()}\nit is your turn, choose your category!`, 0.8, false,"#c9e000") :
            showAlert($(".gameplay-alert"),`Click here to force Player 2 move!`, 0.8, false, "#c9e000");
    }

    function simulatePlayerTwoAction() {
        if(turn != 2) {
            return;
        }
        
        console.log("P2 is making their decision..."); 
        console.log(`For card ${stackTwo[0].name}, P2 selects category: ${categories[stackTwo[0].best]} `);
        console.log(`Showdown: ${stackOne[0].values[stackOne[0].best]} vs ${stackTwo[0].values[stackTwo[0].best]}`);

        showAlert($(".gameplay-alert"),`Player 2 has selected ${categories[stackTwo[0].best]} - ${stackTwo[0].values[stackTwo[0].best]}`, 1, false, "#fff");   
        handlePlayerAction(stackTwo[0].best);
    }

    //https://www.sitepoint.com/delay-sleep-pause-wait/
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function showAlert(alert, text, opacity, hide, backgroundColor, showForMs = 0) {
        alert.text(text).css("opacity", opacity).css("background-color", backgroundColor); 
        alert.show();            
        if(hide){
            setTimeout(function() { hideAlert(alert)}, showForMs);
        }
    }
    function hideAlert(alert) {
            $(alert).css("opacity", 0);
        }

    //Events
    $(".card-button").click(function() {

        let name = $(".landing-card-name-input")
                        .val();
        storeName(name);
        
        if(name != null && name.length > 0){
            setGameStartName(name);
            chooseCardDisplayed(2);
        }
        else{         
           showAlert($(".alert"), "Please enter your name", 1, 1, "#fbd000", 2000);
        }
    });

    $(".gamestart-button").click(function() {
        dealCardsRandomly(); 
        chooseCardDisplayed(3);
        renderCards(1);
        setGamePlayName(getName());
        updateTotals();
        resetScore();
        updateScore(0);
        nextMoveAlert(1);
    })

    var processing = false;
    $(".gamecard-category-1").click(function() {
        if(turn != 1 || processing) {
            return;
        }
        
        console.log(`P1 selected Category: 
            ${$(this).find(".cat-name").text()}${$(this).find(".cat-score").text()}`);

        var category = this.id.split("-")[3];

        showAlert($(".gameplay-alert"),`You have selected ${categories[category]} - ${stackOne[0].values[category]}`, 1, false, "#fff");

        handlePlayerAction(category);

        processing = true;
        setTimeout(function(){ 
            processing = false;
        }, 2000);
    })

   
    $("#stack-2, .gameplay-alert").on("click",function() {
        if(turn != 2 || processing) {
            console.log("Please wait");
            return;
        }

        showAlert($(".gameplay-alert"),"Player 2 making their decision...", 1, false, "#fff");

        simulatePlayerTwoAction();

        processing = true;
        setTimeout(function(){ 
            processing = false;
        }, 2000);
    })

    $(".restart").click(function() {
        chooseCardDisplayed(2);
    })
});

