//STARTUP
registerThemes();
registerSounds();

$('document').ready(function(){   

    addThemeChoiceButtons();
    loadRulesText();
    
    if(!validateName(sessionStorage.getItem("name"))) {
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

    function loadRulesText(){
        $.get('../rules.txt', function(data) {
            $("#rules-popover").attr('data-content',data); 
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
        let name = $("#landing-card-name-input").val();

        if(validateName(name)){
            storeName(name);
            chooseCardDisplayed(2);
        }
        else{         
           showAlert($(".alert"), "Please enter your name", 1, 1, "#fbd000", 2000);
           sounds.find(n => n.name == "game-error-1").audio.play()
        }
    });

    $(".gamestart-theme-button").click(function() {
        gameObj = {}; //clear global value before resetting
        gameObj = JSON.parse(sessionStorage.getItem(this.id));
        categories = gameObj.categories;
        units = gameObj.units;
        sounds.find(s => { return s.name === gameObj.theme }).audio.play();

        dealCardsRandomly(); 
        chooseCardDisplayed(3);
        renderCards(1);
        updateTotals();
        resetScore();
        updateScore(0);
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

