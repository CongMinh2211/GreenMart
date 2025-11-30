import fs from 'fs';

// Hàm tạo test case
function createTestCase(id, ten, nguoi, chucNang, moTa, input, expected, loai, quyTrinh, dieuKienTienQuyet) {
  return {
    id,
    ten,
    input: input || '',
    expected,
    nguoi,
    chucNang,
    moTa,
    quyTrinh: quyTrinh || '',
    dieuKienTienQuyet: dieuKienTienQuyet || '',
    ketQuaThucTe: '',
    trangThai: "chua-test",
    loai,
    ghiChu: ''
  };
}

const allTestCases = [];

// --- NGƯỜI 1: 30 TC (UI) ---
// Chức năng: Đăng ký (7 TC)
const dkTestCases = [
  { id: "TC_DK_001", ten: "Đăng ký - Để trống", moTa: "Để trống tất cả các trường và bấm Đăng ký", expected: "Hiển thị lỗi đỏ ở các trường bắt buộc" },
  { id: "TC_DK_002", ten: "Đăng ký - Email sai định dạng", moTa: "Nhập Email sai định dạng (vd: 'abc', 'abc@')", expected: "Báo lỗi 'Email không hợp lệ'" },
  { id: "TC_DK_003", ten: "Đăng ký - Mật khẩu ngắn", moTa: "Nhập Mật khẩu < 6 ký tự", expected: "Báo lỗi 'Mật khẩu quá ngắn'" },
  { id: "TC_DK_004", ten: "Đăng ký - Mật khẩu không khớp", moTa: "Nhập 'Nhập lại mật khẩu' không khớp", expected: "Báo lỗi 'Mật khẩu không khớp'" },
  { id: "TC_DK_005", ten: "Đăng ký - Email tồn tại", moTa: "Đăng ký với Email đã tồn tại", expected: "Báo lỗi 'Email đã được sử dụng'" },
  { id: "TC_DK_006", ten: "Đăng ký - Tên ký tự đặc biệt", moTa: "Nhập tên chứa ký tự đặc biệt (@#$%)", expected: "Chấp nhận hoặc báo lỗi (tùy spec)" },
  { id: "TC_DK_007", ten: "Đăng ký - Hợp lệ", moTa: "Nhập tất cả hợp lệ", expected: "Thông báo thành công, chuyển trang" }
];

dkTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 1", "Đăng ký", tc.moTa, "Nhập liệu theo mô tả", tc.expected, "UI", "1. Vào trang đăng ký\n2. Nhập liệu\n3. Bấm Đăng ký", "Trang đăng ký mở"));
});

// Chức năng: Đăng nhập (8 TC)
const dnTestCases = [
  { id: "TC_DN_001", ten: "Đăng nhập - Để trống", moTa: "Để trống Email và Mật khẩu", expected: "Báo lỗi 'Vui lòng nhập thông tin'" },
  { id: "TC_DN_002", ten: "Đăng nhập - Email chưa đăng ký", moTa: "Nhập Email chưa đăng ký", expected: "Báo lỗi 'Tài khoản không tồn tại'" },
  { id: "TC_DN_003", ten: "Đăng nhập - Sai mật khẩu", moTa: "Nhập đúng Email, sai Mật khẩu", expected: "Báo lỗi 'Sai mật khẩu'" },
  { id: "TC_DN_004", ten: "Đăng nhập - Email có khoảng trắng", moTa: "Nhập Email có khoảng trắng (Trim space)", expected: "Hệ thống tự xóa khoảng trắng, login OK" },
  { id: "TC_DN_005", ten: "Đăng nhập - Hiện mật khẩu", moTa: "Kiểm tra nút 'Hiện mật khẩu' (icon mắt)", expected: "Mật khẩu hiện rõ text" },
  { id: "TC_DN_006", ten: "Đăng nhập - Thành công", moTa: "Đăng nhập thành công", expected: "Chuyển về Home, lưu token" },
  { id: "TC_DN_007", ten: "Đăng nhập - F5 giữ trạng thái", moTa: "Đăng nhập rồi F5 lại trang", expected: "Vẫn giữ trạng thái đăng nhập" },
  { id: "TC_DN_008", ten: "Đăng nhập - Đăng xuất", moTa: "Đăng xuất", expected: "Xóa token, quay về Login" }
];

dnTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 1", "Đăng nhập", tc.moTa, "Nhập liệu theo mô tả", tc.expected, "UI", "1. Vào trang đăng nhập\n2. Nhập liệu\n3. Bấm Đăng nhập", "Trang đăng nhập mở"));
});

// Chức năng: Chi tiết SP (15 TC)
const ctspTestCases = [
  { id: "TC_CTSP_001", ten: "Chi tiết - Tên sản phẩm", moTa: "Kiểm tra tên sản phẩm hiển thị", expected: "Đúng tên, font chữ rõ ràng" },
  { id: "TC_CTSP_002", ten: "Chi tiết - Format giá", moTa: "Kiểm tra giá tiền format (có dấu chấm)", expected: "Hiển thị '50.000 đ' (không phải 50000)" },
  { id: "TC_CTSP_003", ten: "Chi tiết - Ảnh sản phẩm", moTa: "Kiểm tra ảnh sản phẩm", expected: "Ảnh không bị vỡ (broken link)" },
  { id: "TC_CTSP_004", ten: "Chi tiết - Mô tả dài", moTa: "Kiểm tra mô tả dài", expected: "Text xuống dòng, không tràn lề" },
  { id: "TC_CTSP_005", ten: "Chi tiết - Số lượng 0", moTa: "Nhập số lượng = 0", expected: "Nút Thêm bị disable hoặc báo lỗi" },
  { id: "TC_CTSP_006", ten: "Chi tiết - Số lượng âm", moTa: "Nhập số lượng âm (-5)", expected: "Tự động reset về 1" },
  { id: "TC_CTSP_007", ten: "Chi tiết - Số lượng chữ", moTa: "Nhập ký tự chữ vào ô số lượng", expected: "Không nhận giá trị chữ" },
  { id: "TC_CTSP_008", ten: "Chi tiết - Nút cộng", moTa: "Bấm nút cộng (+)", expected: "Số lượng tăng lên 1" },
  { id: "TC_CTSP_009", ten: "Chi tiết - Nút trừ", moTa: "Bấm nút trừ (-) khi đang là 1", expected: "Không giảm xuống 0" },
  { id: "TC_CTSP_010", ten: "Chi tiết - Thêm vào giỏ", moTa: "Bấm 'Thêm vào giỏ'", expected: "Hiện thông báo thành công" },
  { id: "TC_CTSP_011", ten: "Chi tiết - Mua ngay", moTa: "Bấm 'Mua ngay'", expected: "Chuyển thẳng sang Giỏ hàng" },
  { id: "TC_CTSP_012", ten: "Chi tiết - Breadcrumb", moTa: "Bấm Breadcrumb (Trang chủ > Rau)", expected: "Quay lại danh mục cha" },
  { id: "TC_CTSP_013", ten: "Chi tiết - Mobile", moTa: "Check giao diện trên điện thoại", expected: "Nút mua hàng dính đáy/hiển thị tốt" },
  { id: "TC_CTSP_014", ten: "Chi tiết - Hết hàng", moTa: "Sản phẩm hết hàng (Stock=0)", expected: "Nút Mua bị mờ, hiện 'Hết hàng'" },
  { id: "TC_CTSP_015", ten: "Chi tiết - Khuyến mãi", moTa: "Sản phẩm đang giảm giá", expected: "Giá cũ gạch ngang, giá mới màu đỏ" }
];

ctspTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 1", "Chi tiết SP", tc.moTa, "Thao tác trên trang chi tiết", tc.expected, "UI", "1. Vào trang chi tiết\n2. Thực hiện thao tác", "Có sản phẩm"));
});

