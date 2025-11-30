# KẾ HOẠCH KIỂM THỬ - GREENMART

## Tổng quan dự án
- **Tên dự án**: GreenMart - Website bán hàng thực phẩm xanh
- **Công nghệ**: ReactJS + Vite, Jest (Unit Test), Cypress (E2E Test)
- **Mục tiêu**: 150 Test Cases
- **Nhóm**: 5 người

---

## PHÂN CHIA NHIỆM VỤ

### NHÓM 1: TEST GIAO DIỆN (UI) - Tool: Cypress
**Mục tiêu: ~75 Test Cases**

---

### 👤 NGƯỜI 1: Đăng ký & Đăng nhập + Chi tiết sản phẩm
**Mục tiêu: ~30 Test Cases**

#### Chức năng 1: Đăng ký & Đăng nhập
**Test Cases mẫu (5 TC):**

1. **TC_DK_001**: Đăng ký thành công với thông tin hợp lệ
   - Input: Họ tên, email hợp lệ, SĐT hợp lệ, mật khẩu mạnh
   - Expected: Hiển thị thông báo "Đăng ký thành công"

2. **TC_DK_002**: Hiển thị lỗi khi email không đúng định dạng
   - Input: Email = "email-khong-hop-le"
   - Expected: Hiển thị lỗi "Email không đúng định dạng"

3. **TC_DK_003**: Hiển thị lỗi khi mật khẩu quá ngắn (<6 ký tự)
   - Input: Mật khẩu = "12345"
   - Expected: Hiển thị lỗi "Mật khẩu phải có ít nhất 6 ký tự"

4. **TC_DK_004**: Hiển thị lỗi khi mật khẩu xác nhận không khớp
   - Input: Mật khẩu = "Abc123!@", Xác nhận = "Abc123!@#"
   - Expected: Hiển thị lỗi "Mật khẩu xác nhận không khớp"

5. **TC_DK_005**: Hiển thị lỗi khi số điện thoại không hợp lệ
   - Input: SĐT = "123456"
   - Expected: Hiển thị lỗi "Số điện thoại không hợp lệ"

**Gợi ý mở rộng (25 TC thêm):**
- TC_DK_006 đến TC_DK_010: Test các trường hợp email (có khoảng trắng, quá dài, thiếu @, thiếu domain...)
- TC_DK_011 đến TC_DK_015: Test độ mạnh mật khẩu (yếu, trung bình, mạnh, rất mạnh, có ký tự đặc biệt...)
- TC_DK_016 đến TC_DK_020: Test số điện thoại (có khoảng trắng, +84, số không hợp lệ...)
- TC_DK_021 đến TC_DK_025: Test họ tên (quá ngắn, quá dài, có ký tự đặc biệt...)
- TC_DN_001 đến TC_DN_005: Test đăng nhập (thành công, email sai, mật khẩu sai, trống...)

#### Chức năng 2: Chi tiết sản phẩm
**Test Cases mẫu (5 TC):**

1. **TC_CTSP_001**: Hiển thị đầy đủ thông tin sản phẩm
   - Action: Click "Xem chi tiết" từ trang chủ
   - Expected: Hiển thị tên, giá, mô tả, hình ảnh, tồn kho

2. **TC_CTSP_002**: Zoom ảnh sản phẩm khi click
   - Action: Click vào ảnh sản phẩm
   - Expected: Ảnh được phóng to trong modal/lightbox

3. **TC_CTSP_003**: Chọn số lượng sản phẩm hợp lệ
   - Action: Nhập số lượng = 5 (tồn kho = 50)
   - Expected: Cho phép nhập và hiển thị số lượng

4. **TC_CTSP_004**: Không cho phép chọn số lượng > tồn kho
   - Action: Nhập số lượng = 100 (tồn kho = 50)
   - Expected: Giới hạn số lượng tối đa = 50

5. **TC_CTSP_005**: Thêm vào giỏ hàng từ trang chi tiết
   - Action: Chọn số lượng và click "Thêm vào giỏ"
   - Expected: Sản phẩm được thêm vào giỏ hàng, hiển thị thông báo

