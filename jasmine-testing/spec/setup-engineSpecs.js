describe("Setup Engine Specs", function(){
    describe("chooseCardDisplayed(e) Tests", function(){
        describe("Landing Card Tests", function(){
            beforeAll(function(){
                chooseCardDisplayed(1);
            });
            it("landing card is visible", function(){
                expect($(".landing-card").is(':visible')).toBeTruthy();
            });
            it("gamestart card is NOT visible", function(){
                expect($(".gamestart-card").is(':visible')).toBeFalsy();
            });
            it("gameplay div is NOT visible", function(){
                expect($(".gameplay").is(':visible')).toBeFalsy();
            });
            it("name is not stored in session", function(){
                expect(getName()).toBe(null);
            });
        });
        describe("GameStart Card Tests", function(){
            describe("Test #1 (Invalid Name Case)", function(){
                beforeEach(function(){
                    removeName();
                    chooseCardDisplayed(2);
                });
                it("landing card is visible", function(){
                    expect($(".landing-card").is(':visible')).toBeTruthy();
                });
                it("gamestart card is NOT visible", function(){
                    expect($(".gamestart-card").is(':visible')).toBeFalsy();
                });
                it("gameplay div is NOT visible", function(){
                    expect($(".gameplay").is(':visible')).toBeFalsy();
                });
                it("name is invalid", function(){
                    expect(validateName(getName())).toBeFalsy();
                });
            });
            describe("Test #2 (Valid Name Case)", function(){
                beforeEach(function(){
                    storeName("Tom");
                    chooseCardDisplayed(2);
                });
                afterEach(function(){
                    removeName();
                });
                it("landing card is NOT visible", function(){
                    expect($(".landing-card").is(':visible')).toBeFalsy();
                });
                it("gamestart card is visible", function(){
                    expect($(".gamestart-card").is(':visible')).toBeTruthy();
                });
                it("gameplay div is NOT visible", function(){
                    expect($(".gameplay").is(':visible')).toBeFalsy();
                });
                it("name is Tom", function(){
                    expect(getName()).toBe("Tom");
                });
                it("name is valid", function(){
                    expect(validateName(getName())).toBeTruthy();
                });
            });
        });
        
        describe("GamePlay Tests", function(){
            describe("Test #1 (Invalid Name Test)", function(){
                beforeEach(function(){
                    removeName();
                    chooseCardDisplayed(3);
                });
                it("landing card is NOT visible", function(){
                    expect($(".landing-card").is(':visible')).toBeTruthy();
                });
                it("gamestart card is NOT visible", function(){
                    expect($(".gamestart-card").is(':visible')).toBeFalsy();
                });
                it("gameplay div is visible", function(){
                    expect($(".gameplay").is(':visible')).toBeFalsy();
                });
                it("name is invalid", function(){
                    expect(validateName(getName())).toBeFalsy();
                });
            });
            describe("Test #2 (Valid Name Test)", function(){
                beforeAll(function(){
                    storeName("Tom");
                    chooseCardDisplayed(3);
                });
                afterAll(function(){
                    removeName();
                });
                it("landing card is NOT visible", function(){
                    expect($(".landing-card").is(':visible')).toBeFalsy();
                });
                it("gamestart card is NOT visible", function(){
                    expect($(".gamestart-card").is(':visible')).toBeFalsy();
                });
                it("gameplay div is visible", function(){
                    expect($(".gameplay").is(':visible')).toBeTruthy();
                });
                it("name is Tom", function(){
                    expect(getName()).toBe("Tom");
                });
                it("name is valid", function(){
                    expect(validateName(getName())).toBeTruthy();
                });
            });
        });
    });
});