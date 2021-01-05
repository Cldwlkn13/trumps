function nextMoveAlert(winner){
    winner === 1 ? 
        showAlert($(".gameplay-alert"), 0.8, false, "#ff3399", `<h2>${getName()}</h2> it is your turn, choose your category!`) :
        showAlert($(".gameplay-alert"), 0.8, false, "#ace600", `Click here to force Player 2 move!`);
}

function showdownAlert(category, caller, displayForMs) {                
    if(!continueProcessing) {
        return;
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
        $("#showdown-value-2").animate({ opacity: 0 }, function() {
            $("#showdown-value-2").text(stackTwo[0].values[category] + " " + units[category])
                .animate({ opacity: 1 });
            var color = $("#showdown-value-2").css('color');
            $("#showdown-value-2")
                .flash(3, 500,'', function() { $("#showdown-value-2").css('color', color); }, "#0000ff");
        });
    }, 3000);

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

function showdownWinnerAlert(winner, category, displayForMs) {
    if(!continueProcessing) {
        return;
    }
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

    //ANIMATION & AUDIO
    if(winner == 1){
        sounds.find(n => n.name == "game-positive-2").audio.play();
        arrowAnimationInterval = setInterval(animateArrowsLeft, 1000);
    }
    else {
        sounds.find(n => n.name == "game-error-1").audio.play();
        arrowAnimationInterval = setInterval(animateArrowsRight, 1000);
    }

    //ANIMATIONS WAITING 2s
    setTimeout(function() {
        if(winner == 1){
            //PUSH LOSING CARD NAME TO LEFT & FLASH PLAYER 1 NAME 
            $("#losing-gamecard-name").blindLeftOut(3000, function(){ setTimeout(function() { $("#losing-gamecard-name").css("margin-left", 0); }, 4000); });
            $("#player-1-name").flash(3, 500,'', function() { $("#player-1-name").css("color", "#000"); }, "#0000ff");
        }
        else {
            //PUSH LOSING CARD NAME TO RIGHT & FLASH PLAYER 2 NAME 
            $("#losing-gamecard-name").blindRightOut(3000, function(){ setTimeout(function() { $("#losing-gamecard-name").css("margin-left", 0);}, 4000); });
            $("#player-2-name").flash(3, 500,'', function() { $("#player-2-name").css("color","#000"); }, "#0000ff");
        }
        //UPDATE SCORE WITH AUDIO AND FLASH
        $(".score-update").html(`<p>${getName()} you now have <span class="emphasise">${winner == 1 ? (stackOne.length) + 1 : (stackOne.length) - 1}</span> Cards</p>`);  
        $(".emphasise").flash(3, 500,'', function() { $(".emphasise").css("color","#000"); }, "#0000ff");     
    }, 2000);

    //SHOW ALERT
    showAlert(
        $(".winner-alert"), //ELEMENT TO SHOW
        1, //OPACITY  
        true, //HIDES ITSELF?
        winner == 1 ? "#ff3399" :"#ace600", //BACKGROUND-COLOR
        '', //TEXT
        displayForMs //DISPLAY FOR MS BEFORE HIDING
    );
}

function matchWinnerAlert(winner) {
    if(!continueProcessing) {
        return;
    }
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

function showAlert(alert, opacity, hide, backgroundColor, html = "", showForMs = 0) {
    if(html != "") {
        alert.html(html);
    }
    alert.css("opacity", opacity).css("background-color", backgroundColor); 
    alert.slideDown("slow");            
    if(hide){
        setTimeout(function() { 
            hideAlert(alert); 
        }, showForMs);
    }
}

function hideAlert(alert) {
    $(alert).slideUp("slow"); 
}