**Gợi ý mở rộng (25 TC thêm):**
- TC_CTSP_006 đến TC_CTSP_010: Test hiển thị đánh giá, số sao, bình luận
- TC_CTSP_011 đến TC_CTSP_015: Test các nút tăng/giảm số lượng, nút +/- 
- TC_CTSP_016 đến TC_CTSP_020: Test validation số lượng (âm, 0, chữ, ký tự đặc biệt...)
- TC_CTSP_021 đến TC_CTSP_025: Test responsive, hiển thị trên mobile/tablet
- TC_CTSP_026 đến TC_CTSP_030: Test các sản phẩm liên quan, sản phẩm cùng loại

---

### 👤 NGƯỜI 2: Tìm kiếm & Bộ lọc + Quản lý Giỏ hàng UI
**Mục tiêu: ~30 Test Cases**

#### Chức năng 1: Tìm kiếm & Bộ lọc
**Test Cases mẫu (5 TC):**

1. **TC_TK_001**: Tìm kiếm sản phẩm theo tên có dấu
   - Input: "cải"
   - Expected: Hiển thị "Rau cải xanh"

2. **TC_TK_002**: Tìm kiếm sản phẩm theo tên không dấu
   - Input: "cai"
   - Expected: Vẫn tìm thấy "Rau cải xanh" (hỗ trợ không dấu)

3. **TC_TK_003**: Lọc sản phẩm theo loại
   - Action: Chọn "Rau củ" từ dropdown
   - Expected: Chỉ hiển thị sản phẩm loại "rau-cu"

4. **TC_TK_004**: Lọc sản phẩm theo khoảng giá
   - Input: Giá từ 20,000đ đến 30,000đ
   - Expected: Chỉ hiển thị sản phẩm trong khoảng giá này

5. **TC_TK_005**: Sắp xếp sản phẩm theo giá tăng dần
   - Action: Chọn "Giá tăng dần"
   - Expected: Sản phẩm được sắp xếp từ giá thấp đến cao

**Gợi ý mở rộng (25 TC thêm):**
- TC_TK_006 đến TC_TK_010: Test sắp xếp (giá giảm, tên A-Z, tên Z-A, mới nhất...)
- TC_TK_011 đến TC_TK_015: Test kết hợp tìm kiếm + lọc (tên + loại, tên + giá...)
- TC_TK_016 đến TC_TK_020: Test edge cases (tìm không có kết quả, từ khóa rỗng, ký tự đặc biệt...)
- TC_TK_021 đến TC_TK_025: Test responsive tìm kiếm, hiển thị trên mobile
- TC_TK_026 đến TC_TK_030: Test hiệu năng tìm kiếm với nhiều sản phẩm

#### Chức năng 2: Quản lý Giỏ hàng UI
**Test Cases mẫu (5 TC):**

1. **TC_GH_001**: Thêm sản phẩm vào giỏ hàng từ trang chủ
   - Action: Click "Thêm vào giỏ" với số lượng = 2
   - Expected: Giỏ hàng có 1 sản phẩm, số lượng = 2

2. **TC_GH_002**: Cập nhật số lượng sản phẩm trong giỏ hàng
   - Action: Thay đổi số lượng từ 1 thành 5
   - Expected: Tổng tiền được cập nhật

3. **TC_GH_003**: Xóa sản phẩm khỏi giỏ hàng
   - Action: Click nút "Xóa"
   - Expected: Sản phẩm bị xóa, giỏ hàng cập nhật

4. **TC_GH_004**: Hiển thị popup thông báo khi thêm vào giỏ
   - Action: Thêm sản phẩm
   - Expected: Hiển thị alert/toast "Đã thêm vào giỏ hàng"

5. **TC_GH_005**: Áp dụng mã giảm giá hợp lệ
   - Input: Mã "GREEN10"
   - Expected: Giảm giá 10%, tổng tiền được cập nhật

**Gợi ý mở rộng (25 TC thêm):**
- TC_GH_006 đến TC_GH_010: Test các mã giảm giá khác (GREEN20, GREEN50, mã không hợp lệ...)
- TC_GH_011 đến TC_GH_015: Test tính toán tổng tiền (nhiều sản phẩm, thuế VAT, phí ship...)
- TC_GH_016 đến TC_GH_020: Test validation số lượng (âm, 0, chữ, quá tồn kho...)
- TC_GH_021 đến TC_GH_025: Test UI/UX (giỏ hàng trống, scroll, responsive...)
- TC_GH_026 đến TC_GH_030: Test persistence (giữ giỏ hàng khi reload trang)

---

### 👤 NGƯỜI 3: Thanh toán + Lịch sử & Cá nhân
**Mục tiêu: ~30 Test Cases**

