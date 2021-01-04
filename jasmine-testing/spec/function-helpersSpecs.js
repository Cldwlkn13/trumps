var rnd; 
describe("Helper Specs", function(){
    describe("getRandomInt() Tests", function(){
        beforeAll(function(){
                rnd = getRandomInt(1, 2);
            });
            it("returns number >= 1", function(){
                expect(rnd).toBeGreaterThanOrEqual(1);
            });
            it("returns number <= 2", function(){
                expect(rnd).toBeLessThanOrEqual(2);
            });
        
    });
});