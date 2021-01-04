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
    
function decorateSounds() {
    themes.forEach(function(t) {
        var audio = new Audio(JSON.parse(sessionStorage.getItem(t.id)).sound);
        sounds.push({
            name: t.id, audio: audio
        })
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

function loadRulesText(path, element){
    $.get(path, function(data) {
        element.attr('data-content', data); 
    });
}
