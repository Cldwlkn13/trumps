
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
    console.log(`The following themes are available: ${themes}`);
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

    themes.forEach(function(t) {
        var audio = new Audio(JSON.parse(sessionStorage.getItem(t.id)).sound);
        sounds.push({
            name: t.id, audio: audio
        })
    });
}

function storeThemeInMemory(theme){
    $.getJSON(`${theme.path}`, function(result){
        console.log(`Storing Game Object for ${theme.id}`);
        var json = JSON.stringify(result);
        sessionStorage.setItem(`${theme.id}`, json);
    });
}