$('document').ready(function(){   
    
    //STARTUP
    registerThemes();
    registerSounds();
    addThemeChoiceButtons();
    
    if(!validateName(localStorage.getItem("name"))) {
        chooseCardDisplayed(1);
    }
    else {
        chooseCardDisplayed(2);
    }
    
    //DOM FUNCTIONS
    function addThemeChoiceButtons(){
        var buttons = $();
        for(var i = 0; i < themes.length; i++) {
            var theme = themes[i];
            var btn = $(`<button class="gamestart-theme-button" id="${theme.id}">${theme.id}</button>`);
            buttons = buttons.add(btn)
        }
        $("#gamestart-buttons").html(buttons);
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

    

    

    

    //DOM EVENTS
    $("#submit-name-btn").click(function() {
        let name = $(".landing-card-name-input").val();

        if(validateName(name)){
            storeName(name);
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

    var processing = false; //FLAG TO DISABLE EVENTS WHILE BACKGROUND PROCESSING IS CONTINUING
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

        processing = true;
        handlePlayerAction(category, 1);

        setTimeout(function(){ 
            processing = false;
        }, 2000);
    })

   
    $("#stack-2, .gameplay-alert").on("click",function() {
        if(turn != 2 || processing) {
            console.log("Please wait");
            return;
        }

        processing = true;
        handlePlayerAction(stackTwo[0].best, 2);

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

