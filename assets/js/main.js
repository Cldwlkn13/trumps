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
        console.log(`Storing name: ${name}`);
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

    function renderCards() {  
        if(stackOne.length === 0 || stackTwo.length === 0) {
            return;
        }

        //setTimeout(function () { renderCard(1, stackOne[0]); }, 0);
        //setTimeout(function () { renderCard(2, stackTwo[0]); }, 0);

        renderCard(1, stackOne[0]);
        renderCard(2, stackTwo[0]);   
    }

    function renderCard(stackId, card) {
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

                element
                    .children(".cat-name")
                    .first()
                    .text(gameObj.categories[i] + " - "); 

                element
                    .children(".cat-score")
                    .first()
                    .text(card.values[i]);     

                element
                    .children(".cat-unit")
                    .first()
                    .text(gameObj.units[i]);   
            }  
        
    }

    function determineShowdown(value1, value2){
        if(value1 > value2){
            console.log(`P1 WINS Showdown: ${value1} beats ${value2}`);
            return 1;
        }
        console.log(`P2 WINS Showdown with ${value2} beats ${value1}`);
        return 2;
    }

    function pushToArray(array1, array2){
            
        var winningCard = array1.splice(0, 1);
        var losingCard = array2.splice(0, 1);

        array1.push(winningCard);
        array1.push(losingCard);

        if(array2.length === 0)
        {
            return 1;
        }
        return 0;
    }

    function goToNextShowdown(winner) {
        switch(winner)
        {
            case 1:
                turn = winner;
                pushToArray(stackOne, stackTwo);
                if(stackTwo.length === 0) {
                    declareWinner(winner);
                    return;   
                }
                console.log("-----------------------");
                renderCards();
                console.log(`SCORE: P1 has ${stackOne.length} cards, P2 has ${stackTwo.length} cards`);
                break;

            case 2:
                turn = winner;
                pushToArray(stackTwo, stackOne);
                if(stackOne.length === 0) {
                    declareWinner(winner);
                    return;
                }
                console.log("-----------------------");
                renderCards();
                console.log(`SCORE: P1 has ${stackOne.length} cards, P2 has ${stackTwo.length} cards`);
                //simulatePlayerTwoAction();
                break;

            default:
                turn = 1
        }
    }

    function declareWinner(winner){
        alert(`P${winner} has won!`)
    }

    function simulatePlayerTwoAction() {
        if(turn != 2) {
            return;
        }
        
        console.log("P2 is making their decision...")       
        sleep(4000);
        console.log(`For card ${stackTwo[0].name}, P2 selects category: ${gameObj.categories[stackTwo[0].best]} `);
        console.log(`Showdown: ${stackOne[0].values[stackOne[0].best]} vs ${stackTwo[0].values[stackTwo[0].best]}`);

        goToNextShowdown(
            determineShowdown(
                stackOne[0].values[stackOne[0].best], 
                stackTwo[0].values[stackTwo[0].best]));

    }

    //https://www.sitepoint.com/delay-sleep-pause-wait/
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }
    
    //Events

    $(".card-button").click(function() {
        storeName($(".landing-card-name-input")
            .val());

        let name = getName();
        if(validateName(name))
        {
            setGameStartName(name);
            chooseCardDisplayed(2);
        }
        else{
            alert(`Please enter your name to play`)
        }
    });

    $(".gamestart-button").click(function() {
        dealCardsRandomly(); 
        chooseCardDisplayed(3);
        renderCards();
    })

    $(".gamecard-category-1").click(function() {
        if(turn != 1) {
            return;
        }
        
        console.log(`P1 selected Category: 
            ${$(this).find(".cat-name").text()}${$(this).find(".cat-score").text()}`);

        var category = this.id.split("-")[3];

        goToNextShowdown(
            determineShowdown(
                stackOne[0].values[category], 
                stackTwo[0].values[category]));
    })

    $("#stack-2").click(function() {
        if(turn != 2) {
            return;
        }
        simulatePlayerTwoAction();
    })
});

