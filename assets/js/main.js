$('document').ready(function(){   
    
    var cardsPlayerOne = [];
    var cardsPlayerTwo = [];

    storeChosenThemeInMemory("SoccerPlayers");
    removeName();
    divideCardsRandomly();
    
    if(!validateNameStored()) {
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

    function validateNameStored(name) {
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
            console.log(`Storing Game Object for ${theme} theme:`);
            var json = JSON.stringify(result);
            console.log(JSON.parse(json));
            sessionStorage.setItem("gameObj", json);
        });
    }

    function divideCardsRandomly() {
        
        var gameObject = JSON.parse(sessionStorage.getItem("gameObj"));

        var cards = gameObject.cards; //Extract cards array

        var pushedPlayerOneCardIds = [];
        
        var i = 1;
        do {
            var rnd = getRandomInt(1, cards.length); //get random number between 1 and total cards length

            if(pushedPlayerOneCardIds.includes(rnd)) { //if pushed cards already contains Id continue
                continue; 
            }

            var card = FindCard(cards, rnd); //find card by its Id

            cardsPlayerOne.push(card); //push this card to playerOne

            pushedPlayerOneCardIds.push(rnd); //push this Id to local Id store

            i++;

        } while(i <= (cards.length / 2))

        for (var j = 1; j <= (cards.length); j++)
        {
            if(pushedPlayerOneCardIds.includes(j)) { //if pushed cards already contains Id continue
                continue; 
            }
            
            var card = FindCard(cards, rnd); //find card by its Id

            cardsPlayerTwo.push(card)
        }

        console.log("Player One Cards:");
        console.log(JSON.parse(JSON.stringify(cardsPlayerOne)));
        console.log("Player Two Cards:");
        console.log(JSON.parse(JSON.stringify(cardsPlayerTwo)));
    }

    function FindCard(cards, n) {
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

    //Events

    $(".card-button").click(function() {
        storeName($(".landing-card-name-input")
            .val());

        let name = getName();
        if(validateNameStored(name))
        {
            setGameStartName(name);
            chooseCardDisplayed(2);
        }
        else{
            alert(`Please enter your name to play`)
        }
    });


});

