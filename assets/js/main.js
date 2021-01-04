$('document').ready(function(){   
    //STARTUP
    registerThemes();
    registerSounds();
    addThemeChoiceButtons();
    loadRulesText('rules.txt', $("#rules-popover"));

    setTimeout(function(){
        decorateSounds();

        if(!validateName(sessionStorage.getItem("name"))) {
            chooseCardDisplayed(1);
        }
        else {
            chooseCardDisplayed(2);
        }
    }, 300);
    
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

    function loadRulesText(path, element){
        $.get(path, function(data) {
            element.attr('data-content',data); 
        });
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
                validateName(getName()) ? setElementNameWithStrong($("#gamestart-card-name"), getName()) : chooseCardDisplayed(1);
                $(".landing-card").hide();
                $(".gamestart-card").show();
                $(".gameplay").hide(); 
                break;   
            
            case 3:
                turn = 1;
                validateName(getName()) ? setElementName($("#player-name-1 > .name-value"), getName()) : chooseCardDisplayed(1);
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

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    } 


    //DOM EVENTS
    $("#submit-name-btn").click(function() {
        let name = $("#landing-card-name-input").val();

        if(validateName(name) && validateNameLength(name)){
            storeName(name);
            chooseCardDisplayed(2);
            return;
        }
        if(!validateNameLength(name)) {
            showAlert($(".alert"), "Your name is too long!", 1, 1, "#fbd000", 2000);
            sounds.find(n => n.name == "game-error-1").audio.play();
        }
        else{         
            showAlert($(".alert"), "Please enter your name", 1, 1, "#fbd000", 2000);
            sounds.find(n => n.name == "game-error-1").audio.play();
        }
    });

    $(".gamestart-theme-button").click(function() {
        console.log("waaaaaaaa");
        gameObj = {}; //clear global value before resetting
        gameObj = JSON.parse(sessionStorage.getItem(this.id));
        categories = gameObj.categories;
        units = gameObj.units;
        sounds.find(s => { return s.name === gameObj.theme }).audio.play();

        dealCardsRandomly(); 
        chooseCardDisplayed(3);
        renderCards(1);
        updateTotals();
        resetGameScore($("#player-score-value"));
        setGameScore(0, $("#player-score-value"));
        updateHighScore(0, $("#player-high-score-value"));
        nextMoveAlert(1);
        continueProcessing = true;

        //IF CARD 2 NAME NOT AUTO VISIBLE IN VIEWPORT THEN DISPLAY FIXED TO BOTTOM 
        if($(".float-offscreen").visible() === false) {
            $(".float-offscreen").css({"position":"fixed","bottom":"10px", "opacity":"0.8"});
            $("#name-2").css({"background-color": "#000", "padding": "10px"});
        }
    })

    $(function(){
        $(window).scroll(function(){
            if($("#img-2").visible()) { //ON SCROLL CHECK FOR VISIBILITY OF CARD 2
                $(".float-offscreen").css({"position":"","bottom":"", "opacity":"1"});
                $("#name-2").css({"background-color": "#b30000"})
            }else {
                $(".float-offscreen").css({"position":"fixed","bottom":"10px", "opacity":"0.75"});
                $("#name-2").css({"background-color": "#000", "padding": "10px"})
            }
        });
    });

    $("#theme-idea-input").on('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13 || e.key === 'Tab' || e.keyCode === 9) {
            if(!validateName(getName())) {
                sounds.find(n => n.name == "game-error-1").audio.play();
                showAlert($(".alert"), "Please enter your name to send suggestion", 1, 1, "#ff0000", 2000);
                return;
            }
            emailjs.send("service_rngxglh", "template_vc4w01v",{from_name: getName(), message: $(this).val()})
            $(this).val('');
            $(this).attr("placeholder","Your suggestion has been sent!");
            $(this).flash(2, 500,'', function() { $(this).css("color", "#000") });
        }
    });

    var processing = false; //FLAG TO DISABLE EVENTS WHILE BACKGROUND PROCESSING IS CONTINUING
    $(".gamecard-category-1").click(function() {
        if(turn != 1) {
            sounds.find(n => n.name == "game-error-1").audio.play();
            var color = $(".gameplay-alert").css("color");
            $(".gameplay-alert").flash(2, 500,'', function() { $(".gameplay-alert").css("color", color) });
            return;
        }
        if(processing) {
            return;
        }

        stopSounds();
        
        console.log(`P1 selected Category: ${$(this).find(".cat-name").text()}${$(this).find(".cat-score").text()}`);

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
        continueProcessing = false;
        stopSounds();
        $(".alert-bg").removeClass("opacity-cover");
        $(".match-winner-alert").hide();
        chooseCardDisplayed(2);
    })

    $(".change-name").click(function() {
        stopSounds();
        chooseCardDisplayed(1);
    })

    $("[data-toggle=popover]").popover();

    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
});

