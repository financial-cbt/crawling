const fs = require("fs");

const filePath = './data/merge.json'
let questions = JSON.parse(fs.readFileSync(filePath));
questions = Object.values(questions).map(item => item.question);

const passKeywords = [
    "해당", "공통", "다음 중", "다음중", "적절",
    ".", "아닌 것", "얼마", "고르면?", "있을까?",
    "될까?", "할까?", "무엇인가?",
    "빼면?", "나올까?", "의미할까?", "물리면?", "열릴까?",
    "의미인가?", "몇%인가?",
    "횟수", "영화제", "잘못 설명", "잘못 연결", "보여주는 것",
    "오징어 게임", "참여하고 있는 나라", "하고 있는 도시", "일본의 도시", "닥터 코퍼",
    "어느 나라", "이달", "지난달", "일까?", "있는 이 사람", "국가는?",
    /\d+일\s*/, /\d+월\s*/];
const removeKeywords = ["는?", "은?", "중 하나인 이것은?", "중 하나인 이것", "을 무엇이라 부를까?"];

const makeCommentary = (question) => {
    // 문제 번호 제거
    let commentary = question.replace(/^\d+\.\s*/, "").trim();

    // 전처리 조건에 해당하는 문장은 전처리하지 않고, pass 반환
    const nonCommentary = passKeywords.some(keyword => {
        if (typeof keyword === 'string') {
            return commentary.includes(keyword);
        } else if (keyword instanceof RegExp) {
            return keyword.test(commentary);
        }
        return false;
    });
    if (nonCommentary) {
        return "pass";
    }
    else {
        // 문장에서 특정 문자열 제거
        removeKeywords.forEach(keyword => {
            commentary = commentary.replace(keyword, "").trim();
        });

        return commentary;
    }
};

const commentary = questions.map(makeCommentary).filter(question => question !== undefined);

fs.writeFileSync("./data/commentary.json", JSON.stringify(commentary));