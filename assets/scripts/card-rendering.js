function renderCards(winner) {  
    if(stackOne.length === 0 || stackTwo.length === 0) {
        return;
    }

    renderCard(1, winner, stackOne[0]);
    renderCard(2, winner, stackTwo[0]);

    setBorders(winner, 1);
    setBorders(winner, 2);
}

function renderCard(stackId, winner, card) {
    console.log(`P${stackId} rendering card ${card.name}`);
    $("#name-" + stackId)
        .children("h2")
        .first()
        .text(card.name);

    $("#img-" + stackId)
        .children("img")
        .first()
        .attr("src", card.img);

    for(var i = 1; i <= 4; i++) {
        var element = $("#s-" + stackId + "-cat-" + i);

        var container = element
            .children(".gamecard-details")
            .first();

        container
            .children(".cat-name")
            .first()
            .html(`<strong>${gameObj.categories[i] + " - "}</strong>`); 

        container
            .children(".cat-value")
            .first()
            .text((stackId == 2) ? "?" : card.values[i]);     

        container
            .children(".cat-unit")
            .first()
            .text(gameObj.units[i]);   
    } 
}

function setBorders(winner, stackId) {
    (winner == stackId && stackId == 1) ? 
        $("#gamecard-" + winner).addClass("flashing-border-1"): 
        $("#gamecard-" + stackId).removeClass("flashing-border-1"); 
        
    (winner == stackId && stackId == 2) ? 
        $("#gamecard-" + winner).addClass("flashing-border-2"): 
        $("#gamecard-" + stackId).removeClass("flashing-border-2"); 
}

function updateTotals(){
    $("#player-cards-total-1")
        .html(`has <span style="font-size: 2rem; color: white">${stackOne.length}</span> 
        out of <span style="font-size: 2rem;color: white">${gameObj.cards.length}</span> Cards`);

    $("#player-cards-total-2")
        .html(`has <span style="font-size: 2rem; color: white">${stackTwo.length}</span> 
        out of <span style="font-size: 2rem;color: white">${gameObj.cards.length}</span> Cards`);
    }