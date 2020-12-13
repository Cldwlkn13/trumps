$('document').ready(function(){   
    
    var stackOne = [];
    var stackTwo = [];

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
            console.log(`Storing Game Object for ${theme} theme:`);
            var json = JSON.stringify(result);
            console.log(JSON.parse(json));
            sessionStorage.setItem("gameObj", json);
        });
    }

    function dealCardsRandomly() {         
        stackOne = [];
        stackTwo = [];
        var gameObject = JSON.parse(sessionStorage.getItem("gameObj"));
        var cards = gameObject.cards; //Extract cards array
        var pushedStackOneCardIds = []; //Arr to store ids of stackOne locally  
        var i = 1;
        do {
            var rnd = getRandomInt(1, cards.length); //get random number between 1 and total cards length
            if(pushedStackOneCardIds.includes(rnd)) { continue; } //if pushed cards already contains Id continue 
            var card = FindCard(cards, rnd); //find card by its Id
            stackOne.push(card); //push this card to stackOne
            pushedStackOneCardIds.push(rnd); //push this Id to local Id store
            i++;
        } while(i <= (cards.length / 2))

        for (var j = 1; j <= (cards.length); j++)
        {
            if(pushedStackOneCardIds.includes(j)) { continue; } //if stackOne already has this card        
            var card = FindCard(cards, rnd); //find card by its Id
            stackTwo.push(card) //push this card to stackTwo
        }

        console.log("stack One Cards:");
        console.log(JSON.parse(JSON.stringify(stackOne)))
        console.log("stack Two Cards:");
        console.log(JSON.parse(JSON.stringify(stackTwo)));
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

    function renderCards() {
        if(stackOne.length == 0 || stackTwo.length == 0) {
            return;
        }
         
        var gameObj = JSON.parse(sessionStorage.getItem("gameObj"));
        var cardOne = stackOne[0];
        var cardTwo = stackTwo[0];

        renderCard(gameObj.categories, gameObj.units, 1, cardOne);
        renderCard(gameObj.categories, gameObj.units, 2, cardTwo);
    }

    function renderCard(categories, units, stackId, card) {
        
        console.log(categories);
        console.log(units);
        console.log(card);

        $("#name-" + stackId)
            .children("p")
            .first()
            .text(card.name);

        $("#img-" + stackId)
            .children("img")
            .first()
            .attr("src", card.img);

        for(var i = 1; i <= 4; i++) {    
            $("#s-" + stackId + "-cat-" + i)
                .children(".cat-name")
                .first()
                .text(categories[i] + " - "); 

            $("#s-" + stackId + "-cat-" + i)
                .children(".cat-score")
                .first()
                .text(card.values[i] + units[i]);     
        }    
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
});