#### Chức năng 1: Thanh toán
**Test Cases mẫu (5 TC):**

1. **TC_TT_001**: Hiển thị form thanh toán với thông tin đầy đủ
   - Action: Click "Thanh toán" từ giỏ hàng
   - Expected: Hiển thị form nhập thông tin giao hàng

2. **TC_TT_002**: Validate form - hiển thị lỗi khi thiếu thông tin
   - Action: Submit form trống
   - Expected: Hiển thị lỗi cho các trường bắt buộc

3. **TC_TT_003**: Chọn loại vận chuyển và tính phí ship
   - Action: Chọn "Nhanh" (50,000đ)
   - Expected: Phí vận chuyển = 50,000đ, tổng tiền được cập nhật

4. **TC_TT_004**: Miễn phí ship khi đơn hàng >= 500,000đ
   - Action: Tổng tiền = 600,000đ
   - Expected: Phí vận chuyển = 0đ

5. **TC_TT_005**: Xác nhận thanh toán thành công
   - Action: Điền đầy đủ thông tin và submit
   - Expected: Hiển thị "Đặt hàng thành công", lưu đơn hàng

**Gợi ý mở rộng (25 TC thêm):**
- TC_TT_006 đến TC_TT_010: Test validation từng trường (email, SĐT, địa chỉ...)
- TC_TT_011 đến TC_TT_015: Test các loại vận chuyển (tiết kiệm, chuẩn, nhanh...)
- TC_TT_016 đến TC_TT_020: Test mã giảm giá trong thanh toán (GREEN10, GREEN20, mã sai...)
- TC_TT_021 đến TC_TT_025: Test tính toán tổng tiền (có thuế, có phí ship, có giảm giá...)
- TC_TT_026 đến TC_TT_030: Test edge cases (giỏ hàng trống, mất kết nối, timeout...)

#### Chức năng 2: Lịch sử & Cá nhân
**Test Cases mẫu (5 TC):**

1. **TC_LS_001**: Hiển thị danh sách đơn hàng đã đặt
   - Action: Vào trang "Lịch sử đơn hàng"
   - Expected: Hiển thị danh sách các đơn hàng với thông tin cơ bản

2. **TC_LS_002**: Xem chi tiết đơn hàng
   - Action: Click vào một đơn hàng
   - Expected: Hiển thị chi tiết (sản phẩm, giá, địa chỉ giao hàng...)

3. **TC_LS_003**: Đổi thông tin cá nhân
   - Action: Sửa họ tên, email trong trang "Cá nhân"
   - Expected: Thông tin được cập nhật

4. **TC_LS_004**: Lọc đơn hàng theo trạng thái
   - Action: Chọn "Đã giao"
   - Expected: Chỉ hiển thị đơn hàng đã giao

5. **TC_LS_005**: Hủy đơn hàng (nếu có chức năng)
   - Action: Click "Hủy đơn" cho đơn hàng chưa giao
   - Expected: Đơn hàng được hủy, cập nhật trạng thái

**Gợi ý mở rộng (25 TC thêm):**
- TC_LS_006 đến TC_LS_010: Test sắp xếp đơn hàng (mới nhất, cũ nhất, theo giá...)
- TC_LS_011 đến TC_LS_015: Test tìm kiếm đơn hàng (theo mã đơn, ngày tháng...)
- TC_LS_016 đến TC_LS_020: Test validation thông tin cá nhân (email, SĐT, địa chỉ...)
- TC_LS_021 đến TC_LS_025: Test phân trang đơn hàng (nếu có nhiều đơn)
- TC_LS_026 đến TC_LS_030: Test responsive, hiển thị trên mobile

---

### NHÓM 2: TEST SOURCE (UNIT) - Tool: Jest
**Mục tiêu: ~75 Test Cases**

---

### 👤 NGƯỜI 4: kiem_tra_hop_le.js + ho_tro_tim_kiem.js
**Mục tiêu: ~35 Test Cases**

#### File 1: kiem_tra_hop_le.js
**Test Cases mẫu (5 TC):**

1. **TC_KTHL_001**: kiemTraEmail - Email hợp lệ
   - Input: "test@example.com"
   - Expected: { hopLe: true, thongBao: "Email hợp lệ" }

2. **TC_KTHL_002**: kiemTraEmail - Email không hợp lệ (thiếu @)
   - Input: "testexample.com"
   - Expected: { hopLe: false, thongBao: "Email không đúng định dạng" }

