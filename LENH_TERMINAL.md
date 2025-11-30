# CÁC LỆNH TERMINAL CẦN THIẾT

## 1. Cài đặt Dependencies
```bash
npm install
```

## 2. Chạy Server Development
```bash
npm run dev
```
Server sẽ mở tại: http://localhost:3000

## 3. Chạy Unit Test (Jest)
```bash
# Chạy tất cả test một lần
npm test

# Chạy test với coverage report
npm run test:coverage

# Chạy test ở chế độ watch (tự động chạy lại khi code thay đổi)
npm run test:watch
```

## 4. Chạy E2E Test (Cypress)

### Bước 1: Mở server dev (terminal 1)
```bash
npm run dev
```

### Bước 2: Mở Cypress GUI (terminal 2)
```bash
npm run cypress:open
```

### Hoặc chạy headless (terminal 2)
```bash
npm run cypress:run
```

## 5. Build Production
```bash
# Build project
npm run build

# Preview build
npm run preview
```

## 6. Xóa và Cài lại (nếu gặp lỗi)
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài lại
npm install
```

## 7. Kiểm tra Version
```bash
# Kiểm tra Node.js version
node --version

# Kiểm tra npm version
npm --version
```

## LƯU Ý QUAN TRỌNG

1. **Luôn chạy `npm run dev` trước khi chạy Cypress test**
2. **Đảm bảo Node.js >= 16**
3. **Nếu gặp lỗi, thử xóa node_modules và cài lại**

