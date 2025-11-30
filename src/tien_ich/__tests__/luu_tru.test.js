import { formatTienTe, luuGioHang, layGioHang, xoaGioHang, formatNgay, checkToken, luuUser, xoaUser, taoMaDon } from '../luu_tru'

/**
 * TEST SUITE: Lưu trữ và Định dạng
 * Người thực hiện: User 5
 * Mục đích: Đảm bảo việc lưu/đọc dữ liệu LocalStorage và các hàm định dạng hiển thị đúng.
 */
describe('User 5 - Unit Tests - luu_tru.js', () => {
    // Reset LocalStorage trước mỗi bài test để đảm bảo môi trường sạch
    beforeEach(() => {
        localStorage.clear()
    })

    // --- 1. FORMAT TIỀN TỆ ---
    // Mục đích: Kiểm tra hiển thị số tiền theo chuẩn Việt Nam (có dấu chấm phân cách).
    test('TC_LT_001: formatTienTe - 10000', () => {
        // Input: 10000
        // Expected: "10.000 đ" (Lưu ý: có thể có ký tự space đặc biệt tùy môi trường Node)
        const result = formatTienTe(10000)
        expect(result.replace(/\u00a0/g, ' ')).toBe('10.000 đ')
    })

    test('TC_LT_002: formatTienTe - 1000000', () => {
        // Input: 1 triệu
        // Expected: "1.000.000 đ"
        const result = formatTienTe(1000000)
        expect(result.replace(/\u00a0/g, ' ')).toBe('1.000.000 đ')
    })

    test('TC_LT_003: formatTienTe - 0', () => {
        // Input: 0
        // Expected: "0 đ"
        const result = formatTienTe(0)
        expect(result.replace(/\u00a0/g, ' ')).toBe('0 đ')
    })

    test('TC_LT_004: formatTienTe - null/undefined', () => {
        // Input: Giá trị không hợp lệ
        // Expected: "0 đ" (Xử lý lỗi an toàn)
        expect(formatTienTe(null).replace(/\u00a0/g, ' ')).toBe('0 đ')
        expect(formatTienTe(undefined).replace(/\u00a0/g, ' ')).toBe('0 đ')
    })

    // --- 2. QUẢN LÝ GIỎ HÀNG (LOCALSTORAGE) ---
    // Mục đích: Kiểm tra việc lưu và đọc dữ liệu giỏ hàng từ trình duyệt.
    test('TC_LT_005: luuGioHang - Array data', () => {
        // Input: Mảng giỏ hàng hợp lệ
        const data = [{ id: 1, soLuong: 1 }]
        // Expected: Lưu thành công (return true) và dữ liệu tồn tại trong localStorage
        expect(luuGioHang(data)).toBe(true)
        expect(localStorage.getItem('greenmart_gio_hang')).toBeTruthy()
    })

    test('TC_LT_006: layGioHang - Có data', () => {
        // Input: Giả lập dữ liệu đã có trong localStorage
        const data = [{ id: 1, soLuong: 1 }]
        localStorage.setItem('greenmart_gio_hang', JSON.stringify(data))
        // Expected: Đọc ra đúng dữ liệu đó
        expect(layGioHang()).toEqual(data)
    })

    test('TC_LT_007: layGioHang - Không data', () => {
        // Input: localStorage rỗng
        // Expected: Trả về mảng rỗng []
        expect(layGioHang()).toEqual([])
    })

    test('TC_LT_008: layGioHang - Data lỗi JSON', () => {
        // Input: Dữ liệu bị lỗi cú pháp JSON
        localStorage.setItem('greenmart_gio_hang', 'invalid json')
        // Mock console.error để không hiện lỗi đỏ khi chạy test
        const spy = jest.spyOn(console, 'error').mockImplementation(() => { })
        // Expected: Trả về mảng rỗng [] (không crash app)
        expect(layGioHang()).toEqual([])
        spy.mockRestore()
    })

    test('TC_LT_009: xoaGioHang - Gọi hàm', () => {
        // Input: Đang có dữ liệu
        localStorage.setItem('greenmart_gio_hang', '[]')
        // Action: Xóa
        expect(xoaGioHang()).toBe(true)
        // Expected: Dữ liệu trong localStorage bị null
        expect(localStorage.getItem('greenmart_gio_hang')).toBeNull()
    })

    // --- 3. TIỆN ÍCH KHÁC ---
    test('TC_LT_010: formatNgay - "2023-01-01"', () => {
        // Mục đích: Chuyển đổi ngày ISO sang định dạng Việt Nam
        // Input: "2023-01-01"
        // Expected: "01/01/2023"
        expect(formatNgay('2023-01-01')).toBe('01/01/2023')
    })

    test('TC_LT_011: checkToken - Có token (user)', () => {
        // Mục đích: Kiểm tra trạng thái đăng nhập
        // Input: Có thông tin user trong localStorage
        localStorage.setItem('greenmart_nguoi_dung', JSON.stringify({ name: 'Test' }))
        // Expected: true
        expect(checkToken()).toBe(true)
    })

    test('TC_LT_012: checkToken - Không token', () => {
        // Input: Không có thông tin user
        // Expected: false
        expect(checkToken()).toBe(false)
    })

    test('TC_LT_013: luuUser - Obj User', () => {
        // Mục đích: Lưu thông tin đăng nhập
        const user = { name: 'Test' }
        expect(luuUser(user)).toBe(true)
        expect(localStorage.getItem('greenmart_nguoi_dung')).toBeTruthy()
    })

    test('TC_LT_014: xoaUser - Logout', () => {
        // Mục đích: Đăng xuất (xóa thông tin)
        localStorage.setItem('greenmart_nguoi_dung', '{}')
        expect(xoaUser()).toBe(true)
        expect(localStorage.getItem('greenmart_nguoi_dung')).toBeNull()
    })

    test('TC_LT_015: taoMaDon - (Call)', () => {
        // Mục đích: Tạo mã đơn hàng ngẫu nhiên duy nhất
        const ma1 = taoMaDon()
        const ma2 = taoMaDon()
        // Expected: Bắt đầu bằng DH và theo sau là 6 số
        expect(ma1).toMatch(/^DH\d{6}$/)
        // Expected: 2 lần gọi tạo ra 2 mã khác nhau
        expect(ma1).not.toBe(ma2)
    })
})
