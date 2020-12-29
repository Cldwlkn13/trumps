$('document').ready(function(){   
    
    var turn = 1;
    var stackOne = [];
    var stackTwo = [];
    var themes = [];
    var gameObj = {};
    var categories = {};
    var units = {};
    var sounds = {};


    registerThemes();
    registerSounds();
    
    if(!validateName(localStorage.getItem("name"))) {
        chooseCardDisplayed(1);
    }
    else {
        chooseCardDisplayed(2);
    }
    
    //Functions
    function registerThemes(){
        //This would be better done with server side code such as php. But this project js only. 
        themes = [
            { 
                id: "Soccer Players", 
                path: "/assets/json/SoccerPlayers.json", 
            }
        ];

        themes.forEach(t => storeThemeInMemory(t));
        addThemeChoiceButtons();
    }
    function storeThemeInMemory(theme){
        $.getJSON(`${theme.path}`, function(result){
            console.log(`Storing Game Object for ${theme.id}`);
            var json = JSON.stringify(result);
            sessionStorage.setItem(`${theme.id}`, json);
        });
    }
    function addThemeChoiceButtons(){
        var buttons = $();
        for(var i = 0; i < themes.length; i++) {
            var theme = themes[i];
            var btn = $(`<button class="gamestart-theme-button" id="${theme.id}">${theme.id}</button>`);
            buttons = buttons.add(btn)
        }
        $("#gamestart-buttons").html(buttons);
    }
    function registerSounds(){
        //https://www.zapsplat.com//
        sounds["game-positive-1"] = new Audio("/assets/sounds/game-positive.mp3");
        sounds["game-positive-2"] = new Audio("/assets/sounds/game-positive-2.mp3");
        sounds["game-error-1"] = new Audio("/assets/sounds/game-error.mp3");
        sounds["game-error-2"] = new Audio("/assets/sounds/game-error-2.mp3");
        sounds["tension-drum"] = new Audio("/assets/sounds/tension-drum.mp3");
    }

    function getName() {
        return localStorage.getItem("name");
    }

    function storeName(name) {
        localStorage.setItem("name", name);
    }

    function removeName() {
        localStorage.removeItem("name");
    }

    function validateName(name) {
        console.log(name);
        return name != null && 
            name.length > 0 &&
            name != "NAME";
    }

    function chooseCardDisplayed(e) {
        switch(e)
        {
            case 1:
                removeName();
                $(".landing-card").show();
                $(".gamestart-card").hide();
                $(".gameplay").hide();    
                break; 

            case 2:
                validateName(getName()) ? setGameStartName(getName()) : chooseCardDisplayed(1);
                $(".landing-card").hide();
                $(".gamestart-card").show();
                $(".gameplay").hide();   
                break;   
            
            case 3:
                turn = 1;
                validateName(getName()) ? setGamePlayName(getName()) : chooseCardDisplayed(1);
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
        $("#player-name-1 > .name-value")
            .text(name); 
    }

    function updateTotals(){
        $("#player-cards-total-1")
            .html(`has <span style="font-size: 2rem; color: white">${stackOne.length}</span> out of <span style="font-size: 2rem;color: white">${gameObj.cards.length}</span> Cards`);

        $("#player-cards-total-2")
            .html(`has <span style="font-size: 2rem; color: white">${stackTwo.length}</span> out of <span style="font-size: 2rem;color: white">${gameObj.cards.length}</span> Cards`);
    }

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
        //} while( i <= 23)

        for (var j = 1; j <= (cards.length); j++)
        {
            if(pushedStackOneCardIds.includes(j)) { continue; } //if stackOne already has this card        
            var card = findCardInArray(cards, j); //find card by its Id
            stackTwo.push(card) //push this card to stackTwo
        }

        //console.log("P1 Cards:");
        //console.log(JSON.parse(JSON.stringify(stackOne)));

        //console.log("P2 Cards:");
        //console.log(JSON.parse(JSON.stringify(stackTwo)));
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

                container
                    .children(".cat-value")
                    .first()
                    .text((stackId == 2) ? "?" : card.values[i]);     

                container
                    .children(".cat-unit")
                    .first()
                    .text(gameObj.units[i]);   
            } 
    }

    function setBorders(winner, stackId) {
        (winner == stackId && stackId == 1) ? 
            $("#gamecard-" + winner).addClass("flashing-border-1"): 
            $("#gamecard-" + stackId).removeClass("flashing-border-1"); 
        
        (winner == stackId && stackId == 2) ? 
            $("#gamecard-" + winner).addClass("flashing-border-2"): 
            $("#gamecard-" + stackId).removeClass("flashing-border-2"); 
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
                break;

            case 2:
                pushToArray(stackTwo, stackOne);
                break;

            default:
                turn = 1
        }
        if(stackOne.length === 0 || stackTwo.length === 0) {
            return true;   
        }
        renderCards(winner);
        updateTotals();
        return false;
    }

    function declareWinner(winner){
        matchWinnerAlert(winner);
        setTimeout(function(){ 
            processing = false;
        }, 2000);
    }

    var animationInterval;
    function handlePlayerAction(category, caller){
        
        $(".alert-bg").toggleClass("opacity-cover");

        var winner = determineShowdown(
            stackOne[0].values[category], 
            stackTwo[0].values[category]);

        setTimeout(function() {
            showdownAlert(category, caller, 7000);
         }, 0);

        setTimeout(function() {
            showdownWinnerAlert(winner, category, 7000);
            updateScore(calculateShowdownPointsGained(stackOne[0].values[category], stackTwo[0].values[category], winner));
        }, 7000);

        setTimeout(function() {    
            var isWinner = goToNextShowdown(winner);   
            if(isWinner) {
                winner == 1 ? declareWinner(1) : declareWinner(2);
                return;   
             } 
            nextMoveAlert(winner);
            $(".alert-bg").toggleClass("opacity-cover");
            clearInterval(animationInterval);
        }, 14000);

        setTimeout(function(){
            winner == 1 ? sounds["game-positive-1"].play() : sounds["game-error-2"].play();
            var color = $("#player-score-value").css("color");
            $("#player-score-value").flash(2, 500,'', function() { $("#player-score-value").css("color", color) });
        }, 16000);
    }

    function showdownAlert(category, caller, showFor) {                
        $("#showdown-player-name-1").text(getName());
        $("#showdown-player-name-2").text("Player 2");

        if(caller == 1) {
            $("#showdown-selected-1").css("opacity", "1");
            $("#showdown-selected-2").css("opacity", "0");
        }  
        else {
            $("#showdown-selected-1").css("opacity", "0");
            $("#showdown-selected-2").css("opacity", "1");
        }

        $("#showdown-name-1").text(stackOne[0].name);
        $("#showdown-name-2").text(stackTwo[0].name);

        $("#showdown-img-1").children("img").first().attr("src", stackOne[0].img);
        $("#showdown-img-2").children("img").first().attr("src", stackTwo[0].img);

        $("#showdown-category-1").text(categories[category]);
        $("#showdown-category-2").text(categories[category]);

        $("#showdown-value-1").text(stackOne[0].values[category] + " " + units[category]);
        
        $("#showdown-value-2").text("?");
        
        setTimeout(function() {
            $("#showdown-value-2").animate({ opacity: 0 }, function() {
                $("#showdown-value-2").text(stackTwo[0].values[category] + "" + units[category])
                    .animate({ opacity: 1 });
                var color = $("#showdown-value-2").css('color');
                $("#showdown-value-2")
                    .flash(3, 500,'', function() { $("#showdown-value-2").css('color', color) }, "#0000ff");
            });
        }, 3000);

        sounds["tension-drum"].play();

        showAlert(
            $(".showdown-alert"),
            ``,
            1, 
            true, 
            "#99d6ff", 
            showFor);
    }

    function showdownWinnerAlert(winner, category, showFor) {
        var nameWinner = winner == 1 ? getName() : "Player 2";
        var winningCard = winner == 1 ? stackOne[0] : stackTwo[0];
        var losingCard = winner == 1 ? stackTwo[0] : stackOne[0];

        $(".winner-name").text(nameWinner);
        $(".winner-category").text(categories[category]);
        $(".winner-value").html(stackOne[0].values[category] + " " + units[category] + "<span style='font-size: 1.5rem'>  vs.  </span>" + stackTwo[0].values[category] + " " + units[category]);
        $(".winner-card").text(winningCard.name);
        $(".losing-card").text(losingCard.name);
        $("#player-1-name").text(getName());

        winner == 1 ? 
        sounds["game-positive-2"].play(): 
        sounds["game-error-1"].play();
        
        winner == 1 ? 
        animationInterval = setInterval(animateArrowsLeft, 1000): 
        animationInterval = setInterval(animateArrowsRight, 1000);

        setTimeout(function() {
            if(winner == 1){
                $("#losing-gamecard-name").blindLeftOut(3000, function(){ setTimeout(function() { $("#losing-gamecard-name").css("margin-left", 0)}, 4000); });
                $("#player-1-name").flash(3, 500,'', function() { $("#player-1-name").css("color", "#000") }, "#0000ff");
            }
            else {
                $("#losing-gamecard-name").blindRightOut(3000, function(){ setTimeout(function() { $("#losing-gamecard-name").css("margin-left", 0)}, 4000); })
                $("#player-2-name").flash(3, 500,'', function() { $("#player-2-name").css("color","#000") }, "#0000ff");
            }
            $(".score-update").html(`<p>${getName()} you now have <span class="emphasise">${winner == 1 ? (stackOne.length) + 1 : (stackOne.length) - 1}</span> Cards</p>`);  
            $(".emphasise").flash(3, 500,'', function() { $(".emphasise").css("color","#000") }, "#0000ff");     
        }, 2000);

        showAlert(
            $(".winner-alert"),
            ``,
            1,  
            true, 
            winner == 1 ? "#ff3399" :"#ace600", 
            showFor);
    }

    function matchWinnerAlert(winner) {
        var nameWinner = winner == 1 ? getName() : "Player 2";

        $(".winner-name").text(nameWinner);

        showAlert(
            $(".match-winner-alert"),
            ``,
            1, 
            false, 
            "#ff99ff");
    }

    //https://github.com/yckart/jquery-custom-animations
    jQuery.fn.blindRightOut = function (duration, easing, complete) {
        return this.animate({
            marginLeft: this.outerWidth()
        }, jQuery.speed(duration, easing, complete));
    };

    jQuery.fn.blindLeftOut = function (duration, easing, complete) {
        return this.animate({
            marginLeft: -this.outerWidth()
        }, jQuery.speed(duration, easing, complete));
    };

    jQuery.fn.flash = function (times, duration, easing, complete, color = "#ffff00") {
        times = (times || 2) * 2;
        while(times--){
            this.animate({
                opacity: !(times % 2), 
                color: color
            }, duration, easing, complete);
        }
        return this;
    };

    function animateArrowsRight() {

        $('.left').removeClass('arrow-left').addClass('arrow-right');
        $('.middle').removeClass('arrow-left').addClass('arrow-right');
        $('.right').removeClass('arrow-left').addClass('arrow-right');
        
        $('.left').fadeTo(500, 1).delay(500).fadeTo(500, 0);
        $('.middle').delay(250).fadeTo(500, 1).delay(500).fadeTo(500, 0);
        $('.right').delay(500).fadeTo(500, 1).delay(500).fadeTo(500, 0);
    }

    function animateArrowsLeft() {     
        $('.left').removeClass('arrow-right').addClass('arrow-left');
        $('.middle').removeClass('arrow-right').addClass('arrow-left');
        $('.right').removeClass('arrow-right').addClass('arrow-left');
        
        $('.left').fadeTo(500, 1).delay(500).fadeTo(500, 0);
        $('.middle').delay(250).fadeTo(500, 1).delay(500).fadeTo(500, 0);
        $('.right').delay(500).fadeTo(500, 1).delay(500).fadeTo(500, 0);
    }

    function nextMoveAlert(winner){
        winner === 1 ? 
            showAlert($(".gameplay-alert"), `${getName()}\nit is your turn, choose your category!`, 0.8, false, "#ff3399") :
            showAlert($(".gameplay-alert"),`Click here to force Player 2 move!`, 0.8, false, "#ace600");
    }

    function simulatePlayerTwoAction() {
        if(turn != 2) {
            return;
        }
        
        console.log("P2 is making their decision..."); 
        console.log(`For card ${stackTwo[0].name}, P2 selects category: ${categories[stackTwo[0].best]} `);
        console.log(`Showdown: ${stackOne[0].values[stackOne[0].best]} vs ${stackTwo[0].values[stackTwo[0].best]}`);
   
        handlePlayerAction(stackTwo[0].best, 2);
    }

    //https://www.sitepoint.com/delay-sleep-pause-wait/
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function showAlert(alert, html = "", opacity, hide, backgroundColor, showForMs = 0) {
        if(html != "") {
            alert.html(html)
        }
        alert.css("opacity", opacity).css("background-color", backgroundColor); 
        alert.slideDown("slow");            
        if(hide){
            setTimeout(function() { hideAlert(alert)}, showForMs);
        }
    }
    function hideAlert(alert) {
            $(alert).slideUp("slow"); 
        }

    //Events
    $(".card-button").click(function() {

        let name = $(".landing-card-name-input")
                        .val();
        storeName(name);
        
        if(validateName(name)){
            chooseCardDisplayed(2);
        }
        else{         
           showAlert($(".alert"), "Please enter your name", 1, 1, "#fbd000", 2000);
           sounds["game-error-1"].play();
        }
    });

    $(".gamestart-theme-button").click(function() {
        gameObj = {}; //clear global value before resetting
        gameObj = JSON.parse(sessionStorage.getItem(this.id));
        categories = gameObj.categories;
        units = gameObj.units;
        var gamestartSound = new Audio(gameObj.sound).play();

        dealCardsRandomly(); 
        chooseCardDisplayed(3);
        renderCards(1);
        updateTotals();
        resetScore();
        updateScore(0);
        nextMoveAlert(1);
    })

    var processing = false;
    $(".gamecard-category-1").click(function() {
        if(turn != 1) {
            sounds["game-error-1"].play();
            var color = $(".gameplay-alert").css("color");
            $(".gameplay-alert").flash(2, 500,'', function() { $(".gameplay-alert").css("color", color) });
            return;
        }
        if(processing) {
            return;
        }
        
        console.log(`P1 selected Category: 
            ${$(this).find(".cat-name").text()}${$(this).find(".cat-score").text()}`);

        var category = this.id.split("-")[3];

        handlePlayerAction(category, 1);

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

        simulatePlayerTwoAction();

        processing = true;
        setTimeout(function(){ 
            processing = false;
        }, 2000);
    })

    $(".restart").click(function() {
        $(".alert-bg").removeClass("opacity-cover");
        $(".match-winner-alert").hide();
        chooseCardDisplayed(2);
    })

    $(".change-name").click(function() {
        chooseCardDisplayed(1);
    })
});

