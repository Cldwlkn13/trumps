/**
  * This function takes registers the global themes to an array, calls a function to store them in memory
  * This would be better done with server side code such as php. But this project js only.
  */
function registerThemes(){ 
    themes = [
        { 
            id: "Soccer Players", 
            path: "./assets/json/SoccerPlayers.json", 
        }
        //TO ADD NEW THEME TO GAME, COMPILE .json FILE TO /assets/json/ AND REFERENCE FROM HERE
    ];
    themes.forEach(t => storeThemeInMemory(t)); 
    themes.forEach(t => console.log(`Available Theme: ${t.id}`));
}


/**
  * This function takes registers the global sounds to an array
  * Sounds aquired from https://www.zapsplat.com//
  */
function registerSounds(){
    sounds = [
        {
            name:"game-positive-1", 
            audio: new Audio("./assets/sounds/game-positive.mp3")
        },
        {
            name:"game-positive-2", 
            audio: new Audio("./assets/sounds/game-positive-2.mp3")
        },
        {
            name:"game-error-1", 
            audio: new Audio("./assets/sounds/game-error.mp3")
        },
        {
            name:"game-error-2", 
            audio: new Audio("./assets/sounds/game-error-2.mp3")
        },
        {
            name:"tension-drum", 
            audio: new Audio("./assets/sounds/tension-drum.mp3")
        },
    ];
}

 /**
  * This function takes in a registered theme, pulls it from the dir & saves it in sessionStorage
  * @param {object} theme Theme registration object.
  */
function storeThemeInMemory(theme){  
    getLocalJson(theme.path)
        .then(function(value){
            sessionStorage
                .setItem(`${theme.id}`,JSON.stringify(value));
            });
}

 /**
  * This function takes in a string for dir path, queries the dir & returns json in a promise
  * @param {string} path dir path of .json file
  */
function getLocalJson(path){   
    return $.getJSON(`${path}`)
    .done(
        function(json){ 
            return json;
        })
    .fail(
        function(error){
            console.log(error);
    });
}