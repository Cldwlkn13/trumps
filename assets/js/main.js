$('document').ready(function(){   
    
    storeChosenThemeInMemory("SoccerPlayers");
    removeName();
    
    if(!validateNameStored()) {
        chooseCardDisplayed(1);
    }
    else {
        chooseCardDisplayed(2);
    }
    
    //Functions

    function getName() {
        let name = localStorage.getItem("name");
        console.log(`Retrieving locally stored name : ${name}`);
        return name;
    }

    function storeName(name) {
        console.log(`Storing name: ${name}`);
        localStorage.setItem("name", name);
    }

    function removeName() {
        console.log(`Removing locally stored name value`);
        localStorage.removeItem("name");
    }

    function validateNameStored(name) {
        return name != null && 
            name.length > 0;
    }

    function chooseCardDisplayed(e) {
        switch(e)
        {
            case 1:
                $(".landing-card").show();
                $(".gamestart-card").hide();
                $(".gameplay").hide();    
                break; 

            case 2:
                $(".landing-card").hide();
                $(".gamestart-card").show();
                $(".gameplay").hide();    
                break;   
            
            case 3:
                $(".landing-card").hide();
                $(".gamestart-card").hide();
                $(".gameplay").show();   
                break;  
            
            default:
                $(".landing-card").show();
                $(".gamestart-card").hide();
                $(".gameplay").hide();  
                break;           
        }
    }

    function setGameStartName(name) {
        $(".gamestart-card-name")
            .text(name);
    }

    function storeChosenThemeInMemory(theme){
        $.getJSON(`assets/json/${theme}.json`, function(result){
            console.log(`Storing Cards for ${theme}:`);
            console.log(JSON.parse(JSON.stringify(result)));
            sessionStorage.setItem("cards", JSON.stringify(result));
        });
    }

    //Events

    $(".card-button").click(function() {
        storeName($(".landing-card-name-input")
            .val());

        let name = getName();
        if(validateNameStored(name))
        {
            setGameStartName(name);
            chooseCardDisplayed(2);
        }
    });
});

