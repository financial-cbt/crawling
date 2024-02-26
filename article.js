const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

const urls = [
    "https://www.hankyung.com/article/202304251260Y",
    "https://www.hankyung.com/article/202401038232Y",
    "https://www.hankyung.com/article/2023092436581",
    "https://www.hankyung.com/article/2023122887505",
    "https://www.hankyung.com/article/202303162990Y",
    "https://www.hankyung.com/article/2024010429071",
    "https://www.hankyung.com/article/202402083591Y",
    "https://www.hankyung.com/article/202307133807Y",
    "https://www.hankyung.com/article/202402068162i",
    "https://www.hankyung.com/article/2024020670401"
];

const headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Cookie": "selectedMenu=; _gid=GA1.2.56822696.1708576858; _ga_YZ862E0XNJ=GS1.1.1708575419.6.1.1708577484.59.0.0; _ga_CSGVB4KPL5=GS1.1.1708575419.6.1.1708577484.59.0.0; login_type=email; _ga_3WY4W7BN31=GS1.2.1708578486.1.1.1708578629.60.0.0; _ga_NDMXBR1HEE=GS1.1.1708579688.2.0.1708579688.0.0.0; _ga=GA1.1.247456218.1708318763; _ga_LJ7N0614TS=GS1.1.1708579688.2.0.1708579688.60.0.0; _ga_6V2CLLNXEB=GS1.2.1708579689.2.0.1708579689.60.0.0; FCNEC=%5B%5B%22AKsRol8BQbqUB4pdjKWsjN9EymPsgrPs7iRhmtiH6eDzGbir2ynVfx-d90q6jL6gRHP_ciilYLy6FAIZMQEc-2E4zPUnUJLSk6pMtjirjgXktVkXhKRaN0NJLqmkb1eSMcT096v0K941ii2N6XODYdOHIx-DAssI1w%3D%3D%22%5D%5D; _ga_Y2XH7W3BRT=GS1.1.1708575365.1.1.1708581679.0.0.0; _ga_YR1S7BMWY7=GS1.1.1708575365.1.1.1708582197.58.0.0",
    "Host": "www.hankyung.com",
    "Sec-Ch-Ua": `"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"`,
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": `"Windows"`,
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
};

async function fetchArticle(url) {
    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// const getBody = ($) => {
//     const paragraphs = [];
//     let currentParagraph = "";
//     let brNum = 0;

//     $(".article-body").contents().each(function () {
//         // 텍스트 노드인 경우
//         if (this.nodeType === 3) {
//             brNum--;
//             const text = $(this).text().trim();
//             if (text !== "") {
//                 currentParagraph += text + " ";
//             }
//         } else if (this.nodeType === 1) {
//             brNum++;
//             if (brNum === 2) {
//                 brNum = 0;
//                 if (currentParagraph !== "") {
//                     paragraphs.push(currentParagraph.trim());
//                     currentParagraph = "";
//                 }
//             }
//         }
//     });

//     // 마지막 문단 추가
//     if (currentParagraph !== "") {
//         paragraphs.push(currentParagraph.trim());
//     }

//     return paragraphs;
// };

const getBody = ($) => {
    let body = "";

    $(".article-body").contents().each(function () {
        // 텍스트 노드인 경우
        if (this.nodeType === 3) {
            const text = $(this).text().trim();
            if (text !== "") {
                body += text + " ";
            }
        }
    });

    return body;
};

const getArticle = async (url, inx) => {
    const html = await fetchArticle(url);
    const $ = cheerio.load(html);

    const title = $(".headline").text().trim();
    const body = getBody($);
    const date = $(".txt-date").text().trim();
    const reporter = $("meta[property='dable:author']").attr("content");
    const photoUrl = $(".figure-img img").prop("src");

    const article = {
        num: inx,
        title: title,
        body: body,
        date: date,
        reporter: reporter,
        photoUrl: photoUrl,
        word: [],
    };

    return article;
};

(async () => {
    const articles = [];
    let i = 0;

    for (const url of urls) {
        await getArticle(url, i++)
            .then(res => {
                articles.push(res);
            });
    };

    // console.log(articles);
    console.log(articles.length);

    fs.writeFileSync("./data/article.json", JSON.stringify(articles));
})();

/**
https://www.hankyung.com/article/202304251260Y
필립스곡선
인플레이션

https://www.hankyung.com/article/202401038232Y
윈도드레싱
공포지수

https://magazine.hankyung.com/money/article/202310187017c
달러인덱스
인플레이션
모라토리엄

https://www.hankyung.com/article/2023122887505
공시
내부자거래

https://www.hankyung.com/article/202303162990Y
회색코뿔소
뱅크런

https://www.hankyung.com/article/2024010429071
인덱스펀드
액티브펀드

https://www.hankyung.com/article/202402083591Y
디플레이션
CPI
지급준비율

https://www.hankyung.com/article/202307133807Y
포워드가이던스
프로젝트파이낸싱(PF)

https://www.hankyung.com/article/202402068162i
어닝쇼크
어닝서프라이즈

https://www.hankyung.com/article/2024020670401
다이렉트인덱싱
ETF
 */