const fs = require('fs');

let dictionary; // [ {term, commentary} ]
let articles;

const getData = () => {
    dictionary = JSON.parse(fs.readFileSync('./data/dictionary.json'));
    articles = JSON.parse(fs.readFileSync('./data/article.json'));
};
getData();

const makeWord = (articles, dictionary) => {

    articles.forEach((article) => {
        article.body.forEach((paragraph) => {
            dictionary.forEach((entry, index) => {
                if (paragraph.includes(entry.term)) {
                    const w = {
                        start: index,
                        end: index + entry.term.length,
                        term: entry.term,
                        commentary: entry.commentary
                    };
                    article.word.push(w);
                }
            });
        });
    });
};
makeWord(articles, dictionary);

fs.writeFileSync("./data/article.json", JSON.stringify(articles));
