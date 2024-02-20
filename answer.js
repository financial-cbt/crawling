import axios from "axios";
import * as cheerio from "cheerio";

import fs from "fs";

const circleNumbers = {
    "①": 1,
    "②": 2,
    "③": 3,
    "④": 4,
    "⑤": 5,
    "⑥": 6,
    "⑦": 7,
    "⑧": 8,
    "⑨": 9,
    "⑩": 10
};

const headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Cookie": "_ga=GA1.1.247456218.1708318763; _ga_CSGVB4KPL5=GS1.1.1708318763.1.1.1708319473.58.0.0; _ga_YZ862E0XNJ=GS1.1.1708318763.1.1.1708319473.58.0.0",
    "Host": "sgsg.hankyung.com",
    // "Referer": "https://sgsg.hankyung.com/sgplus/quiz?page=1",
    "Sec-Ch-Ua": `"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"`,
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": `\`Windows\``,
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
};

async function fetchPageData(url) {
    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getAnswers = async (url) => {
    const data = [];

    const html = await fetchPageData(url);
    const $ = cheerio.load(html);

    for (const el of $(".article-body")) {
        const answers = $(el).text().split("▶")[1].trim()
            .replace("▶", "").replace("정답", "").replace(":", "").replace(/\s+/g, '').split("")
            .map(answer => {
                return circleNumbers[answer] || answer;
            });

        for (let i = 0; i < answers.length; i += 2) {
            const ans = parseInt(answers[i + 1]);
            data.push(ans);
        };
    }

    return data;
};

const getQuizzes = async (pageNum) => {
    const homeUrl = "https://sgsg.hankyung.com/sgplus/quiz";
    let url = homeUrl + "?page=" + pageNum;
    const quizUrls = [];

    const html = await fetchPageData(url);
    const $ = cheerio.load(html);

    for (const el of $("main").find("li a")) {
        const quizUrl = $(el).prop("href");
        quizUrls.push(quizUrl);
    };

    return quizUrls;
}

(async () => {
    let quizUrls = [];
    for (let i = 1; i <= 10; i++) {
        quizUrls = quizUrls.concat(await getQuizzes(i));
    };

    let answers = [];
    for (const quizUrl of quizUrls) {
        answers = answers.concat(await getAnswers(quizUrl));
    };

    console.log(answers);

    fs.writeFileSync("./answer.json", JSON.stringify(answers));
})();