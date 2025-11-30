import { tinhTongTien, tinhGiamGia, tinhThueVAT, tinhPhiVanChuyen, congDonGio } from '../tinh_toan'

/**
 * TEST SUITE: Tính toán và Giỏ hàng
 * Người thực hiện: User 5
 * Mục đích: Đảm bảo các phép tính tiền, thuế, phí ship và thao tác giỏ hàng chính xác.
 */
describe('User 5 - Unit Tests - tinh_toan.js', () => {

  // --- 1. TÍNH TỔNG TIỀN ---
  // Mục đích: Kiểm tra tính tổng tiền hàng dựa trên số lượng và đơn giá.
  test('TC_TTOAN_001: tinhTongTien - Giỏ rỗng []', () => {
    // Input: Giỏ hàng rỗng
    // Expected: Tổng tiền = 0
    expect(tinhTongTien([]).tongTien).toBe(0)
  })

  test('TC_TTOAN_002: tinhTongTien - 1 món (10k, sl 1)', () => {
    // Input: 1 sản phẩm giá 10k, số lượng 1
    const gioHang = [{ id: 1, gia: 10000, soLuong: 1 }]
    // Expected: Tổng tiền = 10k
    expect(tinhTongTien(gioHang).tongTien).toBe(10000)
  })

  test('TC_TTOAN_003: tinhTongTien - 1 món (10k, sl 2)', () => {
    // Input: 1 sản phẩm giá 10k, số lượng 2
    const gioHang = [{ id: 1, gia: 10000, soLuong: 2 }]
    // Expected: Tổng tiền = 20k
    expect(tinhTongTien(gioHang).tongTien).toBe(20000)
  })

  test('TC_TTOAN_004: tinhTongTien - 2 món khác nhau', () => {
    // Input: 2 sản phẩm khác nhau (10k + 20k)
    const gioHang = [
      { id: 1, gia: 10000, soLuong: 1 },
      { id: 2, gia: 20000, soLuong: 1 }
    ]
    // Expected: Tổng tiền = 30k
    expect(tinhTongTien(gioHang).tongTien).toBe(30000)
  })

  test('TC_TTOAN_005: tinhTongTien - Số lượng âm', () => {
    // Input: Số lượng bị âm (lỗi dữ liệu)
    const gioHang = [{ id: 1, gia: 10000, soLuong: -5 }]
    // Expected: Bỏ qua hoặc tính là 0 (không trừ tiền)
    // Expect 0 because logic ignores negative quantity (treats as 0 or just doesn't add negative value if logic is correct)
    // My updated logic: soLuong > 0 ? soLuong : 0. So it should be 0.
    expect(tinhTongTien(gioHang).tongTien).toBe(0)
  })

  // --- 2. TÍNH GIẢM GIÁ ---
  // Mục đích: Kiểm tra logic áp dụng mã giảm giá.
  test('TC_TTOAN_006: tinhGiamGia - Tổng 100k, Mã 10%', () => {
    // Input: Tổng 100k, mã GREEN10 (10%)
    // Expected: Giảm 10k
    expect(tinhGiamGia(100000, 'GREEN10')).toBe(10000)
  })

  test('TC_TTOAN_007: tinhGiamGia - Tổng 100k, Mã 50% (GREEN50)', () => {
    // Input: Tổng 100k, mã GREEN50 (50%)
    // Expected: Giảm 50k
    expect(tinhGiamGia(100000, 'GREEN50')).toBe(50000)
  })

  test('TC_TTOAN_008: tinhGiamGia - Voucher hết hạn/sai', () => {
    // Input: Mã không tồn tại
    // Expected: Giảm 0đ
    expect(tinhGiamGia(100000, 'EXPIRED')).toBe(0)
  })

  // --- 3. TÍNH THUẾ VAT ---
  // Mục đích: Kiểm tra tính thuế 10% trên tổng tiền sau giảm giá.
  test('TC_TTOAN_009: tinhThueVAT - Tổng 100k, VAT 10%', () => {
    // Input: 100k
    // Expected: Thuế 10k
    expect(tinhThueVAT(100000)).toBe(10000)
  })

  test('TC_TTOAN_010: tinhThueVAT - Tổng 0', () => {
    // Input: 0đ
    // Expected: Thuế 0đ
    expect(tinhThueVAT(0)).toBe(0)
  })

  // --- 4. CỘNG DỒN GIỎ HÀNG ---
  // Mục đích: Kiểm tra logic thêm sản phẩm vào giỏ (tăng số lượng hoặc thêm mới).
  test('TC_TTOAN_011: congDonGio - Sp mới đã có trong giỏ', () => {
    // Input: Giỏ có SP id=1 (sl=1), thêm tiếp SP id=1 (sl=2)
    const gioHang = [{ id: 1, soLuong: 1 }]
    const spMoi = { id: 1, soLuong: 2 }
    const gioMoi = congDonGio(gioHang, spMoi)
    // Expected: SP id=1 có số lượng = 3
    expect(gioMoi[0].soLuong).toBe(3)
  })

  test('TC_TTOAN_012: congDonGio - Sp mới chưa có', () => {
    // Input: Giỏ có SP id=1, thêm SP id=2
    const gioHang = [{ id: 1, soLuong: 1 }]
    const spMoi = { id: 2, soLuong: 1 }
    const gioMoi = congDonGio(gioHang, spMoi)
    // Expected: Giỏ có 2 sản phẩm
    expect(gioMoi.length).toBe(2)
  })

  // --- 5. TÍNH PHÍ VẬN CHUYỂN ---
  // Mục đích: Kiểm tra phí ship theo khu vực và chính sách miễn phí.
  test('TC_TTOAN_013: tinhPhiShip - Nội thành', () => {
    // Input: Đơn < 200k, khu vực Nội thành
    // Expected: Phí 20k
    expect(tinhPhiVanChuyen(100000, 'noiThanh')).toBe(20000)
  })

  test('TC_TTOAN_014: tinhPhiShip - Ngoại thành', () => {
    // Input: Đơn < 200k, khu vực Ngoại thành
    // Expected: Phí 30k
    expect(tinhPhiVanChuyen(100000, 'ngoaiThanh')).toBe(30000)
  })

  test('TC_TTOAN_016: tinhPhiShip - Miễn phí (>= 200k)', () => {
    // Input: Đơn hàng 200k (đạt mức miễn phí)
    // Expected: Phí 0đ
    expect(tinhPhiVanChuyen(200000, 'chuan')).toBe(0)
  })

  test('TC_TTOAN_015: tongThanhToan - (Hàng + Ship - Mã)', () => {
    // Mục đích: Kiểm tra tính toán tổng thể (chưa bao gồm ship trong hàm này, nhưng kiểm tra logic trả về).
    // Note: tinhTongTien returns { tongThanhToan } which includes VAT but NOT shipping.
    // Shipping is usually added separately in the Checkout process.
    // However, the test case description says "(Hàng + Ship - Mã)".
    // But `tinhTongTien` function signature doesn't take shipping fee.
    // So I will test `tongThanhToan` returned by `tinhTongTien` which is (Price - Discount + VAT).
    // If the user meant "Total including ship", that logic is likely in the component, not `tinhTongTien`.
    // I will stick to testing `tinhTongTien` return value.

    const gioHang = [{ id: 1, gia: 100000, soLuong: 1 }] // 100k
    const ma = 'GREEN10' // -10k
    // Sau giảm: 90k.
    // VAT 10% of 90k = 9k.
    // Tổng thanh toán (chưa ship): 99k.
    const result = tinhTongTien(gioHang, ma)
    expect(result.tongThanhToan).toBe(99000)
  })
})
