# GreenMart - Website Bán Hàng Thực Phẩm Xanh

Dự án website bán hàng thực phẩm xanh được xây dựng bằng ReactJS với Vite.

## 🚀 Cài đặt và Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy server development
```bash
npm run dev
```
Server sẽ chạy tại `http://localhost:3000`

### 3. Build cho production
```bash
npm run build
```

### 4. Preview build
```bash
npm run preview
```

## 🧪 Testing

### Unit Test (Jest)
```bash
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

## 📁 Cấu trúc Thư mục

```
src/
├── trang/              # Các trang giao diện
│   ├── TrangChu.jsx
│   ├── GioHang.jsx
│   ├── ThanhToan.jsx
│   ├── DangNhap.jsx
│   └── DangKy.jsx
├── thanh_phan/         # Component nhỏ
│   ├── TheSanPham.jsx
│   └── NutBam.jsx
├── du_lieu/            # Dữ liệu JSON
│   └── danh_sach_san_pham.json
└── tien_ich/          # Logic để test Unit
    ├── tinh_toan.js
    ├── kiem_tra_hop_le.js
    ├── ho_tro_tim_kiem.js
    ├── luu_tru.js
    └── __tests__/      # Unit tests
```

## 📝 Quy tắc Đặt tên

**QUAN TRỌNG**: Tất cả tên file, biến, hàm phải đặt bằng **TIẾNG VIỆT KHÔNG DẤU**.

Ví dụ:
- ✅ `tinh_toan.js` thay vì `calculator.js`
- ✅ `tinhTongTien()` thay vì `calculateTotal()`
- ✅ `danh_sach_san_pham.json` thay vì `products.json`

## 🎯 Test Plan

Xem file [KE_HOACH_TEST.md](./KE_HOACH_TEST.md) để biết chi tiết về kế hoạch kiểm thử và phân chia test case cho 5 người.

## 🛠️ Công nghệ sử dụng

- **Frontend**: ReactJS 18
- **Build Tool**: Vite
- **Unit Test**: Jest
- **E2E Test**: Cypress
- **Language**: JavaScript (ES6+)

## 📋 Chức năng chính

1. **Trang chủ**: Hiển thị danh sách sản phẩm, tìm kiếm, lọc, sắp xếp
2. **Giỏ hàng**: Thêm, sửa, xóa sản phẩm, áp dụng mã giảm giá
3. **Thanh toán**: Form nhập thông tin giao hàng, tính phí ship, thuế VAT
4. **Đăng ký/Đăng nhập**: Validate form, kiểm tra độ mạnh mật khẩu
5. **Lưu trữ**: LocalStorage để lưu giỏ hàng, thông tin người dùng, đơn hàng

## 🔍 Test Coverage

Mục tiêu coverage: **>= 80%** cho các file trong `src/tien_ich/`

## 📞 Liên hệ

Nếu có thắc mắc, vui lòng liên hệ Tech Lead hoặc QA Lead.

---

**Chúc bạn code vui vẻ! 🎉**

