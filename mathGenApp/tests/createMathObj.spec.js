function createMathObj(options){ // topic , noOfQuestions, maxValue
    var newMathGame = {
      title: options["topic"],
      numberList: [] //initialise list
    };
    for (var i = 0; i < options["noOfQuestions"]; i++) {
      newMathGame.numberList.push({
        index: i,
        randomNumber1: Math.round(Math.random() * options["maxValue"]), // Random Numbers assigned an index, pushed into List
        randomNumber2: Math.round(Math.random() * options["maxValue"])
      });
    }
    return newMathGame; //return new math obj
  }

describe("Create Math Object Function", () => {
    test("It should return an object with a topic and list of numbers", () => {
        const input = [
            {topic: "Addition", noOfQuestions: 5, maxValue: 0}
        ];
    
        const output = [
            {"title":"Addition","numberList": 
                [
                    {"index":0,"randomNumber1":0,"randomNumber2":0},
                    {"index":1,"randomNumber1":0,"randomNumber2":0},
                    {"index":2,"randomNumber1":0,"randomNumber2":0},
                    {"index":3,"randomNumber1":0,"randomNumber2":0},
                    {"index":4,"randomNumber1":0,"randomNumber2":0}
                ]
            }
        ]

        expect(createMathObj(input)).toEqual(output);

    });
});