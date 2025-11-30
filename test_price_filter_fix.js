
import { locTheoGia } from './src/tien_ich/ho_tro_tim_kiem.js';
import fs from 'fs';

const danhSachSanPham = JSON.parse(fs.readFileSync('./src/du_lieu/danh_sach_san_pham.json', 'utf8'));

console.log('Total products:', danhSachSanPham.length);

// Simulate the logic in TrangChu.jsx
function sanitizeAndParse(input) {
    if (!input) return 0;
    return parseInt(input.replace(/\D/g, ''));
}

// Test Case: User enters "100.000" (meaning 100,000)
const userInputMin = "20.000";
const userInputMax = "40.000";

const min = sanitizeAndParse(userInputMin);
const max = sanitizeAndParse(userInputMax);

console.log(`Input: "${userInputMin}" -> Parsed: ${min}`);
console.log(`Input: "${userInputMax}" -> Parsed: ${max}`);

const result = locTheoGia(danhSachSanPham, min, max);
console.log(`Products between ${min} and ${max}: ${result.length}`);
result.forEach(p => console.log(`- ${p.ten}: ${p.gia}`));

// Verify that it's NOT 0 (which would be the case if it parsed as 20 and 40)
if (min === 20000 && max === 40000) {
    console.log("SUCCESS: Input parsed correctly!");
} else {
    console.log("FAILURE: Input parsed incorrectly!");
}
