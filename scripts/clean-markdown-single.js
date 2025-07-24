const fs = require('fs');
const path = require('path');

// 유효하지 않은 XML 문자들을 제거하는 함수
const cleanInvalidChars = (content) => {
  return content
    // XML 1.0에서 허용되지 않는 제어 문자들 제거
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // 제어 문자들
    .replace(/[\uFFFE\uFFFF]/g, '') // BOM 문자들
    .replace(/[\uD800-\uDFFF]/g, '') // 서로게이트 쌍
    // 추가적인 문제가 될 수 있는 문자들
    .replace(/[\u200B-\u200D\uFEFF]/g, ''); // 제로 너비 공백들
};

// 파일 경로를 명령행 인수에서 받음
const filePath = process.argv[2];

if (!filePath) {
  console.error('❌ File path is required');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`❌ File does not exist: ${filePath}`);
  process.exit(1);
}

try {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 유효하지 않은 문자 제거
  content = cleanInvalidChars(content);
  
  // 변경사항이 있으면 파일 업데이트
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Cleaned invalid characters from: ${filePath}`);
    process.exit(0);
  } else {
    console.log(`ℹ️  No changes needed for: ${filePath}`);
    process.exit(0);
  }
} catch (error) {
  console.error(`❌ Error processing file ${filePath}:`, error);
  process.exit(1);
} 