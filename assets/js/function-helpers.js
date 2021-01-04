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

//NAME STORAGE AND RETRIEVAL FUNCTIONS
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
        name.length > 0; 
}

function validateNameLength(name){
    return name.length < 18; //SET HARD CHARACTER LIMIT TO PROTECT STYLING FROM EXTRA LONG NAME STRINGS
}

function setElementNameWithStrong(element, name) {
    element.html(`<strong>${name}</strong>`);
}

function setElementName(element, name){
    element.text(name); 
}

function stopSounds(){
    sounds.forEach(function(s) { 
        s.audio.pause();
    });
}