// --- NGƯỜI 2: 30 TC (UI) ---
// Chức năng: Tìm kiếm (15 TC)
const tkTestCases = [
  { id: "TC_TK_001", ten: "Tìm kiếm - Chính xác", moTa: "Nhập từ khóa chính xác (vd: 'Táo')", expected: "Ra sản phẩm Táo" },
  { id: "TC_TK_002", ten: "Tìm kiếm - Hoa thường", moTa: "Nhập hoa/thường (vd: 'tÁo')", expected: "Vẫn ra kết quả Táo" },
  { id: "TC_TK_003", ten: "Tìm kiếm - Không dấu", moTa: "Nhập không dấu (vd: 'tao')", expected: "Ra kết quả Táo" },
  { id: "TC_TK_004", ten: "Tìm kiếm - Không tồn tại", moTa: "Nhập từ khóa không tồn tại", expected: "Hiện 'Không tìm thấy sản phẩm'" },
  { id: "TC_TK_005", ten: "Tìm kiếm - Ký tự đặc biệt", moTa: "Nhập ký tự đặc biệt (@#$)", expected: "Không lỗi trang (Crash)" },
  { id: "TC_TK_006", ten: "Tìm kiếm - Khoảng trắng", moTa: "Nhập khoảng trắng (Space)", expected: "Không tìm hoặc hiện tất cả" },
  { id: "TC_TK_007", ten: "Tìm kiếm - Enter", moTa: "Bấm Enter thay vì click icon", expected: "Thực hiện tìm kiếm" },
  { id: "TC_TK_008", ten: "Tìm kiếm - Xóa từ khóa", moTa: "Xóa từ khóa tìm kiếm", expected: "List trở về mặc định" },
  { id: "TC_TK_009", ten: "Bộ lọc - Rau củ", moTa: "Lọc theo loại 'Rau củ'", expected: "Chỉ hiện rau củ" },
  { id: "TC_TK_010", ten: "Bộ lọc - Trái cây", moTa: "Lọc theo loại 'Trái cây'", expected: "Chỉ hiện trái cây" },
  { id: "TC_TK_011", ten: "Bộ lọc - Dưới 50k", moTa: "Lọc giá 'Dưới 50k'", expected: "Chỉ hiện sp giá < 50k" },
  { id: "TC_TK_012", ten: "Bộ lọc - Trên 100k", moTa: "Lọc giá 'Trên 100k'", expected: "Chỉ hiện sp giá > 100k" },
  { id: "TC_TK_013", ten: "Sắp xếp - Thấp đến cao", moTa: "Giá thấp đến cao", expected: "Rẻ nhất lên đầu" },
  { id: "TC_TK_014", ten: "Sắp xếp - Cao đến thấp", moTa: "Giá cao đến thấp", expected: "Đắt nhất lên đầu" },
  { id: "TC_TK_015", ten: "Kết hợp - Lọc + Sort", moTa: "Lọc 'Rau' + Sort 'Giá thấp -> cao'", expected: "Ra kết quả đúng cả 2 đk" }
];

tkTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 2", "Tìm kiếm", tc.moTa, "Nhập từ khóa/Chọn bộ lọc", tc.expected, "UI", "1. Vào trang chủ/tìm kiếm\n2. Nhập/Chọn\n3. Kiểm tra kết quả", "Trang chủ load xong"));
});

