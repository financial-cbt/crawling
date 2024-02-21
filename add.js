const fs = require('fs');

// 첫 번째 JSON 파일의 경로
const file1Path = './answer.json';
// 두 번째 JSON 파일의 경로
const file2Path = './quiz.json';
// 합쳐진 JSON 파일의 경로
const mergedFilePath = './merge.json';

// 첫 번째 JSON 파일을 읽어와서 객체로 변환합니다.
const file1Data = JSON.parse(fs.readFileSync(file1Path, 'utf8'));

// 두 번째 JSON 파일을 읽어와서 객체로 변환합니다.
const file2Data = JSON.parse(fs.readFileSync(file2Path, 'utf8'));

// 두 객체의 속성들을 병합하여 새로운 객체를 생성합니다.
const mergedData = { ...file1Data, ...file2Data };

// 병합된 객체를 JSON 형식으로 변환하여 새로운 파일에 저장합니다.
fs.writeFileSync(mergedFilePath, JSON.stringify(mergedData, null, 2));

console.log('JSON 파일이 성공적으로 합쳐졌습니다.');
