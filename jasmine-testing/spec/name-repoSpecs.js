describe("Name Repository Specs", function(){
    describe("validateName() Tests", function(){
        it("name empty be false", function(){
            expect(validateName("")).toBeFalsy();
        });
        it("name null be false", function(){
            expect(validateName(null)).toBeFalsy();
        });
        it("name Tom be true", function(){
            expect(validateName("Tom")).toBeTruthy();
        });
        it("name starts with space to be false", function(){
            expect(validateName(" Tom")).toBeFalsy();
        });
        it("name has double space to be false", function(){
            expect(validateName("Tom  Tom")).toBeFalsy();
        });
    });
    describe("validateNameLength() Tests", function(){
        it("name empty be true", function(){
            expect(validateNameLength("")).toBeTruthy();
        });
        it(`name with length > ${maxNameCharLimit} be false`, function(){
            expect(validateNameLength("abcdefghijklmnopqrstuvwxyz")).toBeFalsy();
        });
        it(`name with length <= ${maxNameCharLimit} be true`, function(){
            expect(validateNameLength("abcdefghijk")).toBeTruthy();
        });
    });
});