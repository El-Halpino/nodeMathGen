const mathHelpers = require("../models/worksheetSession.js");

describe("Create Math Object Function", () => {
    test("It should return an object with a topic, name and list of numbers", () => {
        const options = { "topic": "Addition", "name": "Test", "noOfQuestions": 5, "maxValue": 0 };
        const output = {
            "title": "Addition", "name": "Test", "numberList": [
                { "index": 0, "randomNumber1": 0, "randomNumber2": 0 },
                { "index": 1, "randomNumber1": 0, "randomNumber2": 0 },
                { "index": 2, "randomNumber1": 0, "randomNumber2": 0 },
                { "index": 3, "randomNumber1": 0, "randomNumber2": 0 },
                { "index": 4, "randomNumber1": 0, "randomNumber2": 0 }] }
        expect(mathHelpers.createMathObj(options)).toEqual(output);
    });
}); //jest