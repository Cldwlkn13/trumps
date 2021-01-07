/**
  * This function takes in an int, performs action on gameplay-alert element
  * @param {int} winner winner of previous showdown (range 1 ---> 2)
*/
function nextMoveAlert(winner){
    if(!continueGamePlayProcessing) { return; } //CHECK CONTINUE FLAG NOT SET TO FALSE

    winner === 1 ? 
        $(".gameplay-alert").html(`<h2>${getName()}</h2> it is your turn, choose your category!`) :
        $(".gameplay-alert").html(``);
}

/**
  * This function performs actions on the showdown-alert
  * @param {int} category category selected by player (range 1 ---> 2)
  * @param {int} caller which player called the function (range 1 ---> 2)
  * @param {int} displayForMs how long should the alert display for
*/
function showdownAlert(category, caller, displayForMs) {                
    if(!continueGamePlayProcessing) { return; } //CHECK CONTINUE FLAG NOT SET TO FALSE

    if(caller == 2){
        showAlert($(".alert"), 1, 1, "#ff6666", "PLAYER 2 is taking their turn!", 2000);
    }

    //SET CONTENT
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
        
    //BUILD TENSION AUDIO
    sounds.find(n => n.name == "tension-drum").audio.play();
        
    //ANIMATE FLASHING REVEAL
    setTimeout(function() {
        if(!continueGamePlayProcessing) { return; } //CHECK CONTINUE FLAG NOT SET TO FALSE
        $("#showdown-value-2").animate({ opacity: 0 }, function() {
            $("#showdown-value-2").text(stackTwo[0].values[category] + " " + units[category])
                .animate({ opacity: 1 });
            var color = $("#showdown-value-2").css('color');
            $("#showdown-value-2")
                .flash(2, 500,'', function() { $("#showdown-value-2").css('color', color); }, "#0000ff");
        });
    }, 2000);

    //SHOW ALERT
    showAlert(
        $(".showdown-alert"), //ELEMENT TO SHOW
        1, //OPACITY
        true, //HIDES ITSELF?
        "#99d6ff", //BACKGROUND-COLOR
        '', //TEXT
        displayForMs //DISPLAY FOR MS BEFORE HIDING
    );
}

/**
  * This function performs actions on the winner-alert (The alert that follows the showdown, that displays the winner of that showdown to the user)
  * @param {int} winner winner of the showdown (range 1 ---> 2)
  * @param {int} category category selected by player (range 1 ---> categories.length)
  * @param {int} displayForMs how long should the alert display for
*/
function showdownWinnerAlert(winner, category, displayForMs) {
    if(!continueGamePlayProcessing) { return; } //CHECK CONTINUE FLAG NOT SET TO FALSE

    var nameWinner = winner == 1 ? getName() : "Player 2";
    var winningCard = winner == 1 ? stackOne[0] : stackTwo[0];
    var losingCard = winner == 1 ? stackTwo[0] : stackOne[0];

    //SET CONTENT
    $(".winner-name").text(nameWinner);
    $(".winner-category").text(categories[category]);
    $(".winner-value").html(stackOne[0].values[category] + " " + units[category] + 
        "<span style='font-size: 1.5rem'>  vs.  </span>" + stackTwo[0].values[category] + " " + units[category]);
    $(".winner-card").text(winningCard.name);
    $(".losing-card").text(losingCard.name);
    $("#player-1-name").text(getName());

    //AUDIO
    winner == 1 ?
        sounds.find(n => n.name == "game-positive-2").audio.play() :
        sounds.find(n => n.name == "game-error-1").audio.play();
    
    //ANIMATIONS WAITING 1.5s
    setTimeout(function() {
        if(!continueGamePlayProcessing) { return; } //CHECK CONTINUE FLAG NOT SET TO FALSE
        if(winner == 1){
            //PUSH LOSING CARD NAME TO LEFT & FLASH PLAYER 1 NAME 
            $("#losing-gamecard-name").blindLeftOut(2000, function(){ setTimeout(function() { $("#losing-gamecard-name").css("margin-left", 0); }, 4000); });
            $("#player-1-name").flash(2, 500,'', function() { $("#player-1-name").css("color", "#000"); }, "#0000ff");
        }
        else {
            //PUSH LOSING CARD NAME TO RIGHT & FLASH PLAYER 2 NAME 
            $("#losing-gamecard-name").blindRightOut(2000, function(){ setTimeout(function() { $("#losing-gamecard-name").css("margin-left", 0);}, 4000); });
            $("#player-2-name").flash(2, 500,'', function() { $("#player-2-name").css("color","#000"); }, "#0000ff");
        }
        //UPDATE SCORE WITH AUDIO AND FLASH
        $(".score-update").html(`<p>${getName()} you now have <span class="emphasise">${winner == 1 ? (stackOne.length) + 1 : (stackOne.length) - 1}</span> Cards</p>`);  
        $(".emphasise").flash(2, 500,'', function() { $(".emphasise").css("color","#000"); }, "#0000ff");     
    }, 1500);

    //SHOW ALERT
    showAlert(
        $(".winner-alert"), //ELEMENT TO SHOW
        1, //OPACITY  
        true, //HIDES ITSELF?
        "#33cccc", //BACKGROUND-COLOR
        '', //TEXT
        displayForMs //DISPLAY FOR MS BEFORE HIDING
    );
}

/**
  * This function performs actions on the match-winner-alert
  * @param {int} winner winner of match showdown (range 1 ---> 2)
*/
function matchWinnerAlert(winner) {
    if(!continueGamePlayProcessing) { return; } //CHECK CONTINUE FLAG NOT SET TO FALSE

    //SET CONTENT
    var nameWinner = winner == 1 ? getName() : "Player 2";
    $(".winner-name").text(nameWinner);

    //SHOW ALERT
    showAlert(
        $(".match-winner-alert"), //ELEMENT TO SHOW
        1, //OPACITY
        false, //HIDES ITSELF?
        "#ff99ff" //BACKGROUND-COLOR
    );
}

/**
  * This function performs actions on the match-winner-alert
  * @param {object} alert alert element context
  * @param {int} opacity opacity to display alert at (range 0 ---> 1)
  * @param {bool} hide do you want to call the hideAlert function 
  * @param {string} backgroundColor bg color to display
  * @param {string} html default html for the alert
  * @param {int} showForMs show for ms before hiding
*/
function showAlert(alert, opacity, hide, backgroundColor, html = "", showForMs = 0) {
    if(html != "") {
        alert.html(html);
    }
    alert.css("opacity", opacity).css("background-color", backgroundColor); 
    alert.slideDown("slow");            
    if(hide){
        alertTimeout = setTimeout(function() { 
            hideAlert(alert, 'slow'); 
        }, showForMs);
    }
}

/**
  * This function performs actions on the match-winner-alert
  * @param {object} alert alert element context
  * @param {string} slide speed of slide if requested
*/
function hideAlert(alert, slide) {
    if(slide != null) {
        $(alert).slideUp(slide); 
        return;
    }
    $(alert).hide();
}