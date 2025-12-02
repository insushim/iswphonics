/**
 * PWA 아이콘 생성 스크립트
 *
 * 사용법:
 * 1. sharp 패키지 설치: npm install sharp --save-dev
 * 2. 스크립트 실행: node scripts/generate-icons.js
 *
 * 또는 온라인 도구 사용:
 * - https://realfavicongenerator.net/
 * - https://www.pwabuilder.com/imageGenerator
 */

const fs = require('fs');
const path = require('path');

// 생성할 아이콘 사이즈들
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// SVG 아이콘 생성 함수
function generateSvgIcon(size) {
  const scale = size / 512;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#f97316"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${80 * scale}" fill="url(#bg)"/>
  <g transform="translate(${106 * scale}, ${106 * scale}) scale(${scale})">
    <rect x="50" y="40" width="200" height="220" rx="10" fill="#fff"/>
    <line x1="80" y1="80" x2="220" y2="80" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <line x1="80" y1="120" x2="220" y2="120" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <line x1="80" y1="160" x2="180" y2="160" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <text x="150" y="230" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="#f97316" text-anchor="middle">ABC</text>
  </g>
</svg>`;
}

// 아이콘 디렉토리 확인/생성
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG 아이콘 생성
ICON_SIZES.forEach((size) => {
  const svgContent = generateSvgIcon(size);
  const filePath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`✅ 생성됨: icon-${size}x${size}.svg`);
});

// Apple Touch Icon
const appleTouchIcon = generateSvgIcon(180);
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.svg'), appleTouchIcon);
console.log('✅ 생성됨: apple-touch-icon.svg');

// Badge Icon
const badgeIcon = generateSvgIcon(72);
fs.writeFileSync(path.join(iconsDir, 'badge-72x72.svg'), badgeIcon);
console.log('✅ 생성됨: badge-72x72.svg');

console.log('\n📱 SVG 아이콘이 생성되었습니다.');
console.log('\n💡 PNG 변환 방법:');
console.log('1. sharp 패키지 사용: npm install sharp');
console.log('2. 또는 온라인 도구: https://cloudconvert.com/svg-to-png');
console.log('3. 또는 Figma/Adobe XD에서 직접 export\n');