// Chức năng: Giỏ hàng (15 TC)
const ghTestCases = [
  { id: "TC_GH_001", ten: "Giỏ hàng - Trống", moTa: "Vào giỏ khi chưa mua gì", expected: "Hiện 'Giỏ hàng trống'" },
  { id: "TC_GH_002", ten: "Giỏ hàng - Hiển thị SP", moTa: "Thêm 1 sp rồi vào giỏ", expected: "Thấy đúng sp (Ảnh, tên, giá)" },
  { id: "TC_GH_003", ten: "Giỏ hàng - Tăng số lượng", moTa: "Tăng số lượng trong giỏ", expected: "Tổng tiền dòng đó tăng" },
  { id: "TC_GH_004", ten: "Giỏ hàng - Giảm số lượng", moTa: "Giảm số lượng trong giỏ", expected: "Tổng tiền dòng đó giảm" },
  { id: "TC_GH_005", ten: "Giỏ hàng - Giảm về 0", moTa: "Giảm số lượng về 0", expected: "Hỏi confirm xóa, OK thì xóa" },
  { id: "TC_GH_006", ten: "Giỏ hàng - Xóa", moTa: "Bấm nút Xóa (Thùng rác)", expected: "Xóa sp khỏi giỏ" },
  { id: "TC_GH_007", ten: "Giỏ hàng - Tính toán", moTa: "Check tổng tạm tính", expected: "Bằng tổng các món cộng lại" },
  { id: "TC_GH_008", ten: "Giỏ hàng - Lưu trữ", moTa: "Tắt tab mở lại (LocalStorage)", expected: "Giỏ hàng vẫn còn" },
  { id: "TC_GH_009", ten: "Giỏ hàng - Sync tab", moTa: "Mở 2 tab, thao tác tab 1", expected: "Tab 2 cập nhật (nếu có sync)" },
  { id: "TC_GH_010", ten: "Giỏ hàng - Link SP", moTa: "Bấm tên sp trong giỏ", expected: "Chuyển về trang chi tiết" },
  { id: "TC_GH_011", ten: "Giỏ hàng - Thanh toán", moTa: "Bấm 'Thanh toán'", expected: "Chuyển sang trang Checkout" },
  { id: "TC_GH_012", ten: "Giỏ hàng - Mobile", moTa: "Check giao diện mobile", expected: "Bảng không vỡ, nút bấm được" },
  { id: "TC_GH_013", ten: "Giỏ hàng - Logic tồn kho", moTa: "Thêm quá số lượng tồn kho", expected: "Báo lỗi 'Không đủ hàng'" },
  { id: "TC_GH_014", ten: "Giỏ hàng - Icon", moTa: "Check số trên icon giỏ hàng", expected: "Hiển thị đúng số lượng món" },
  { id: "TC_GH_015", ten: "Giỏ hàng - Xóa hết", moTa: "Bấm nút 'Xóa tất cả'", expected: "Giỏ hàng trở về rỗng" }
];

ghTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 2", "Giỏ hàng", tc.moTa, "Thao tác trong giỏ hàng", tc.expected, "UI", "1. Vào giỏ hàng\n2. Thực hiện thao tác", "Có/Không có SP trong giỏ"));
});

// --- NGƯỜI 3: 30 TC (UI) ---
// Chức năng: Thanh toán (15 TC)
const ttTestCases = [
  { id: "TC_TT_001", ten: "Thanh toán - Trống tên", moTa: "Để trống Họ tên", expected: "Báo lỗi bắt buộc" },
  { id: "TC_TT_002", ten: "Thanh toán - Trống SĐT", moTa: "Để trống SĐT", expected: "Báo lỗi bắt buộc" },
  { id: "TC_TT_003", ten: "Thanh toán - SĐT chữ", moTa: "Nhập SĐT có chữ", expected: "Báo lỗi 'SĐT không hợp lệ'" },
  { id: "TC_TT_004", ten: "Thanh toán - SĐT 9 số", moTa: "Nhập SĐT 9 số", expected: "Báo lỗi 'Phải đủ 10 số'" },
  { id: "TC_TT_005", ten: "Thanh toán - Trống địa chỉ", moTa: "Để trống Địa chỉ", expected: "Báo lỗi bắt buộc" },
  { id: "TC_TT_006", ten: "Thanh toán - Mã sai", moTa: "Nhập mã sai", expected: "Báo lỗi 'Mã không tồn tại'" },
  { id: "TC_TT_007", ten: "Thanh toán - Mã đúng", moTa: "Nhập mã đúng", expected: "Tiền giảm đúng % hoặc số tiền" },
  { id: "TC_TT_008", ten: "Thanh toán - Xóa mã", moTa: "Xóa mã giảm giá", expected: "Tiền về nguyên giá" },
  { id: "TC_TT_009", ten: "Thanh toán - Ship nội thành", moTa: "Chọn nội thành", expected: "Phí ship hiển thị mức A" },
  { id: "TC_TT_010", ten: "Thanh toán - Ship ngoại thành", moTa: "Chọn ngoại thành", expected: "Phí ship hiển thị mức B" },
  { id: "TC_TT_011", ten: "Thanh toán - COD", moTa: "Chọn 'Tiền mặt' (COD)", expected: "Checkbox được chọn" },
  { id: "TC_TT_012", ten: "Thanh toán - CK", moTa: "Chọn 'Chuyển khoản'", expected: "Hiện thông tin ngân hàng" },
  { id: "TC_TT_013", ten: "Thanh toán - Submit lỗi", moTa: "Bấm 'Đặt hàng' (Chưa điền đủ)", expected: "Không submit, scroll tới lỗi" },
  { id: "TC_TT_014", ten: "Thanh toán - Thành công", moTa: "Đặt hàng thành công", expected: "Chuyển trang Cảm ơn, Xóa giỏ" },
  { id: "TC_TT_015", ten: "Thanh toán - Email", moTa: "Check email (giả lập)", expected: "Nhận email xác nhận đơn" }
];

ttTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 3", "Thanh toán", tc.moTa, "Nhập thông tin thanh toán", tc.expected, "UI", "1. Vào trang thanh toán\n2. Nhập liệu\n3. Bấm Đặt hàng", "Có SP trong giỏ"));
});

// Chức năng: Lịch sử (15 TC)
const lsTestCases = [
  { id: "TC_LS_001", ten: "Profile - Thông tin", moTa: "Xem thông tin cá nhân", expected: "Hiển thị đúng tên, email" },
  { id: "TC_LS_002", ten: "Profile - Đổi tên", moTa: "Đổi tên hiển thị", expected: "Cập nhật tên mới trên Header" },
  { id: "TC_LS_003", ten: "Đổi Pass - Sai pass cũ", moTa: "Nhập mật khẩu cũ sai", expected: "Báo lỗi" },
  { id: "TC_LS_004", ten: "Đổi Pass - Trùng pass cũ", moTa: "Mật khẩu mới trùng cũ", expected: "Báo lỗi/Cảnh báo" },
  { id: "TC_LS_005", ten: "Đổi Pass - Thành công", moTa: "Đổi thành công", expected: "Thông báo thành công" },
  { id: "TC_LS_006", ten: "Lịch sử - Danh sách", moTa: "Xem danh sách đơn", expected: "Hiển thị các đơn vừa đặt" },
  { id: "TC_LS_007", ten: "Lịch sử - Trạng thái", moTa: "Check trạng thái đơn", expected: "Hiển thị đúng (Mới/Đang giao)" },
  { id: "TC_LS_008", ten: "Lịch sử - Chi tiết", moTa: "Xem chi tiết đơn cũ", expected: "Đúng sản phẩm, đúng tổng tiền" },
  { id: "TC_LS_009", ten: "Logout - Click", moTa: "Bấm Đăng xuất", expected: "Quay về trang chủ, xóa session" },
  { id: "TC_LS_010", ten: "Logout - Back", moTa: "Đăng xuất rồi back lại", expected: "Không vào được trang Profile" },
  { id: "TC_LS_011", ten: "UI - Footer", moTa: "Check Footer", expected: "Link hoạt động tốt" },
  { id: "TC_LS_012", ten: "UI - Logo", moTa: "Bấm Logo", expected: "Quay về trang chủ" },
  { id: "TC_LS_013", ten: "404 - Link sai", moTa: "Vào link bậy bạ (/abc)", expected: "Ra trang 404" },
  { id: "TC_LS_014", ten: "Loading - Mạng chậm", moTa: "Mạng chậm", expected: "Có hiện loading spinner" },
  { id: "TC_LS_015", ten: "Favicon", moTa: "Check icon tab trình duyệt", expected: "Đúng logo GreenMart" }
];

lsTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, tc.ten, "Người 3", "Lịch sử", tc.moTa, "Thao tác trong profile/lịch sử", tc.expected, "UI", "1. Vào trang profile/lịch sử\n2. Thực hiện thao tác", "Đã đăng nhập"));
});

// --- NGƯỜI 4: 30 TC (UNIT) ---
// Chức năng: Hợp lệ (15 TC)
const kthlTestCases = [
  { id: "TC_KTHL_001", file: "kiem_tra.js", ham: "kiemTraEmail", input: "'test@gmail.com'", expected: "true" },
  { id: "TC_KTHL_002", file: "kiem_tra.js", ham: "kiemTraEmail", input: "'https://www.google.com/search?q=testgmail.com'", expected: "false" },
  { id: "TC_KTHL_003", file: "kiem_tra.js", ham: "kiemTraEmail", input: "'test@'", expected: "false" },
  { id: "TC_KTHL_004", file: "kiem_tra.js", ham: "kiemTraEmail", input: "'' (Rỗng)", expected: "false" },
  { id: "TC_KTHL_005", file: "kiem_tra.js", ham: "kiemTraEmail", input: "'test@.com'", expected: "false" },
  { id: "TC_KTHL_006", file: "kiem_tra.js", ham: "kiemTraSDT", input: "'0912345678'", expected: "true" },
  { id: "TC_KTHL_007", file: "kiem_tra.js", ham: "kiemTraSDT", input: "'091234567' (9 số)", expected: "false" },
  { id: "TC_KTHL_008", file: "kiem_tra.js", ham: "kiemTraSDT", input: "'11 số'", expected: "false" },
  { id: "TC_KTHL_009", file: "kiem_tra.js", ham: "kiemTraSDT", input: "'abcdefghij'", expected: "false" },
  { id: "TC_KTHL_010", file: "kiem_tra.js", ham: "kiemTraPass", input: "'123456' (>=6)", expected: "true" },
  { id: "TC_KTHL_011", file: "kiem_tra.js", ham: "kiemTraPass", input: "'123'", expected: "false" },
  { id: "TC_KTHL_012", file: "kiem_tra.js", ham: "kiemTraTrong", input: "''", expected: "true" },
  { id: "TC_KTHL_013", file: "kiem_tra.js", ham: "kiemTraTrong", input: "' ' (space)", expected: "true" },
  { id: "TC_KTHL_014", file: "kiem_tra.js", ham: "kiemTraTrong", input: "'abc'", expected: "false" },
  { id: "TC_KTHL_015", file: "kiem_tra.js", ham: "validateForm", input: "Obj hợp lệ", expected: "Return isValid: true" }
];

kthlTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, `${tc.ham} - ${tc.input}`, "Người 4", tc.file, `Test hàm ${tc.ham}`, tc.input, tc.expected, "UNIT", `Gọi hàm ${tc.ham} với input ${tc.input}`, "File được import"));
});

