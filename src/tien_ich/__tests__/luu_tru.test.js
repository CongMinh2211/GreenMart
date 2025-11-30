import {
  luuGioHang,
  docGioHang,
  xoaGioHang,
  luuNguoiDung,
  docNguoiDung,
  xoaNguoiDung,
  luuDonHang,
  docDanhSachDonHang,
  dinhDangTien
} from '../luu_tru'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value }),
    removeItem: jest.fn((key) => { delete store[key] }),
    clear: jest.fn(() => { store = {} })
  }
})()

global.localStorage = localStorageMock

beforeEach(() => {
  localStorage.clear()
  jest.clearAllMocks()
})

describe('luu_tru.js - Test các hàm lưu trữ', () => {
  describe('luuGioHang và docGioHang', () => {
    test('TC1: Lưu và đọc giỏ hàng thành công', () => {
      const gioHang = [
        { id: 1, ten: 'Rau cải', gia: 25000, soLuong: 2 }
      ]
      const ketQuaLuu = luuGioHang(gioHang)
      expect(ketQuaLuu).toBe(true)

      const ketQuaDoc = docGioHang()
      expect(ketQuaDoc).toEqual(gioHang)
    })

    test('TC2: Đọc giỏ hàng khi chưa có dữ liệu', () => {
      const ketQua = docGioHang()
      expect(ketQua).toEqual([])
    })

    test('TC3: Lưu giỏ hàng rỗng', () => {
      const ketQua = luuGioHang([])
      expect(ketQua).toBe(true)
      expect(docGioHang()).toEqual([])
    })

    test('TC4: Lưu giỏ hàng với dữ liệu không hợp lệ', () => {
      const ketQua = luuGioHang(null)
      expect(ketQua).toBe(false)
    })
  })

  describe('xoaGioHang', () => {
    test('TC5: Xóa giỏ hàng thành công', () => {
      luuGioHang([{ id: 1, ten: 'Test', gia: 10000, soLuong: 1 }])
      const ketQua = xoaGioHang()
      expect(ketQua).toBe(true)
      expect(docGioHang()).toEqual([])
    })
  })

  describe('luuNguoiDung và docNguoiDung', () => {
    test('TC6: Lưu và đọc thông tin người dùng', () => {
      const nguoiDung = {
        hoTen: 'Nguyễn Văn A',
        email: 'test@example.com'
      }
      const ketQuaLuu = luuNguoiDung(nguoiDung)
      expect(ketQuaLuu).toBe(true)

      const ketQuaDoc = docNguoiDung()
      expect(ketQuaDoc).toEqual(nguoiDung)
    })

    test('TC7: Đọc thông tin người dùng khi chưa có', () => {
      const ketQua = docNguoiDung()
      expect(ketQua).toBeNull()
    })

    test('TC8: Lưu thông tin người dùng không hợp lệ', () => {
      const ketQua = luuNguoiDung(null)
      expect(ketQua).toBe(false)
    })
  })

  describe('xoaNguoiDung', () => {
    test('TC9: Xóa thông tin người dùng thành công', () => {
      luuNguoiDung({ hoTen: 'Test', email: 'test@example.com' })
      const ketQua = xoaNguoiDung()
      expect(ketQua).toBe(true)
      expect(docNguoiDung()).toBeNull()
    })
  })

  describe('luuDonHang và docDanhSachDonHang', () => {
    test('TC10: Lưu đơn hàng thành công', () => {
      const donHang = {
        thongTinGiaoHang: { hoTen: 'Test', email: 'test@example.com' },
        gioHang: [{ id: 1, ten: 'Test', gia: 10000, soLuong: 1 }],
        tongThanhToan: 11000
      }
      const ketQua = luuDonHang(donHang)
      expect(ketQua).toBe(true)

      const danhSach = docDanhSachDonHang()
      expect(danhSach.length).toBe(1)
      expect(danhSach[0]).toHaveProperty('id')
      expect(danhSach[0]).toHaveProperty('thoiGian')
    })

    test('TC11: Lưu nhiều đơn hàng', () => {
      luuDonHang({ gioHang: [], tongThanhToan: 10000 })
      luuDonHang({ gioHang: [], tongThanhToan: 20000 })
      
      const danhSach = docDanhSachDonHang()
      expect(danhSach.length).toBe(2)
    })

    test('TC12: Đọc danh sách đơn hàng khi chưa có', () => {
      const ketQua = docDanhSachDonHang()
      expect(ketQua).toEqual([])
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

