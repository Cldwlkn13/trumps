//https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function findCardInArray(cards, n) {
    var card = cards.find(obj => {
        return obj.cardId === n; //find card by its Id
    });
    return card;
}

function showAlert(alert, html = "", opacity, hide, backgroundColor, showForMs = 0) {
    if(html != "") {
        alert.html(html)
    }
    alert.css("opacity", opacity).css("background-color", backgroundColor); 
    alert.slideDown("slow");            
    if(hide){
        setTimeout(function() { 
            hideAlert(alert) 
        }, showForMs);
    }
}

function hideAlert(alert) {
    $(alert).slideUp("slow"); 
}

function getName() {
    return sessionStorage.getItem("name");
}

function storeName(name) {
    sessionStorage.setItem("name", name);
}

function removeName() {
    sessionStorage.removeItem("name");
}

function validateName(name) {
    return name != null && 
        name.length > 0 && 
        name.length < 18; //SET HARD CHARACTER LIMIT TO PROTECT STYLING FROM EXTRA LONG NAME STRINGS
}

function stopSounds(){
    sounds.forEach(function(s) { 
        s.audio.pause();
    });
}