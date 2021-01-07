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

/**
  * This function returns a random int between a range
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  * @param {int} min min of range
  * @param {int} max max of range
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

/**
  * This function finds a card from the array by its id
  * @param {object[]} cards array of cards 
  * @param {int} id id to find in the array
*/
function findCardInArray(cards, id) {
    var card = cards.find(obj => {
        return obj.cardId === id; //find card by its Id
    });
    return card;
}

/**
  * This function stops all the globally registered audio from playing
*/
function stopSounds(){
    sounds.forEach(function(s) { 
        s.audio.pause();
    });
}