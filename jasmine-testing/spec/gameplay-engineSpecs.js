stackOne = [];
stackTwo = [];
var cards = {};

describe("GamePlay Engine Specs", function(){
    describe("determineShowdown() Tests", function(){
        it("value1 > value2 should return 1", function(){
            expect(determineShowdown(3, 2)).toBe(1);
        });
        it("value2 > value1 should return 2", function(){
            expect(determineShowdown(2, 3)).toBe(2);
        });
        it("value2 == value1 should return 2", function(){
            expect(determineShowdown(2, 2)).toBe(2);
        });
    });
    describe("pushToArray() Tests", function(){
        beforeEach(function(){
            stackOne = new Array("a", "b", "c");
            stackTwo = new Array("a", "b", "c");
            pushToArray(stackOne, stackTwo);
        });
        afterEach(function(){
            stackOne = [];
            stackTwo = [];
        }) 
        it("Array1 altered correctly", function(){
            expect(stackOne).toEqual(["b","c","a","a"]);
        });
        it("Array2 altered correctly", function(){
            expect(stackTwo).toEqual(["b","c"]);
        });
    });
    describe("goToNextShowdown() Tests", function(){
        it("ArrayEmpty so should return true flag", function(){
            stackOne = [];
            stackTwo = [];
            expect(goToNextShowdown(3)).toEqual(true);
        });
        it("Arrays filled Empty so should return true flag", function(){
            stackOne = new Array("a");
            stackTwo = new Array("a");
            expect(goToNextShowdown(3)).toEqual(false);
        });
    });
    describe("dealCardsRandomly() Tests", function(){
        beforeEach(function(){
            cards = JSON.parse(sessionStorage.getItem("Soccer Players")).cards;
            dealCardsRandomly(cards);
        });
        it("stackOne has half the cards", function(){
            expect(stackOne.length).toEqual(cards.length / 2);
        });
        it("stackTwo has half the cards", function(){
            expect(stackTwo.length).toEqual(cards.length / 2);
        });
    })
});