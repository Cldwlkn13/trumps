$('document').ready(function(){

    removeName();
    
    if(!validateNameStored()) {
        $(".landing-card").show();
        $(".gamestart-card").hide();
        $(".gameplay").hide();
    }
    else {
        $(".landing-card").hide();
        $(".gamestart-card").show();
        $(".gameplay").hide();
    }
    
    function getName() {
        let name = localStorage.getItem("name");
        console.log(name);
    }

    function storeName(name) {
        console.log(name);
        localStorage.setItem("name", name);
    }

    function removeName() {
        localStorage.setItem("name", "");
    }

    function validateNameStored() {
        return getName() != "";
    }

    $("card-button").click(function() {
        
        let name = $("landing-card-name-input").text();



        console.log(name);

        storeName(name);

        if(validateName())
        {
            $(".landing-card").hide();
            $(".gamestart-card").show();
            $(".gameplay").hide();
        }
    });
});

