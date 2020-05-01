const mathHelpers = require("../models/worksheetSession.js");

describe("Check Answers Function", () => {
    test("It should return an object with a topic, name, questions, noOfQuestions, userAnswers, calculatedAnswers and correctAnswerCount", () => {
        const worksheet = {
            "name": "Test", "topic": "Addition", "numberList": [
                { "index": 0, "randomNumber1": 4, "randomNumber2": 4 },
                { "index": 1, "randomNumber1": 2, "randomNumber2": 2 },
                { "index": 2, "randomNumber1": 1, "randomNumber2": 1 },
            ]
        };
        const answers = {"answer_0": 8, "answer_1": 4, "answer_2": 2};
        const output = {
            "name": "Test", "topic": "Addition", "questions": [
                { "index": 0, "randomNumber1": 4, "randomNumber2": 4 },
                { "index": 1, "randomNumber1": 2, "randomNumber2": 2 },
                { "index": 2, "randomNumber1": 1, "randomNumber2": 1 }],
            "noOfQuestions": 3, "userAnswers": [{ "answer": 8 },
            { "answer": 4 }, { "answer": 2 }], "calculatedAnswers": [
                { "answer": 8 }, { "answer": 4 }, { "answer": 2 }],
            "correctAnswerCount": 3
        };
        expect(mathHelpers.checkAnswers(worksheet, answers)).toEqual(output);
    });
}); //jest