// Chức năng: HT Tìm kiếm (15 TC)
const httkTestCases = [
  { id: "TC_HTTK_001", file: "ho_tro.js", ham: "timSanPham", input: "Data 10 món, key='Táo'", expected: "Return mảng chứa Táo" },
  { id: "TC_HTTK_002", file: "ho_tro.js", ham: "timSanPham", input: "key='XYZ' (Ko có)", expected: "Return []" },
  { id: "TC_HTTK_003", file: "ho_tro.js", ham: "timSanPham", input: "key='táo' (thường)", expected: "Tìm ra 'Táo' (hoa)" },
  { id: "TC_HTTK_004", file: "ho_tro.js", ham: "timSanPham", input: "key='' (rỗng)", expected: "Return all" },
  { id: "TC_HTTK_005", file: "ho_tro.js", ham: "timSanPham", input: "Data null", expected: "Return []" },
  { id: "TC_HTTK_006", file: "ho_tro.js", ham: "sapXepGia", input: "[5, 1, 10], 'asc'", expected: "Return [1, 5, 10]" },
  { id: "TC_HTTK_007", file: "ho_tro.js", ham: "sapXepGia", input: "[5, 1, 10], 'desc'", expected: "Return [10, 5, 1]" },
  { id: "TC_HTTK_008", file: "ho_tro.js", ham: "sapXepGia", input: "Giá bằng nhau", expected: "Giữ nguyên thứ tự" },
  { id: "TC_HTTK_009", file: "ho_tro.js", ham: "locTheoLoai", input: "Type='fruit'", expected: "Return list fruit" },
  { id: "TC_HTTK_010", file: "ho_tro.js", ham: "locTheoLoai", input: "Type='all'", expected: "Return list gốc" },
  { id: "TC_HTTK_011", file: "ho_tro.js", ham: "taoSlug", input: "'Táo Mỹ'", expected: "Return 'tao-my'" },
  { id: "TC_HTTK_012", file: "ho_tro.js", ham: "taoSlug", input: "'Rau & Củ'", expected: "Return 'rau-cu'" },
  { id: "TC_HTTK_013", file: "ho_tro.js", ham: "highlight", input: "'Táo Mỹ', key='Táo'", expected: "<b>Táo</b> Mỹ" },
  { id: "TC_HTTK_014", file: "ho_tro.js", ham: "phantrang", input: "Page 1, limit 10", expected: "Item 0-9" },
  { id: "TC_HTTK_015", file: "ho_tro.js", ham: "phantrang", input: "Page 3 (quá data)", expected: "Return []" }
];

httkTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, `${tc.ham} - ${tc.input}`, "Người 4", tc.file, `Test hàm ${tc.ham}`, tc.input, tc.expected, "UNIT", `Gọi hàm ${tc.ham}`, "File được import"));
});

// --- NGƯỜI 5: 30 TC (UNIT) ---
// Chức năng: Tính toán (15 TC)
const ttoanTestCases = [
  { id: "TC_TTOAN_001", file: "tinh_toan.js", ham: "tinhTongTien", input: "Giỏ rỗng []", expected: "Return 0" },
  { id: "TC_TTOAN_002", file: "tinh_toan.js", ham: "tinhTongTien", input: "1 món (10k, sl 1)", expected: "Return 10000" },
  { id: "TC_TTOAN_003", file: "tinh_toan.js", ham: "tinhTongTien", input: "1 món (10k, sl 2)", expected: "Return 20000" },
  { id: "TC_TTOAN_004", file: "tinh_toan.js", ham: "tinhTongTien", input: "2 món khác nhau", expected: "Tổng A + B" },
  { id: "TC_TTOAN_005", file: "tinh_toan.js", ham: "tinhTongTien", input: "Số lượng âm", expected: "Return Error/0" },
  { id: "TC_TTOAN_006", file: "tinh_toan.js", ham: "tinhGiamGia", input: "Tổng 100k, Mã 10%", expected: "Giảm 10k" },
  { id: "TC_TTOAN_007", file: "tinh_toan.js", ham: "tinhGiamGia", input: "Tổng 100k, Mã 200k", expected: "Giảm 100k (Max free)" },
  { id: "TC_TTOAN_008", file: "tinh_toan.js", ham: "tinhGiamGia", input: "Voucher hết hạn", expected: "Giảm 0" },
  { id: "TC_TTOAN_009", file: "tinh_toan.js", ham: "tinhThueVAT", input: "Tổng 100k, VAT 10%", expected: "Return 10k" },
  { id: "TC_TTOAN_010", file: "tinh_toan.js", ham: "tinhThueVAT", input: "Tổng 0", expected: "Return 0" },
  { id: "TC_TTOAN_011", file: "tinh_toan.js", ham: "congDonGio", input: "Sp mới đã có trong giỏ", expected: "Tăng số lượng" },
  { id: "TC_TTOAN_012", file: "tinh_toan.js", ham: "congDonGio", input: "Sp mới chưa có", expected: "Push mới vào mảng" },
  { id: "TC_TTOAN_013", file: "tinh_toan.js", ham: "tinhPhiShip", input: "Nội thành", expected: "Return 15000" },
  { id: "TC_TTOAN_014", file: "tinh_toan.js", ham: "tinhPhiShip", input: "Ngoại thành", expected: "Return 30000" },
  { id: "TC_TTOAN_015", file: "tinh_toan.js", ham: "tongThanhToan", input: "(Hàng + Ship - Mã)", expected: "Return con số cuối" }
];

ttoanTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, `${tc.ham} - ${tc.input}`, "Người 5", tc.file, `Test hàm ${tc.ham}`, tc.input, tc.expected, "UNIT", `Gọi hàm ${tc.ham}`, "File được import"));
});

// Chức năng: Lưu trữ (15 TC)
const ltTestCases = [
  { id: "TC_LT_001", file: "luu_tru.js", ham: "formatTienTe", input: "10000", expected: "'10.000'" },
  { id: "TC_LT_002", file: "luu_tru.js", ham: "formatTienTe", input: "1000000", expected: "'1.000.000'" },
  { id: "TC_LT_003", file: "luu_tru.js", ham: "formatTienTe", input: "0", expected: "'0'" },
  { id: "TC_LT_004", file: "luu_tru.js", ham: "formatTienTe", input: "null/undefined", expected: "'' hoặc '0'" },
  { id: "TC_LT_005", file: "luu_tru.js", ham: "luuGioHang", input: "Array data", expected: "LocalStorage có key" },
  { id: "TC_LT_006", file: "luu_tru.js", ham: "layGioHang", input: "Có data", expected: "Return Array" },
  { id: "TC_LT_007", file: "luu_tru.js", ham: "layGioHang", input: "Không data", expected: "Return []" },
  { id: "TC_LT_008", file: "luu_tru.js", ham: "layGioHang", input: "Data lỗi JSON", expected: "Return [] (Catch)" },
  { id: "TC_LT_009", file: "luu_tru.js", ham: "xoaGioHang", input: "Gọi hàm", expected: "LocalStorage xóa key" },
  { id: "TC_LT_010", file: "luu_tru.js", ham: "formatNgay", input: "'2023-01-01'", expected: "'01/01/2023'" },
  { id: "TC_LT_011", file: "luu_tru.js", ham: "checkToken", input: "Có token", expected: "Return true" },
  { id: "TC_LT_012", file: "luu_tru.js", ham: "checkToken", input: "Không token", expected: "Return false" },
  { id: "TC_LT_013", file: "luu_tru.js", ham: "luuUser", input: "Obj User", expected: "Storage lưu user" },
  { id: "TC_LT_014", file: "luu_tru.js", ham: "xoaUser", input: "Logout", expected: "Xóa user info" },
  { id: "TC_LT_015", file: "luu_tru.js", ham: "taoMaDon", input: "(Call)", expected: "Return String Random" }
];

ltTestCases.forEach(tc => {
  allTestCases.push(createTestCase(tc.id, `${tc.ham} - ${tc.input}`, "Người 5", tc.file, `Test hàm ${tc.ham}`, tc.input, tc.expected, "UNIT", `Gọi hàm ${tc.ham}`, "File được import"));
});

// Ghi đè file
fs.writeFileSync('src/du_lieu/danh_sach_test_case.json', JSON.stringify(allTestCases, null, 2));

console.log(`Đã tạo lại ${allTestCases.length} test cases.`);
console.log(`Phân bổ:`);
console.log(`- Người 1 (UI): ${allTestCases.filter(tc => tc.nguoi === 'Người 1').length}`);
console.log(`- Người 2 (UI): ${allTestCases.filter(tc => tc.nguoi === 'Người 2').length}`);
console.log(`- Người 3 (UI): ${allTestCases.filter(tc => tc.nguoi === 'Người 3').length}`);
console.log(`- Người 4 (UNIT): ${allTestCases.filter(tc => tc.nguoi === 'Người 4').length}`);
console.log(`- Người 5 (UNIT): ${allTestCases.filter(tc => tc.nguoi === 'Người 5').length}`);
