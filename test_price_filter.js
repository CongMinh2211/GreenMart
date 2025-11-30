
import { locTheoGia } from './src/tien_ich/ho_tro_tim_kiem.js';
import fs from 'fs';

const danhSachSanPham = JSON.parse(fs.readFileSync('./src/du_lieu/danh_sach_san_pham.json', 'utf8'));

console.log('Total products:', danhSachSanPham.length);

// Test 1: Default (0 to Infinity)
const result1 = locTheoGia(danhSachSanPham, 0, Infinity);
console.log('Test 1 (0 - Infinity):', result1.length);

// Test 2: Range 0 - 30000
const result2 = locTheoGia(danhSachSanPham, 0, 30000);
console.log('Test 2 (0 - 30000):', result2.length);
result2.forEach(p => console.log(`- ${p.ten}: ${p.gia}`));

// Test 3: Range 30000 - 50000
const result3 = locTheoGia(danhSachSanPham, 30000, 50000);
console.log('Test 3 (30000 - 50000):', result3.length);
result3.forEach(p => console.log(`- ${p.ten}: ${p.gia}`));

// Test 4: Min > Max
const result4 = locTheoGia(danhSachSanPham, 50000, 30000);
console.log('Test 4 (50000 - 30000):', result4.length);

// Test 5: String inputs (simulating parseInt behavior if passed directly, though code uses parseInt)
// But let's check if locTheoGia handles strings if passed
const result5 = locTheoGia(danhSachSanPham, "0", "30000");
console.log('Test 5 (Strings "0" - "30000"):', result5.length);

// Test 6: Check if parseInt handles "100.000" correctly (Vietnamese format)
console.log('parseInt("100.000"):', parseInt("100.000"));
console.log('parseInt("100,000"):', parseInt("100,000"));