3. **TC_KTHL_003**: kiemTraMatKhau - Mật khẩu yếu
   - Input: "12345"
   - Expected: { hopLe: false, doManh: "yeu" }

4. **TC_KTHL_004**: kiemTraMatKhau - Mật khẩu mạnh
   - Input: "Abc123!@"
   - Expected: { hopLe: true, doManh: "manh" }

5. **TC_KTHL_005**: kiemTraSoDienThoai - SĐT hợp lệ
   - Input: "0912345678"
   - Expected: { hopLe: true }

**Gợi ý mở rộng (20 TC thêm):**
- TC_KTHL_006 đến TC_KTHL_010: Test kiemTraEmail (rỗng, null, quá dài, có khoảng trắng...)
- TC_KTHL_011 đến TC_KTHL_015: Test kiemTraMatKhau (trung bình, rất mạnh, quá dài, quá ngắn...)
- TC_KTHL_016 đến TC_KTHL_020: Test kiemTraSoDienThoai (+84, có khoảng trắng, không hợp lệ...)
- TC_KTHL_021 đến TC_KTHL_025: Test kiemTraTen (quá ngắn, quá dài, rỗng, có khoảng trắng...)

#### File 2: ho_tro_tim_kiem.js
**Test Cases mẫu (5 TC):**

1. **TC_HTTK_001**: timKiemSanPham - Tìm theo tên có dấu
   - Input: danhSachSanPham, "cải"
   - Expected: Trả về sản phẩm "Rau cải xanh"

2. **TC_HTTK_002**: timKiemSanPham - Tìm theo tên không dấu
   - Input: danhSachSanPham, "cai"
   - Expected: Vẫn tìm thấy "Rau cải xanh"

3. **TC_HTTK_003**: sapXepSanPham - Sắp xếp theo giá tăng dần
   - Input: danhSachSanPham, "gia-tang"
   - Expected: Sản phẩm được sắp xếp từ giá thấp đến cao

4. **TC_HTTK_004**: locTheoLoai - Lọc theo loại
   - Input: danhSachSanPham, "rau-cu"
   - Expected: Chỉ trả về sản phẩm loại "rau-cu"

5. **TC_HTTK_005**: locTheoGia - Lọc theo khoảng giá
   - Input: danhSachSanPham, 20000, 30000
   - Expected: Chỉ trả về sản phẩm có giá trong khoảng

**Gợi ý mở rộng (10 TC thêm):**
- TC_HTTK_006 đến TC_HTTK_010: Test chuyenDoiKhongDau (các ký tự đặc biệt, chuỗi rỗng...)
- TC_HTTK_011 đến TC_HTTK_015: Test sapXepSanPham (giá giảm, tên A-Z, tên Z-A, edge cases...)

---

### 👤 NGƯỜI 5: tinh_toan.js + luu_tru.js
**Mục tiêu: ~40 Test Cases**

#### File 1: tinh_toan.js
**Test Cases mẫu (5 TC):**

1. **TC_TT_001**: tinhTongTien - Giỏ hàng rỗng
   - Input: []
   - Expected: { tongTien: 0, tongThanhToan: 0 }

2. **TC_TT_002**: tinhTongTien - Tính tổng với 1 sản phẩm
   - Input: [{ id: 1, gia: 25000, soLuong: 2 }]
   - Expected: { tongTien: 50000, thue: 5000, tongThanhToan: 55000 }

3. **TC_TT_003**: tinhTongTien - Áp dụng mã giảm giá GREEN10
   - Input: gioHang, "GREEN10"
   - Expected: Giảm giá = 10% tổng tiền

4. **TC_TT_004**: tinhPhiVanChuyen - Phí ship chuẩn
   - Input: 100000, "chuan"
   - Expected: 30000

5. **TC_TT_005**: tinhPhiVanChuyen - Miễn phí ship >= 500,000đ
   - Input: 500000, "chuan"
   - Expected: 0

**Gợi ý mở rộng (20 TC thêm):**
- TC_TT_006 đến TC_TT_010: Test tinhTongTien với nhiều sản phẩm, edge cases
- TC_TT_011 đến TC_TT_015: Test các mã giảm giá (GREEN20, GREEN50, mã không hợp lệ...)
- TC_TT_016 đến TC_TT_020: Test tinhPhiVanChuyen (nhanh, tiết kiệm, edge cases...)
- TC_TT_021 đến TC_TT_025: Test dinhDangTien (số lớn, số nhỏ, NaN, null...)

