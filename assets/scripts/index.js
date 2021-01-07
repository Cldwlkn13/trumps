//GLOBALS
var turn = 1;
var stackOne = [];
var stackTwo = [];
var themes = [];
var gameObj = {};
var categories = {};
var units = {};
var sounds = [];
var arrowAnimationInterval;
var continueGamePlayProcessing = true; //FLAG THAT DETERMINES WHETHER GAMEPLAY ENGINE CAN CONTINUE TO NEXT STAGE (i.e. RESTART NOT BEEN TRIGGERED)
var isGamePlayProcessing = false; //FLAG THAT DETERMINES IF THE GAMEPLAY ENGINE IS PROCESSING (MUST WAIT ON OPERATIONS TO COMPLETE BEFORE OTHER ACTIONS CAN PROCESS)
var alertTimeout;
var winnerShowdownTimeout;
var nextMoveSetupTimeout;
var addtionalAnimationTimeout;
const showAlertsForMs = 5000;
const maxNameCharLimit = 12;

$('document').ready(function(){ 
    //STARTUP REGISTRATIONS
    registerThemes();
    registerSounds();
    
    //CALL SETUP ENGINE
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
    }, 1000); //WAIT 1s for REGISTRATIONS TO FULLY COMPLETE

    //DOM EVENTS
    //FLAG TO DISABLE EVENTS WHILE BACKGROUND PROCESSING IS CONTINUING
    $("#submit-name-btn").click(function() {
        let name = $("#landing-card-name-input").val();

        if(validateName(name)){
            storeName(name);
            chooseCardDisplayed(2);
            return;
        }
        if(!validateNameLength(name)) {
            clearTimeout(alertTimeout);
            hideAlert($(".alert"));
            showAlert($(".alert"), 1, 1, "#fbd000", `Name is too long, choose name of ${maxNameCharLimit} characters or less!`, 2000);
            sounds.find(n => n.name == "game-error-1").audio.play();
        }
        else{         
            clearTimeout(alertTimeout);
            hideAlert($(".alert"));
            showAlert($(".alert"), 1, 1, "#fbd000", "Invalid name", 2000);
            sounds.find(n => n.name == "game-error-1").audio.play();
        }
    });

    $(".gamestart-theme-button").click(function() {
        if(isGamePlayProcessing) { //WAIT UNTIL PROCESSING OF GAMEPLAY FINISHED BEFORE INITIATING NEW GAME
            clearTimeout(alertTimeout);
            hideAlert($(".alert"));
            showAlert($(".alert"), 1, 1, "#fbd000", "Game will be ready in a few seconds, I will notify you when!", 3000);
            return; 
        } 

        gameObj = {}; //clear global value before resetting
        gameObj = JSON.parse(sessionStorage.getItem(this.id));
        categories = gameObj.categories;
        units = gameObj.units;
        sounds.find(s => { return s.name === gameObj.theme; }).audio.play();

        turn = 1;
        dealCardsRandomly(gameObj.cards); 
        chooseCardDisplayed(3);
        renderCards(1);
        updateTotals();
        resetGameScore($("#player-score-value"));
        setGameScore(0, $("#player-score-value"));
        updateHighScore(0, getCurrentHighScore(), $("#player-high-score-value"));


        continueGamePlayProcessing = true; //SET CONTINUE TO TRUE
        nextMoveAlert(1);

        //IF CARD 2 NAME NOT AUTO VISIBLE IN VIEWPORT THEN DISPLAY FIXED TO BOTTOM 
        if($(".float-offscreen").visible() === false) {
            $(".float-offscreen").css({"position":"fixed","bottom":"10px", "opacity":"0.8"});
            $("#name-2").css({"background-color": "#000", "padding": "10px"});
        }
    });

    $(function(){
        $(window).scroll(function(){
            if($("#img-2").visible()) { //ON SCROLL CHECK FOR VISIBILITY OF CARD 2
                $(".float-offscreen").css({"position":"","bottom":"", "opacity":"1"});
                $("#name-2").css({"background-color": "#b30000"});
            }else {
                $(".float-offscreen").css({"position":"fixed","bottom":"10px", "opacity":"0.75"});
                $("#name-2").css({"background-color": "#000", "padding": "10px"});
            }
        });
    });

    $("#theme-idea-input").on('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13 || e.key === 'Tab' || e.keyCode === 9) {
            if(!validateName(getName())) {
                sounds.find(n => n.name == "game-error-1").audio.play();
                clearTimeout(alertTimeout);
                hideAlert($(".alert"));
                showAlert($(".alert"), 1, 1, "#ff0000",  "Please enter your name to send suggestion", 2000);
                return;
            }
            emailjs.send("service_rngxglh", "template_vc4w01v",{from_name: getName(), message: $(this).val()});
            $(this).val('');
            $(this).attr("placeholder","Your suggestion has been sent!");
            $(this).flash(2, 500,'', function() { $(this).css("color", "#000"); });
        }
    });

    
    $(".gamecard-category-1").click(function() {
        if(isGamePlayProcessing) { //CHECK IS GAMEPLAY STILL PROCESSING FROM A PREVIOUS MOVE
            return; 
        } 

        if(turn != 1) {
            sounds.find(n => n.name == "game-error-1").audio.play();
            var color = $(".gameplay-alert").css("color");
            $(".gameplay-alert").flash(2, 500,'', function() { $(".gameplay-alert").css("color", color); });
            return;
        }

        stopSounds(); //STOP PLAYING ANY AUDIO THAT MIGHT BE PLAYING FROM PREVIOUS GAME
        var category = this.id.split("-")[3];
        isGamePlayProcessing = true; //SET GAMEPLAY PROCESSING FLAG TO TRUE
        handlePlayerAction(category, 1);
    });

    $(".restart").click(function() {
        if (confirm('Are you sure?')) {
            continueGamePlayProcessing = false; //SET CONTINUE FLAG TO FALSE - THIS WILL CUT THE GAMEPLAY ENGINE AT THE NEXT STAGE

            stopSounds(); //STOP PLAYING ANY AUDIO THAT MIGHT BE PLAYING FROM PREVIOUS GAME
            $(".alert-bg").removeClass("opacity-cover"); //REMOVE OPAQUE BG 

            //CLEAR GAMEPLAY ENGINE TIMEOUTS THAT MAY BE SET
            clearTimeout(alertTimeout);
            clearTimeout(winnerShowdownTimeout); 
            clearTimeout(nextMoveSetupTimeout);
            clearTimeout(addtionalAnimationTimeout);

            if(window.getComputedStyle(document.getElementsByClassName("showdown-alert")[0]).display === "block" || 
            window.getComputedStyle(document.getElementsByClassName("winner-alert")[0]).display === "block") { 
                showAlert($(".alert"), 1, 1, "#fbd000", "Restarting Game!", 1000);
                setTimeout(function(){
                    isGamePlayProcessing = false; //SET PROCESSING FLAG TO FALSE
                    $(".gamestart-theme-button").flash(2, 200,'', function() { $(".gamestart-theme-button").css('color', "#000"); }, "#0000ff");
                    clearTimeout(alertTimeout);
                    hideAlert($(".alert"));
                    showAlert($(".alert"), 1, 1, "#47d147", "Ready To Play!", 1000);
                }, showAlertsForMs);
            }

            //HIDE THE ALERTS
            hideAlert($(".showdown-alert")); 
            hideAlert($(".winner-alert")); 
            hideAlert($(".match-winner-alert"));

            chooseCardDisplayed(2); //SHOW GAMESTART CARD
        }
    });

    $(".change-name").click(function() {
        stopSounds();
        chooseCardDisplayed(1);
    });

    $("[data-toggle=popover]").popover();

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });
});

