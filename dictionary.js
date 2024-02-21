const fs = require('fs');

let options, answers, commentaries, terms;
let dictionary; // [ {term, commentary} ]

const getData = () => {
    options = JSON.parse(fs.readFileSync('./data/merge.json'));
    options = Object.values(options).map(item => item.option);

    answers = JSON.parse(fs.readFileSync('./data/answer.json'));

    commentaries = JSON.parse(fs.readFileSync('./data/commentary.json'));

    terms = answers.map((answerIndex, questionIndex) => options[questionIndex][answerIndex - 1].substring(1));
};
getData();

const makeDictionary = () => {
    if (commentaries.length === terms.length) {
        dictionary = terms
            .map((term, index) => ({ term, commentary: commentaries[index] }))
            .filter(item => item.commentary !== 'pass');

        console.log(dictionary);
        console.log(dictionary.length);
    } else {
        console.log("주어진 입력 배열의 길이가 서로 다릅니다.");
    }
};
makeDictionary();

fs.writeFileSync("./data/dictionary.json", JSON.stringify(dictionary));
