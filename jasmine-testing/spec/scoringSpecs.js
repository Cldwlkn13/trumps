describe("Scoring", function(){
    describe("calculateShowdownPointsGained() Tests", function(){
        it("should return 2", function(){
            expect(calculateShowdownPointsGained(1, 0, 1)).toBe(2);
        });
        it("should return 0 (winner == 2)" ,function(){
            expect(calculateShowdownPointsGained(1, 0, 2)).toBe(0);
        });
        it("should return 100 (winner == 1)" ,function(){
            expect(calculateShowdownPointsGained(100, 50, 1)).toBe(100);
        });
        it("should not return 100 (winner == 2)" ,function(){
            expect(calculateShowdownPointsGained(100, 50, 2)).not.toEqual(100);
        });
        it("should not return 100 (winner == 0)" ,function(){
            expect(calculateShowdownPointsGained(100, 50, 0)).not.toEqual(100);
        });
    });
    describe("Score Persistence Tests", function(){
        describe("Test #1 (Game Score Set)", function(){
            beforeEach(function(){
                setGameScore(2);
            });
            afterEach(function(){
                resetGameScore();
            });
            it("should return 2", function(){
                expect(getGameScore()).toBe(2);
            });
            it("should not return 1", function(){
                expect(getGameScore()).not.toEqual(1);
            });
        });
        describe("Test #2 (Game Score NOT Set)", function(){
            beforeEach(function(){
                resetGameScore();
            });
            it("should return NaN", function(){
                expect(getGameScore()).toBeNaN();
            });
            it("should not return 0", function(){
                expect(getGameScore()).not.toEqual(0);
            });
        });
    });
    describe("calculateGameScore() Tests", function(){
        it("should return 10", function(){
            expect(calculateGameScore(10, NaN)).toBe(10);
        });
        it("should return 64", function(){
            expect(calculateGameScore(32, 32)).toBe(64);
        });
    });
    describe("updateHighScore() Tests", function(){
        describe("Test #1 (score < high)", function(){
            beforeEach(function(){
                updateHighScore(10, 20);
            });
            it("should return 20", function(){
                expect(getCurrentHighScore()).toBe(20);
            });
        });
        describe("Test #2 (score > high)", function(){
            beforeEach(function(){
                updateHighScore(30, 20);
            });
            it("should return 30", function(){
                expect(getCurrentHighScore()).toBe(30);
            });
        });
        describe("Test #3 (high NaN)", function(){
            beforeEach(function(){
                updateHighScore(0, NaN);
            });
            it("should return 0", function(){
                expect(getCurrentHighScore()).toBe(0);
            });
        });
        describe("Test #4 (score & high NaN)", function(){
            beforeEach(function(){
                updateHighScore(NaN, NaN);
            });
            it("should return NaN", function(){
                expect(getCurrentHighScore()).toBeNaN();
            });
        });
        describe("Test #5 (score NaN)", function(){
            beforeEach(function(){
                updateHighScore(NaN, 0);
            });
            it("should return 0", function(){
                expect(getCurrentHighScore()).toBe(0);
            });
        });
        describe("Test #6 (score 50, high NaN)", function(){
            beforeEach(function(){
                updateHighScore(50, NaN);
            });
            it("should return 50", function(){
                expect(getCurrentHighScore()).toBe(50);
            });
        });
    });
});