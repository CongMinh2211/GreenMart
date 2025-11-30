import { timKiemSanPham, sapXepSanPham, locTheoLoai, taoSlug, highlight, phantrang } from '../ho_tro_tim_kiem'

/**
 * TEST SUITE: Hỗ trợ tìm kiếm và hiển thị
 * Người thực hiện: User 4
 * Mục đích: Đảm bảo các chức năng tìm kiếm, sắp xếp, lọc và hiển thị hoạt động đúng.
 */
describe('User 4 - Unit Tests - ho_tro_tim_kiem.js', () => {

    // --- 1. TÌM KIẾM SẢN PHẨM ---
    // Mục đích: Kiểm tra khả năng tìm kiếm theo tên (có dấu/không dấu, hoa/thường).
    test('TC_HTTK_001: timSanPham - Data 10 món, key="Táo"', () => {
        // Input: Danh sách có "Táo Mỹ", từ khóa "Táo"
        const data = [{ ten: 'Táo Mỹ' }, { ten: 'Cam' }]
        // Expected: Tìm thấy 1 kết quả là "Táo Mỹ"
        expect(timKiemSanPham(data, 'Táo').length).toBe(1)
        expect(timKiemSanPham(data, 'Táo')[0].ten).toBe('Táo Mỹ')
    })

    test('TC_HTTK_002: timSanPham - key="XYZ" (Ko có)', () => {
        // Input: Từ khóa không tồn tại trong danh sách
        const data = [{ ten: 'Táo Mỹ' }]
        // Expected: Không tìm thấy kết quả nào (mảng rỗng)
        expect(timKiemSanPham(data, 'XYZ').length).toBe(0)
    })

    test('TC_HTTK_003: timSanPham - key="táo" (thường)', () => {
        // Input: Từ khóa chữ thường "táo" tìm "Táo Mỹ"
        const data = [{ ten: 'Táo Mỹ' }]
        // Expected: Tìm thấy (không phân biệt hoa thường)
        expect(timKiemSanPham(data, 'táo').length).toBe(1)
    })

    test('TC_HTTK_004: timSanPham - key="" (rỗng)', () => {
        // Input: Từ khóa rỗng
        const data = [{ ten: 'Táo Mỹ' }, { ten: 'Cam' }]
        // Expected: Trả về toàn bộ danh sách
        expect(timKiemSanPham(data, '').length).toBe(2)
    })

    test('TC_HTTK_005: timSanPham - Data null', () => {
        // Input: Danh sách sản phẩm là null
        // Expected: Trả về mảng rỗng (xử lý lỗi)
        expect(timKiemSanPham(null, 'Táo')).toEqual([])
    })

    // --- 2. SẮP XẾP SẢN PHẨM ---
    // Mục đích: Kiểm tra thuật toán sắp xếp theo giá và tên.
    test('TC_HTTK_006: sapXepGia - [5, 1, 10], "asc"', () => {
        // Input: Giá lộn xộn, sắp xếp tăng dần
        const data = [{ gia: 5 }, { gia: 1 }, { gia: 10 }]
        const sorted = sapXepSanPham(data, 'gia-tang')
        // Expected: 1 -> 5 -> 10
        expect(sorted[0].gia).toBe(1)
        expect(sorted[1].gia).toBe(5)
        expect(sorted[2].gia).toBe(10)
    })

    test('TC_HTTK_007: sapXepGia - [5, 1, 10], "desc"', () => {
        // Input: Giá lộn xộn, sắp xếp giảm dần
        const data = [{ gia: 5 }, { gia: 1 }, { gia: 10 }]
        const sorted = sapXepSanPham(data, 'gia-giam')
        // Expected: 10 -> 5 -> 1
        expect(sorted[0].gia).toBe(10)
        expect(sorted[1].gia).toBe(5)
        expect(sorted[2].gia).toBe(1)
    })

    test('TC_HTTK_008: sapXepGia - Giá bằng nhau', () => {
        // Input: 2 sản phẩm cùng giá
        const data = [{ id: 1, gia: 5 }, { id: 2, gia: 5 }]
        const sorted = sapXepSanPham(data, 'gia-tang')
        // Expected: Giữ nguyên số lượng, thứ tự không quan trọng
        expect(sorted.length).toBe(2)
    })

    // --- 3. LỌC THEO LOẠI ---
    // Mục đích: Kiểm tra chức năng lọc danh sách theo danh mục.
    test('TC_HTTK_009: locTheoLoai - Type="fruit"', () => {
        // Input: 1 fruit, 1 veg. Lọc "fruit"
        const data = [{ loai: 'fruit' }, { loai: 'veg' }]
        // Expected: Chỉ còn 1 item loại fruit
        expect(locTheoLoai(data, 'fruit').length).toBe(1)
    })

    test('TC_HTTK_010: locTheoLoai - Type="all"', () => {
        // Input: Lọc "tat-ca"
        const data = [{ loai: 'fruit' }, { loai: 'veg' }]
        // Expected: Trả về đủ 2 item
        expect(locTheoLoai(data, 'tat-ca').length).toBe(2)
    })

    // --- 4. TẠO SLUG (URL FRIENDLY) ---
    // Mục đích: Chuyển tên sản phẩm thành chuỗi dùng cho URL.
    test('TC_HTTK_011: taoSlug - "Táo Mỹ"', () => {
        // Input: "Táo Mỹ"
        // Expected: "tao-my" (bỏ dấu, thường, nối bằng gạch ngang)
        expect(taoSlug('Táo Mỹ')).toBe('tao-my')
    })

    test('TC_HTTK_012: taoSlug - "Rau & Củ"', () => {
        // Input: "Rau & Củ" (chứa ký tự đặc biệt)
        // Expected: "rau-cu" (bỏ &, thay khoảng trắng bằng -)
        expect(taoSlug('Rau & Củ')).toBe('rau-cu')
    })

    // --- 5. HIGHLIGHT TỪ KHÓA ---
    // Mục đích: Bôi đậm từ khóa tìm thấy trong tên sản phẩm.
    test('TC_HTTK_013: highlight - "Táo Mỹ", key="Táo"', () => {
        // Input: Tên "Táo Mỹ", từ khóa "Táo"
        // Expected: "<b>Táo</b> Mỹ"
        expect(highlight('Táo Mỹ', 'Táo')).toBe('<b>Táo</b> Mỹ')
    })

    // --- 6. PHÂN TRANG ---
    // Mục đích: Cắt danh sách lớn thành các trang nhỏ.
    test('TC_HTTK_014: phantrang - Page 1, limit 10', () => {
        // Input: 20 item, lấy trang 1, mỗi trang 10
        const list = Array.from({ length: 20 }, (_, i) => i)
        const page1 = phantrang(list, 1, 10)
        // Expected: Lấy được 10 item đầu tiên (0-9)
        expect(page1.length).toBe(10)
        expect(page1[0]).toBe(0)
        expect(page1[9]).toBe(9)
    })

    test('TC_HTTK_015: phantrang - Page 3 (quá data)', () => {
        // Input: 20 item, lấy trang 3 (items 21-30)
        const list = Array.from({ length: 20 }, (_, i) => i)
        const page3 = phantrang(list, 3, 10)
        // Expected: Mảng rỗng vì không có dữ liệu trang 3
        expect(page3).toEqual([])
    })
})