#### File 2: luu_tru.js
**Test Cases mẫu (5 TC):**

1. **TC_LT_001**: luuGioHang - Lưu giỏ hàng thành công
   - Input: [{ id: 1, ten: "Test", gia: 10000, soLuong: 1 }]
   - Expected: localStorage có dữ liệu, docGioHang() trả về đúng

2. **TC_LT_002**: docGioHang - Đọc giỏ hàng khi chưa có
   - Input: Không có dữ liệu trong localStorage
   - Expected: Trả về mảng rỗng []

3. **TC_LT_003**: luuNguoiDung - Lưu thông tin người dùng
   - Input: { hoTen: "Test", email: "test@example.com" }
   - Expected: localStorage có dữ liệu

4. **TC_LT_004**: luuDonHang - Lưu đơn hàng với ID và thời gian
   - Input: { gioHang: [], tongThanhToan: 10000 }
   - Expected: Đơn hàng có id và thoiGian tự động

5. **TC_LT_005**: dinhDangTien - Format số tiền
   - Input: 25000
   - Expected: "25.000 đ"

**Gợi ý mở rộng (15 TC thêm):**
- TC_LT_006 đến TC_LT_010: Test xoaGioHang, xoaNguoiDung, edge cases
- TC_LT_011 đến TC_LT_015: Test docDanhSachDonHang, lưu nhiều đơn hàng
- TC_LT_016 đến TC_LT_020: Test error handling (localStorage đầy, JSON invalid...)

---

## TỔNG KẾT

| Người | Chức năng | Số TC mẫu | Số TC mục tiêu |
|-------|-----------|-----------|----------------|
| Người 1 | Đăng ký/Đăng nhập + Chi tiết SP | 10 | ~30 |
| Người 2 | Tìm kiếm/Lọc + Giỏ hàng UI | 10 | ~30 |
| Người 3 | Thanh toán + Lịch sử | 10 | ~30 |
| Người 4 | kiem_tra_hop_le + ho_tro_tim_kiem | 10 | ~35 |
| Người 5 | tinh_toan + luu_tru | 10 | ~25 |
| **TỔNG** | | **50** | **~150** |

---

## HƯỚNG DẪN CHẠY TEST

### Unit Test (Jest)
```bash
# Cài đặt dependencies
npm install

# Chạy tất cả test
npm test

# Chạy test với coverage
npm run test:coverage

# Chạy test ở chế độ watch
npm run test:watch
```

### E2E Test (Cypress)
```bash
# Mở Cypress GUI
npm run cypress:open

# Chạy test headless
npm run cypress:run
```

**Lưu ý**: Đảm bảo server dev đang chạy (`npm run dev`) trước khi chạy Cypress test.

---

## QUY TẮC ĐẶT TÊN TEST CASE

- **Format**: `TC_[MÃ_CHỨC_NĂNG]_[SỐ_THỨ_TỰ]`
- **Ví dụ**: `TC_DK_001`, `TC_TK_002`, `TC_TT_003`
- **Mã chức năng**:
  - DK: Đăng ký
  - DN: Đăng nhập
  - CTSP: Chi tiết sản phẩm
  - TK: Tìm kiếm
  - GH: Giỏ hàng
  - TT: Thanh toán
  - LS: Lịch sử
  - KTHL: Kiểm tra hợp lệ
  - HTTK: Hỗ trợ tìm kiếm
  - LT: Lưu trữ

---

## GHI CHÚ QUAN TRỌNG

1. **Tất cả tên file, biến, hàm phải bằng tiếng Việt không dấu**
2. **Bắt buộc thêm `data-testid` trong JSX để dễ test**
3. **Mỗi test case phải có mô tả rõ ràng: Input, Action, Expected**
4. **Test phải độc lập, không phụ thuộc vào nhau**
5. **Coverage mục tiêu: >= 80% cho các file trong `src/tien_ich/`**

---

## DEADLINE & TIẾN ĐỘ

- **Tuần 1**: Setup môi trường, viết 25 TC mẫu
- **Tuần 2-3**: Viết đủ 150 TC, chạy test và fix bug
- **Tuần 4**: Review, tối ưu, báo cáo

---

**Chúc nhóm làm việc hiệu quả! 🚀**

