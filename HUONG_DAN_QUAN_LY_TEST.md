# HƯỚNG DẪN SỬ DỤNG QUẢN LÝ TEST CASES

## Tính năng

Trang **Quản lý Test** cho phép bạn:
1. Xem danh sách tất cả test cases (50 test cases mẫu)
2. Đánh dấu trạng thái test (Pass/Fail/Skip/Chưa Test)
3. Thêm ghi chú cho mỗi test case
4. Lọc và tìm kiếm test cases
5. **Xuất báo cáo Excel** với format đẹp

## Cách sử dụng

### 1. Truy cập trang Quản lý Test

- Click nút **"📊 Quản Lý Test"** trên thanh điều hướng
- Hoặc vào trực tiếp: `http://localhost:3000` và click nút

### 2. Đánh dấu trạng thái test

- Mỗi test case có dropdown **"Trạng thái"** với 4 lựa chọn:
  - **Chưa Test**: Màu xám (mặc định)
  - **Pass**: Màu xanh lá
  - **Fail**: Màu đỏ
  - **Skip**: Màu vàng

- Trạng thái được lưu tự động vào LocalStorage

### 3. Thêm ghi chú

- Mỗi test case có ô **"Ghi chú"** để bạn ghi lại:
  - Lỗi gặp phải (nếu Fail)
  - Lý do Skip
  - Các thông tin bổ sung

### 4. Lọc và tìm kiếm

- **Tìm kiếm**: Nhập từ khóa để tìm theo mã, tên, hoặc mô tả
- **Lọc theo người**: Chọn người test cụ thể
- **Lọc theo trạng thái**: Chỉ xem Pass/Fail/Skip/Chưa Test
- **Lọc theo chức năng**: Lọc theo chức năng cụ thể

### 5. Xuất Excel

- Click nút **"📊 Xuất Excel"** ở góc phải trên
- File Excel sẽ được tải xuống với tên: `Bao_Cao_Test_Case_GreenMart_YYYYMMDD.xlsx`

## Cấu trúc file Excel

File Excel gồm 2 sheet:

### Sheet 1: Test Cases
- **STT**: Số thứ tự
- **Mã Test Case**: ID của test case (VD: TC_DK_001)
- **Tên Test Case**: Tên mô tả test case
- **Người Test**: Người được phân công
- **Chức năng**: Chức năng được test
- **Loại Test**: UI hoặc UNIT
- **Mô tả**: Mô tả chi tiết
- **Input**: Dữ liệu đầu vào
- **Expected**: Kết quả mong đợi
- **Trạng thái**: PASS/FAIL/SKIP/CHƯA TEST (có màu sắc)
- **Ghi chú**: Ghi chú của tester

### Sheet 2: Tổng kết
- Tổng số Test Case
- Số lượng Pass/Fail/Skip/Chưa Test
- Tỷ lệ Pass (%)

## Format Excel

- **Header**: Nền xanh đậm (#2d5016), chữ trắng, in đậm
- **Trạng thái Pass**: Nền xanh nhạt, chữ xanh đậm
- **Trạng thái Fail**: Nền đỏ nhạt, chữ đỏ đậm
- **Trạng thái Skip**: Nền vàng nhạt, chữ cam đậm
- **Border**: Tất cả các ô đều có border
- **Auto-width**: Cột tự động điều chỉnh độ rộng

## Lưu ý

1. **Cài đặt xlsx**: Nếu gặp lỗi khi xuất Excel, chạy:
   ```bash
   npm install xlsx
   ```

2. **Dữ liệu tự động lưu**: Tất cả thay đổi (trạng thái, ghi chú) được lưu tự động vào LocalStorage

3. **Xuất theo bộ lọc**: File Excel chỉ xuất các test case đang được hiển thị (sau khi lọc)

4. **Tên file**: File Excel có tên kèm ngày xuất để dễ quản lý

## Ví dụ sử dụng

1. **Test một chức năng**:
   - Lọc theo "Người 1" và "Đăng ký & Đăng nhập"
   - Test từng case, đánh dấu Pass/Fail
   - Thêm ghi chú nếu có lỗi
   - Xuất Excel để báo cáo

2. **Báo cáo tổng kết**:
   - Xem thống kê ở đầu trang
   - Xuất Excel để gửi cho team lead
   - File Excel có đầy đủ thông tin và format đẹp

## Troubleshooting

- **Lỗi "Cannot find module 'xlsx'"**: Chạy `npm install xlsx`
- **Excel không có màu sắc**: Một số phần mềm đọc Excel có thể không hiển thị màu, nhưng dữ liệu vẫn đầy đủ
- **Dữ liệu bị mất**: Kiểm tra LocalStorage trong DevTools (F12)

---

**Chúc bạn test vui vẻ! 🚀**

