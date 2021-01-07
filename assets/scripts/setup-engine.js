/**
  * This function chooses the modal card to show
  * @param {int} e requested enum of card to show 
  * 1 == landing card; 2 == gamestart; 3 == gameplay
*/
function chooseCardDisplayed(e) {
    if(!validateName(getName())) {
        e = 1;
    }

    switch(e)
    {
        case 1:
            removeName();
            $(".landing-card").show();
            $(".gamestart-card").hide();
            $(".gameplay").hide();  
            $('html, body').animate({ scrollTop: 0 }, 'fast'); 
            break; 

        case 2:
            $(".landing-card").hide();
            $(".gamestart-card").show();
            $(".gameplay").hide(); 
            setElementNameWithStrong($("#gamestart-card-name"), getName());
            break;   
            
        case 3:
            turn = 1;                  
            $(".landing-card").hide();
            $(".gamestart-card").hide();
            $(".gameplay").show();
            setElementName($("#player-name-1 > .name-value"), getName());  
            break;  
            
        default:
            $(".landing-card").show();
            $(".gamestart-card").hide();
            $(".gameplay").hide();  
            break;           
    }

    $('html, body').animate({ scrollTop: 0 }, 'fast');
}
   

/**
  * This function adds theme specific sounds to the global sound registration
*/
function decorateSounds() {
    try {
        themes.forEach(function(t) {
            var audio = new Audio(JSON.parse(sessionStorage.getItem(t.id)).sound);
            console.log("pushing audio for " + t.id + " to sounds");
            sounds.push({
                name: t.id, audio: audio
            });
        });
    }
    catch(error){
        console.error(error);
    }
}



/**
  * This function adds buttons to the gamestart card depending on the registered themes
*/
function addThemeChoiceButtons(){
    var buttons = $();
    for(var i = 0; i < themes.length; i++) {
        var theme = themes[i];
        var btn = $(`<button class="gamestart-theme-button" id="${theme.id}">${theme.id}</button>`);
        buttons = buttons.add(btn);
    }
    $("#gamestart-buttons").html(buttons);
}


/**
  * This function loads the rules text to the popover
  * @param {string} path dir path of rules.txt file 
  * @param {int} element element to update with content
*/
function loadRulesText(path, element){
    $.get(path, function(data) {
        element.attr('data-content', data); 
    });
}
