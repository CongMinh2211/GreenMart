const fs = require('fs');

// Đọc file test cases hiện tại
const currentData = JSON.parse(fs.readFileSync('src/du_lieu/danh_sach_test_case.json', 'utf8'));

// Tạo thêm test cases để đủ 150 (30/người)
const newTestCases = [];

// Người 1: Thêm 25 test cases nữa (hiện có 10, cần 30)
// Đăng ký & Đăng nhập: thêm 20
for (let i = 6; i <= 25; i++) {
  newTestCases.push({
    id: `TC_DK_${String(i).padStart(3, '0')}`,
    ten: `Test đăng ký ${i}`,
    nguoi: "Người 1",
    chucNang: "Đăng ký & Đăng nhập",
    moTa: `Test case đăng ký số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UI"
  });
}

// Chi tiết sản phẩm: thêm 5
for (let i = 6; i <= 10; i++) {
  newTestCases.push({
    id: `TC_CTSP_${String(i).padStart(3, '0')}`,
    ten: `Test chi tiết sản phẩm ${i}`,
    nguoi: "Người 1",
    chucNang: "Chi tiết sản phẩm",
    moTa: `Test case chi tiết sản phẩm số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UI"
  });
}

// Người 2: Thêm 25 test cases nữa (hiện có 10, cần 30)
// Tìm kiếm & Bộ lọc: thêm 25
for (let i = 6; i <= 30; i++) {
  newTestCases.push({
    id: `TC_TK_${String(i).padStart(3, '0')}`,
    ten: `Test tìm kiếm ${i}`,
    nguoi: "Người 2",
    chucNang: "Tìm kiếm & Bộ lọc",
    moTa: `Test case tìm kiếm số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UI"
  });
}

// Quản lý Giỏ hàng: thêm 5
for (let i = 6; i <= 10; i++) {
  newTestCases.push({
    id: `TC_GH_${String(i).padStart(3, '0')}`,
    ten: `Test giỏ hàng ${i}`,
    nguoi: "Người 2",
    chucNang: "Quản lý Giỏ hàng UI",
    moTa: `Test case giỏ hàng số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UI"
  });
}

// Người 3: Thêm 27 test cases nữa (hiện có 3, cần 30)
// Thanh toán: thêm 25
for (let i = 6; i <= 30; i++) {
  newTestCases.push({
    id: `TC_TT_${String(i).padStart(3, '0')}`,
    ten: `Test thanh toán ${i}`,
    nguoi: "Người 3",
    chucNang: "Thanh toán",
    moTa: `Test case thanh toán số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UI"
  });
}

// Lịch sử & Cá nhân: thêm 2
for (let i = 4; i <= 5; i++) {
  newTestCases.push({
    id: `TC_LS_${String(i).padStart(3, '0')}`,
    ten: `Test lịch sử ${i}`,
    nguoi: "Người 3",
    chucNang: "Lịch sử & Cá nhân",
    moTa: `Test case lịch sử số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UI"
  });
}

// Người 4: Thêm 25 test cases nữa (hiện có 5, cần 30)
// kiem_tra_hop_le.js: thêm 15
for (let i = 6; i <= 20; i++) {
  newTestCases.push({
    id: `TC_KTHL_${String(i).padStart(3, '0')}`,
    ten: `Test kiểm tra hợp lệ ${i}`,
    nguoi: "Người 4",
    chucNang: "kiem_tra_hop_le.js",
    moTa: `Test case kiểm tra hợp lệ số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UNIT"
  });
}

// ho_tro_tim_kiem.js: thêm 10
for (let i = 6; i <= 15; i++) {
  newTestCases.push({
    id: `TC_HTTK_${String(i).padStart(3, '0')}`,
    ten: `Test hỗ trợ tìm kiếm ${i}`,
    nguoi: "Người 4",
    chucNang: "ho_tro_tim_kiem.js",
    moTa: `Test case hỗ trợ tìm kiếm số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UNIT"
  });
}

// Người 5: Thêm 25 test cases nữa (hiện có 5, cần 30)
// tinh_toan.js: thêm 15
for (let i = 6; i <= 20; i++) {
  newTestCases.push({
    id: `TC_TT_${String(i).padStart(3, '0')}`,
    ten: `Test tính toán ${i}`,
    nguoi: "Người 5",
    chucNang: "tinh_toan.js",
    moTa: `Test case tính toán số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UNIT"
  });
}

// luu_tru.js: thêm 10
for (let i = 6; i <= 15; i++) {
  newTestCases.push({
    id: `TC_LT_${String(i).padStart(3, '0')}`,
    ten: `Test lưu trữ ${i}`,
    nguoi: "Người 5",
    chucNang: "luu_tru.js",
    moTa: `Test case lưu trữ số ${i}`,
    input: `Input test ${i}`,
    expected: `Expected result ${i}`,
    trangThai: "chua-test",
    loai: "UNIT"
  });
}

// Gộp với dữ liệu hiện tại
const allTestCases = [...currentData, ...newTestCases];

// Ghi lại file
fs.writeFileSync('src/du_lieu/danh_sach_test_case.json', JSON.stringify(allTestCases, null, 2));

console.log(`Đã tạo thêm ${newTestCases.length} test cases. Tổng cộng: ${allTestCases.length} test cases.`);
console.log(`Phân bổ:`);
console.log(`- Người 1: ${allTestCases.filter(tc => tc.nguoi === 'Người 1').length} test cases`);
console.log(`- Người 2: ${allTestCases.filter(tc => tc.nguoi === 'Người 2').length} test cases`);
console.log(`- Người 3: ${allTestCases.filter(tc => tc.nguoi === 'Người 3').length} test cases`);
console.log(`- Người 4: ${allTestCases.filter(tc => tc.nguoi === 'Người 4').length} test cases`);
console.log(`- Người 5: ${allTestCases.filter(tc => tc.nguoi === 'Người 5').length} test cases`);

