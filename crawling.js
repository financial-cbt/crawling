const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');


async function fetchPageData() {

    try {
        let page = 1
        let urls = []
        for (let i = 0; i < 10; i ++) {
            const response = await fetch(`https://sgsg.hankyung.com/sgplus/quiz?page=${page}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
            }
            });

            const html = await response.text();
            const $ = cheerio.load(html);
            
            const Url = $('.news-tit a').map((i, el) => {
                return $(el).prop('href');
            }).get();

            urls = urls.concat(Url)

            page++
        }

        // console.log(urls);

        let questions = []
        let answers = []
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];

            const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
            }
            });

            const html = await response.text();
            const $ = cheerio.load(html);

            const q = $('.article-body strong').map((i, el) => {
                const text = $(el).text().trim(); 
                return text.substring(text.indexOf(' ')).trim(); 
            }).get();

            q.pop()

            // console.log(q);
            questions = questions.concat(q);

            const a = $('.article-body')
                            .clone() // 원본 요소를 변경하지 않기 위해 복제합니다.
                            .find('strong') // strong 태그를 선택합니다.
                            .remove() // strong 태그를 삭제합니다.
                            .end() // 복제된 요소로 다시 돌아갑니다.
                            .text() // 텍스트를 추출합니다.
                            .trim(); // 앞뒤 공백을 제거합니다.

            console.log(a)
        }
        
        console.log(questions.length);
        
        // // 객체 생성
        // const obj = title.map((title, i) => ({
        //     id: i + 1,
        //     title: title,
        //     newspaper: newspaper[i],
        //     context: context[i],
        //     img: img[i],
        //     detailText: detailText[i]
        // }));

        // // json 파일 저장
        // fs.writeFile( 'crolling2.json', JSON.stringify(obj), function(err) {
        //     console.log( 'json파일 생성완료' );
        // });

    } catch (err) {
        console.error(err);
    }
}

fetchPageData();
