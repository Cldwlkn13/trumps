
//This would be better done with server side code such as php. But this project js only.
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

//SOUNDS AQUIRED FROM https://www.zapsplat.com//
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
    ]
}

function storeThemeInMemory(theme){  
    getLocalJson(theme.path)
        .then(function(value){
            sessionStorage
                .setItem(`${theme.id}`,JSON.stringify(value))
            });
}

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