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

// content 디렉토리의 모든 마크다운 파일 처리
const processMarkdownFiles = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  let cleanedFiles = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      cleanedFiles += processMarkdownFiles(filePath);
    } else if (file.endsWith('.md')) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // 유효하지 않은 문자 제거
        content = cleanInvalidChars(content);
        
        // 변경사항이 있으면 파일 업데이트
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ Cleaned invalid characters from: ${filePath}`);
          cleanedFiles++;
        }
      } catch (error) {
        console.error(`❌ Error processing file ${filePath}:`, error);
      }
    }
  });
  
  return cleanedFiles;
};

// 메인 실행
const contentDir = path.join(__dirname, '..', 'content');
console.log('🧹 Cleaning markdown files...');

const startTime = Date.now();
const cleanedCount = processMarkdownFiles(contentDir);
const endTime = Date.now();

console.log(`\n✨ Cleaning completed in ${endTime - startTime}ms`);
console.log(`📝 Cleaned ${cleanedCount} files`);

if (cleanedCount > 0) {
  console.log('💡 Some files were cleaned. Please review the changes if needed.');
} else {
  console.log('🎉 All files are already clean!');
} 