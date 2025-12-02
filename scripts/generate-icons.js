/**
 * PWA 아이콘 생성 스크립트
 *
 * 사용법:
 * 1. sharp 패키지 설치: npm install sharp --save-dev
 * 2. 스크립트 실행: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 생성할 아이콘 사이즈들
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// 기본 SVG 아이콘 (512x512 기준)
const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#f97316"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#bg)"/>
  <g transform="translate(106, 106)">
    <rect x="50" y="40" width="200" height="220" rx="10" fill="#fff"/>
    <line x1="80" y1="80" x2="220" y2="80" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <line x1="80" y1="120" x2="220" y2="120" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <line x1="80" y1="160" x2="180" y2="160" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <text x="150" y="230" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="#f97316" text-anchor="middle">ABC</text>
  </g>
  <circle cx="420" cy="100" r="20" fill="#fff" opacity="0.8"/>
  <circle cx="100" cy="420" r="15" fill="#fff" opacity="0.6"/>
  <circle cx="380" cy="400" r="12" fill="#fff" opacity="0.5"/>
</svg>`;

// 아이콘 디렉토리 확인/생성
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  console.log('🎨 PNG 아이콘 생성 시작...\n');

  // SVG를 Buffer로 변환
  const svgBuffer = Buffer.from(baseSvg);

  // 각 사이즈별 PNG 생성
  for (const size of ICON_SIZES) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✅ 생성됨: icon-${size}x${size}.png`);
  }

  // Apple Touch Icon (180x180)
  const applePath = path.join(iconsDir, 'apple-touch-icon.png');
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(applePath);
  console.log('✅ 생성됨: apple-touch-icon.png');

  // Favicon (32x32)
  const faviconPath = path.join(iconsDir, 'favicon-32x32.png');
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(faviconPath);
  console.log('✅ 생성됨: favicon-32x32.png');

  // Favicon (16x16)
  const favicon16Path = path.join(iconsDir, 'favicon-16x16.png');
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(favicon16Path);
  console.log('✅ 생성됨: favicon-16x16.png');

  console.log('\n🎉 모든 PNG 아이콘이 생성되었습니다!');
}

generateIcons().catch(console.error);
