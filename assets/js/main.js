$('document').ready(function(){   
    
    removeName();
    
    if(!validateNameStored()) {
        showLanding();
    }
    else {
        showGameStart();
    }
    
    //Functions

    function getName() {
        let name = localStorage.getItem("name");
        console.log(name);
        return name;
    }

    function storeName(name) {
        console.log(name);
        localStorage.setItem("name", name);
    }

    function removeName() {
        localStorage.removeItem("name");
    }

    function validateNameStored() {
        let storedName = getName();
        return storedName != null && 
            storedName.length > 0;
    }

    function showLanding(){
        $(".landing-card").show();
        $(".gamestart-card").hide();
        $(".gameplay").hide();
    }

    function showGameStart() {
        $(".landing-card").hide();
        $(".gamestart-card").show();
        $(".gameplay").hide();
    }

    function showGamePlay() {
        $(".landing-card").hide();
        $(".gamestart-card").hide();
        $(".gameplay").show();
    }

    function setGameStartName() {
        $(".gamestart-card-name")
            .text(getName());
    }

    //Events

    $(".card-button").click(function() {
        storeName($(".landing-card-name-input")
            .val());

        if(validateNameStored())
        {
            setGameStartName();
            showGameStart();
        }
    });
});

