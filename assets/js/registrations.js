//This would be better done with server side code such as php. But this project js only.
function registerThemes(){ 
    themes = [
        { 
            id: "Soccer Players", 
            path: "/assets/json/SoccerPlayers.json", 
        }
        //TO ADD NEW THEME TO GAME, COMPILE .json FILE TO /assets/json/ AND REFERENCE FROM HERE
    ];
    themes.forEach(t => storeThemeInMemory(t)); 
}

 //SOUNDS AQUIRED FROM https://www.zapsplat.com//
function registerSounds(){
    sounds["game-positive-1"] = new Audio("/assets/sounds/game-positive.mp3");
    sounds["game-positive-2"] = new Audio("/assets/sounds/game-positive-2.mp3");
    sounds["game-error-1"] = new Audio("/assets/sounds/game-error.mp3");
    sounds["game-error-2"] = new Audio("/assets/sounds/game-error-2.mp3");
    sounds["tension-drum"] = new Audio("/assets/sounds/tension-drum.mp3");
}

function storeThemeInMemory(theme){
    $.getJSON(`${theme.path}`, function(result){
        console.log(`Storing Game Object for ${theme.id}`);
        var json = JSON.stringify(result);
        sessionStorage.setItem(`${theme.id}`, json);
    });
}