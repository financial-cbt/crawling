const fs = require('fs');

let words = JSON.parse(fs.readFileSync('./data/dictionary.json'));
words = Object.values(words).map(item => item.term);

fs.writeFileSync("./data/words.json", JSON.stringify(words));