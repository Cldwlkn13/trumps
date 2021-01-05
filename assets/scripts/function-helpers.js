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

function stopSounds(){
    sounds.forEach(function(s) { 
        s.audio.pause();
    });
}