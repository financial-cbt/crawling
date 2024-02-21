const questions = [
    "1. 개인이 SNS, 포털 등 인터넷상에 올라가 있는 자신의 사진, 동영상, 개인정보 등을 지워달라고 요청할 수 있는 권리는?",
    "2. 부모가 남긴 유언에 관계없이 모든 자녀는 법률상 재산의 일정 부분을 상속받을 권리가 있다. 이 상속 재산을 뜻하는 말은?",
    "3. 최근 경제 뉴스에 자주 등장한 ‘베이비스텝’ ‘빅스텝’ ‘자이언트스텝’이 공통적으로 의미하는 것은?",
    "4. 담합에 가담한 기업이 담합 사실을 인정하고 정부 조사에 협조하면 처벌하지 않거나 수위를 낮춰주는 제도는?",
    "5. 기업의 지배권을 얻거나 강화할 목적으로 매입 가격, 수량, 기간 등을 미리 알린 뒤 불특정 다수 주주로부터 주식을 사들이는 행위는?",
    "7. 다음 중 ‘공적연금’에 해당하지 않는 것은?",
    "8. 기업 경영의 새로운 트렌드로 자리 잡은 ‘ESG’에서 ‘E’에 해당하는 항목은?",
    "1. 지난 21일 발사에 성공하며 국내 과학기술의 괄목할 만한 발전을 입증한 ‘한국형 우주 발사체’의 이름은?",
    "3. 다음 중 ‘2금융권’에 해당하지 않는 곳을 고르면?",
    "8. 다음 중 고위험 고수익을 원하는 투자자가 가장 선호할 만한 상품으로 적절한 것은?",
    "1. 현재 우리나라 기준금리는 얼마일까?",
    "2. 다음 중 개인이 은행에서 대출을 받고 신용카드를 사용할 때마다 불어나는 지표를 고르면?",
    "3. 국제유가가 폭등할 때 서민의 물가 부담을 덜어주기 위해 정부가 시행할 수 있는 정책으로 가장 적절한 것은?",
    "4. 경제에 대한 공포와 불안 심리가 퍼지면서 투자자들이 자산을 부랴부랴 팔아치우는 상황을 가리키는 말은?",
    "5. 지난 13일 진행된 이 나라 총통 선거가 세계적 관심을 받았다. ‘타이베이’와 ‘TSMC’ 하면 떠오르는 나라는?",
    "6. 국제유가 기사에서 자주 볼 수 있는 3대 원유가 아닌 것을 고르면?",
    "1. 소비자들이 넷플릭스 같은 온라인 동영상 서비스(OTT)를 선택하면서 케이블TV, IPTV 등 기존 유료 방송을 해지하는 현상은?",

    "3. 과도한 고금리 대출로 폭리를 취하지 못하도록 법으로 정한 대출금리 상한선을 뜻하는 말은?",

    "5. 상장사가 주가에 영향을 줄 만한 사안을 정기적으로 또는 수시로 투자자에게 알리도록 한 제도는?",

    "6. 주식, 채권 등 전통적 투자상품을 벗어나 부동산, 원자재 등에 투자하는 방식을 가리키는 말은?",

    "7. 소비자물가지수(CPI)와 생산자물가지수(PPI) 증감율이 장기간 마이너스를 기록할 때 우려되는 상황은?",
];

const passKeywords = ["해당", "공통", "다음 중", "다음중", "적절", ".", "아닌 것", "얼마", /\d+일/, /\d+월/];
const removeKeywords = ["는?", "은?", "중 하나인 이건은?"];

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
            commentary = commentary.replace(keyword, "");
        });

        return commentary;
    }


};

const commentary = questions.map(makeCommentary).filter(question => question !== undefined);

console.log(commentary);