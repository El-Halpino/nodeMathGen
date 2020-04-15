
describe("Create Math Object Function", () => {
    test("It should return an object with a topic and list of numbers", () => {
        const input = [
            {topic: "Addition", noOfQuestions: 5, maxValue: 1}
        ];
    
        const output = {"title":"Addition","numberList":[
                    {"index":0,"randomNumber1":0,"randomNumber2":1},
                    {"index":1,"randomNumber1":0,"randomNumber2":1},
                    {"index":2,"randomNumber1":0,"randomNumber2":1},
                    {"index":3,"randomNumber1":0,"randomNumber2":1},
                    {"index":4,"randomNumber1":0,"randomNumber2":1}]
                }

        expect(createMathObj(input)).toEqual(output);

    });
});