# HƯỚNG DẪN CÀI ĐẶT DỰ ÁN GREENMART

## Bước 1: Cài đặt Node.js
Đảm bảo bạn đã cài đặt Node.js phiên bản 16 trở lên.
Kiểm tra: `node --version`

## Bước 2: Cài đặt dependencies
```bash
npm install
```

Lệnh này sẽ cài đặt tất cả các thư viện cần thiết:
- React, React-DOM
- Vite
- Jest và các plugin liên quan
- Cypress

## Bước 3: Chạy server development
```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

## Bước 4: Chạy Unit Test
```bash
# Chạy tất cả test
npm test

# Chạy test với coverage report
npm run test:coverage

# Chạy test ở chế độ watch (tự động chạy lại khi code thay đổi)
npm run test:watch
```

## Bước 5: Chạy E2E Test với Cypress

### Cách 1: Mở Cypress GUI (Khuyến nghị cho người mới)
```bash
# Đảm bảo server dev đang chạy ở terminal khác
npm run dev

# Mở Cypress GUI ở terminal mới
npm run cypress:open
```

Sau đó chọn test file muốn chạy trong Cypress GUI.

### Cách 2: Chạy headless (cho CI/CD)
```bash
# Đảm bảo server dev đang chạy
npm run dev

# Chạy tất cả Cypress test ở chế độ headless
npm run cypress:run
```

## Cấu trúc Test Files

### Unit Tests (Jest)
- `src/tien_ich/__tests__/tinh_toan.test.js` - Test các hàm tính toán
- `src/tien_ich/__tests__/kiem_tra_hop_le.test.js` - Test validation
- `src/tien_ich/__tests__/ho_tro_tim_kiem.test.js` - Test tìm kiếm và sắp xếp
- `src/tien_ich/__tests__/luu_tru.test.js` - Test localStorage

### E2E Tests (Cypress)
- `cypress/e2e/dang-ky-dang-nhap.cy.js` - Test đăng ký và đăng nhập
- `cypress/e2e/gio-hang.cy.js` - Test giỏ hàng
- `cypress/e2e/tim-kiem-loc.cy.js` - Test tìm kiếm và lọc

## Troubleshooting

### Lỗi: "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Port 3000 already in use"
Thay đổi port trong `vite.config.js`:
```js
server: {
  port: 3001, // Đổi sang port khác
}
```

### Lỗi Cypress: "Cannot connect to localhost:3000"
Đảm bảo server dev đang chạy trước khi chạy Cypress test.

### Lỗi Jest: "SyntaxError: Unexpected token"
Kiểm tra file `babel.config.js` đã được tạo đúng chưa.

## Lệnh Build Production

```bash
# Build project
npm run build

# Preview build
npm run preview
```

## Kiểm tra Code Quality

Sau khi cài đặt, chạy test để đảm bảo mọi thứ hoạt động:

```bash
# Chạy tất cả test
npm test

# Kiểm tra coverage
npm run test:coverage
```

Mục tiêu coverage: **>= 80%** cho các file trong `src/tien_ich/`

