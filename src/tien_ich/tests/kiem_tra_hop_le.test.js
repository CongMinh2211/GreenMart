import { kiemTraEmail, kiemTraSoDienThoai, kiemTraMatKhau, kiemTraTrong, validateForm } from '../kiem_tra_hop_le'

/**
 * TEST SUITE: Kiểm tra hợp lệ (Validation)
 * Người thực hiện: User 4
 * Mục đích: Đảm bảo các hàm kiểm tra dữ liệu đầu vào hoạt động chính xác theo quy định.
 */
describe('User 4 - Unit Tests - kiem_tra_hop_le.js', () => {

  // --- 1. KIỂM TRA EMAIL ---
  // Mục đích: Xác nhận hàm chỉ chấp nhận email đúng định dạng chuẩn.
  test('TC_KTHL_001: kiemTraEmail - test@gmail.com', () => {
    // Input: Email hợp lệ
    // Expected: hopLe = true
    expect(kiemTraEmail('test@gmail.com').hopLe).toBe(true)
  })

  test('TC_KTHL_002: kiemTraEmail - https://www.google.com/search?q=testgmail.com', () => {
    // Input: Đường dẫn URL (không phải email)
    // Expected: hopLe = false
    expect(kiemTraEmail('https://www.google.com/search?q=testgmail.com').hopLe).toBe(false)
  })

  test('TC_KTHL_003: kiemTraEmail - test@', () => {
    // Input: Thiếu phần domain sau @
    // Expected: hopLe = false
    expect(kiemTraEmail('test@').hopLe).toBe(false)
  })

  test('TC_KTHL_004: kiemTraEmail - "" (Rỗng)', () => {
    // Input: Chuỗi rỗng
    // Expected: hopLe = false
    expect(kiemTraEmail('').hopLe).toBe(false)
  })

  test('TC_KTHL_005: kiemTraEmail - test@.com', () => {
    // Input: Tên domain bị thiếu ngay sau @
    // Expected: hopLe = false
    expect(kiemTraEmail('test@.com').hopLe).toBe(false)
  })

  // --- 2. KIỂM TRA SỐ ĐIỆN THOẠI ---
  // Mục đích: Đảm bảo SĐT phải là số Việt Nam hợp lệ (10 số, đầu 03, 05, 07, 08, 09).
  test('TC_KTHL_006: kiemTraSDT - 0912345678', () => {
    // Input: SĐT hợp lệ 10 số
    // Expected: hopLe = true
    expect(kiemTraSoDienThoai('0912345678').hopLe).toBe(true)
  })

  test('TC_KTHL_007: kiemTraSDT - 091234567 (9 số)', () => {
    // Input: Thiếu 1 số (chỉ có 9 số)
    // Expected: hopLe = false
    expect(kiemTraSoDienThoai('091234567').hopLe).toBe(false)
  })

  test('TC_KTHL_008: kiemTraSDT - 11 số', () => {
    // Input: Thừa số (11 số) - Quy định mới thường chỉ dùng 10 số
    // Expected: hopLe = false
    expect(kiemTraSoDienThoai('09123456789').hopLe).toBe(false)
  })

  test('TC_KTHL_009: kiemTraSDT - abcdefghij', () => {
    // Input: Chứa chữ cái thay vì số
    // Expected: hopLe = false
    expect(kiemTraSoDienThoai('abcdefghij').hopLe).toBe(false)
  })

  // --- 3. KIỂM TRA MẬT KHẨU ---
  // Mục đích: Đảm bảo mật khẩu đủ độ dài tối thiểu để bảo mật.
  test('TC_KTHL_010: kiemTraPass - 123456 (>=6)', () => {
    // Input: Mật khẩu 6 ký tự (đạt tối thiểu)
    // Expected: hopLe = true
    expect(kiemTraMatKhau('123456').hopLe).toBe(true)
  })

  test('TC_KTHL_011: kiemTraPass - 123', () => {
    // Input: Mật khẩu 3 ký tự (quá ngắn)
    // Expected: hopLe = false
    expect(kiemTraMatKhau('123').hopLe).toBe(false)
  })

  // --- 4. KIỂM TRA TRỐNG (NULL/UNDEFINED/EMPTY) ---
  // Mục đích: Kiểm tra các trường bắt buộc nhập có bị bỏ trống không.
  test('TC_KTHL_012: kiemTraTrong - ""', () => {
    // Input: Chuỗi rỗng
    // Expected: true (Là trống)
    expect(kiemTraTrong('')).toBe(true)
  })

  test('TC_KTHL_013: kiemTraTrong - " " (space)', () => {
    // Input: Chuỗi chỉ chứa khoảng trắng
    // Expected: true (Là trống - sau khi trim)
    expect(kiemTraTrong(' ')).toBe(true)
  })

  test('TC_KTHL_014: kiemTraTrong - "abc"', () => {
    // Input: Chuỗi có nội dung
    // Expected: false (Không trống)
    expect(kiemTraTrong('abc')).toBe(false)
  })

  // --- 5. VALIDATE FORM TỔNG HỢP ---
  // Mục đích: Kiểm tra tích hợp nhiều trường dữ liệu cùng lúc.
  test('TC_KTHL_015: validateForm - Obj hợp lệ', () => {
    // Input: Object chứa đầy đủ thông tin hợp lệ
    const data = { email: 'test@gmail.com', matKhau: '123456', soDienThoai: '0912345678' }
    const result = validateForm(data)
    // Expected: isValid = true
    expect(result.isValid).toBe(true)
  })
})
