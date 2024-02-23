const fs = require('fs');

let dictionary; // [ {term, commentary} ]
let articles;

const getData = () => {
    dictionary = JSON.parse(fs.readFileSync('./data/dictionary.json'));
    articles = JSON.parse(fs.readFileSync('./data/article.json'));
};
getData();

// const makeWord = (articles, dictionary) => {
//     articles.forEach((article) => {
//         article.body.forEach((paragraph) => {
//             dictionary.forEach((entry, index) => {
//                 if (paragraph.includes(entry.term)) {
//                     const w = {
//                         start: index,
//                         end: index + entry.term.length,
//                         term: entry.term,
//                         commentary: entry.commentary
//                     };
//                     article.word.push(w);
//                 }
//             });
//         });
//     });
// };
const makeWord = (articles, dictionary) => {
    let allWords = [];

    articles.forEach((article) => {
        dictionary.forEach((entry, index) => {
            if (article.body.includes(entry.term)) {
                const w = {
                    start: index,
                    end: index + entry.term.length,
                    term: entry.term,
                    commentary: entry.commentary
                };
                allWords.push(w);
            }
        });
    });

    allWords = allWords.filter((word, index) => {
        return (
            index === allWords.findIndex((w) =>
                w.start === word.start && w.end === word.end
            )
        );
    });

    articles.forEach((article) => {
        article.word = allWords.filter((word) =>
            article.body.includes(word.term)
        );
    });
};
makeWord(articles, dictionary);

fs.writeFileSync("./data/article.json", JSON.stringify(articles));
