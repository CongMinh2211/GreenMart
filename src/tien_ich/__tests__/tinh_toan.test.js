import { tinhTongTien, tinhPhiVanChuyen, dinhDangTien } from '../tinh_toan'

describe('tinh_toan.js - Test các hàm tính toán', () => {
  describe('tinhTongTien', () => {
    test('TC1: Tính tổng tiền với giỏ hàng rỗng', () => {
      const ketQua = tinhTongTien([])
      expect(ketQua.tongTien).toBe(0)
      expect(ketQua.giamGia).toBe(0)
      expect(ketQua.tongThanhToan).toBe(0)
    })

    test('TC2: Tính tổng tiền với 1 sản phẩm, không mã giảm giá', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 }
      ]
      const ketQua = tinhTongTien(gioHang)
      expect(ketQua.tongTien).toBe(50000)
      expect(ketQua.giamGia).toBe(0)
      expect(ketQua.thue).toBe(5000) // 10% VAT
      expect(ketQua.tongThanhToan).toBe(55000)
    })

    test('TC3: Tính tổng tiền với nhiều sản phẩm, không mã giảm giá', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 },
        { id: 2, ten: 'Cà chua', gia: 35000, soLuong: 1 }
      ]
      const ketQua = tinhTongTien(gioHang)
      expect(ketQua.tongTien).toBe(85000) // 25000*2 + 35000
      expect(ketQua.giamGia).toBe(0)
      expect(ketQua.thue).toBe(8500)
      expect(ketQua.tongThanhToan).toBe(93500)
    })

    test('TC4: Tính tổng tiền với mã giảm giá GREEN10 (10%)', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 }
      ]
      const ketQua = tinhTongTien(gioHang, 'GREEN10')
      expect(ketQua.tongTien).toBe(50000)
      expect(ketQua.giamGia).toBe(5000) // 10% của 50000
      expect(ketQua.tongTienSauGiam).toBe(45000)
      expect(ketQua.thue).toBe(4500) // 10% của 45000
      expect(ketQua.tongThanhToan).toBe(49500)
    })

    test('TC5: Tính tổng tiền với mã giảm giá GREEN20 (20%)', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 }
      ]
      const ketQua = tinhTongTien(gioHang, 'GREEN20')
      expect(ketQua.tongTien).toBe(50000)
      expect(ketQua.giamGia).toBe(10000) // 20% của 50000
      expect(ketQua.tongTienSauGiam).toBe(40000)
      expect(ketQua.thue).toBe(4000)
      expect(ketQua.tongThanhToan).toBe(44000)
    })

    test('TC6: Tính tổng tiền với mã giảm giá không hợp lệ', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 }
      ]
      const ketQua = tinhTongTien(gioHang, 'INVALID')
      expect(ketQua.tongTien).toBe(50000)
      expect(ketQua.giamGia).toBe(0)
    })

    test('TC7: Tính tổng tiền với mã giảm giá chữ thường (GREEN10)', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 }
      ]
      const ketQua = tinhTongTien(gioHang, 'green10')
      expect(ketQua.giamGia).toBe(5000) // Phải nhận diện được chữ thường
    })
  })

  describe('tinhPhiVanChuyen', () => {
    test('TC8: Tính phí vận chuyển chuẩn cho đơn hàng < 500,000đ', () => {
      const phi = tinhPhiVanChuyen(100000, 'chuan')
      expect(phi).toBe(30000)
    })

    test('TC9: Tính phí vận chuyển nhanh cho đơn hàng < 500,000đ', () => {
      const phi = tinhPhiVanChuyen(100000, 'nhanh')
      expect(phi).toBe(50000)
    })

    test('TC10: Tính phí vận chuyển tiết kiệm cho đơn hàng < 500,000đ', () => {
      const phi = tinhPhiVanChuyen(100000, 'tietKiem')
      expect(phi).toBe(20000)
    })

    test('TC11: Miễn phí ship cho đơn hàng >= 500,000đ', () => {
      const phi = tinhPhiVanChuyen(500000, 'chuan')
      expect(phi).toBe(0)
    })

    test('TC12: Miễn phí ship cho đơn hàng > 500,000đ', () => {
      const phi = tinhPhiVanChuyen(600000, 'nhanh')
      expect(phi).toBe(0)
    })
  })

  describe('dinhDangTien', () => {
    test('TC13: Format số tiền đơn giản', () => {
      const ketQua = dinhDangTien(25000)
      expect(ketQua).toBe('25.000 đ')
    })

    test('TC14: Format số tiền lớn', () => {
      const ketQua = dinhDangTien(1000000)
      expect(ketQua).toBe('1.000.000 đ')
    })

    test('TC15: Format số tiền = 0', () => {
      const ketQua = dinhDangTien(0)
      expect(ketQua).toBe('0 đ')
    })

    test('TC16: Format với giá trị không hợp lệ', () => {
      const ketQua = dinhDangTien(NaN)
      expect(ketQua).toBe('0 đ')
    })
  })
})

