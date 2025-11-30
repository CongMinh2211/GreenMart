import { kiemTraEmail, kiemTraMatKhau, kiemTraSoDienThoai, kiemTraTen } from '../kiem_tra_hop_le'

describe('kiem_tra_hop_le.js - Test các hàm kiểm tra tính hợp lệ', () => {
  describe('kiemTraEmail', () => {
    test('TC1: Email hợp lệ cơ bản', () => {
      const ketQua = kiemTraEmail('test@example.com')
      expect(ketQua.hopLe).toBe(true)
    })

    test('TC2: Email không hợp lệ - thiếu @', () => {
      const ketQua = kiemTraEmail('testexample.com')
      expect(ketQua.hopLe).toBe(false)
      expect(ketQua.thongBao).toContain('không đúng định dạng')
    })

    test('TC3: Email không hợp lệ - thiếu domain', () => {
      const ketQua = kiemTraEmail('test@')
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC4: Email rỗng', () => {
      const ketQua = kiemTraEmail('')
      expect(ketQua.hopLe).toBe(false)
      expect(ketQua.thongBao).toContain('không được để trống')
    })

    test('TC5: Email null hoặc undefined', () => {
      const ketQua1 = kiemTraEmail(null)
      const ketQua2 = kiemTraEmail(undefined)
      expect(ketQua1.hopLe).toBe(false)
      expect(ketQua2.hopLe).toBe(false)
    })

    test('TC6: Email có khoảng trắng ở đầu/cuối', () => {
      const ketQua = kiemTraEmail('  test@example.com  ')
      expect(ketQua.hopLe).toBe(true) // Nên trim và hợp lệ
    })

    test('TC7: Email quá dài (>254 ký tự)', () => {
      const emailDai = 'a'.repeat(250) + '@example.com'
      const ketQua = kiemTraEmail(emailDai)
      expect(ketQua.hopLe).toBe(false)
    })
  })

  describe('kiemTraMatKhau', () => {
    test('TC8: Mật khẩu quá ngắn (<6 ký tự)', () => {
      const ketQua = kiemTraMatKhau('12345')
      expect(ketQua.hopLe).toBe(false)
      expect(ketQua.doManh).toBe('yeu')
    })

    test('TC9: Mật khẩu yếu - chỉ có chữ thường', () => {
      const ketQua = kiemTraMatKhau('abcdef')
      expect(ketQua.hopLe).toBe(true)
      expect(ketQua.doManh).toBe('yeu')
    })

    test('TC10: Mật khẩu trung bình - có chữ hoa và số', () => {
      const ketQua = kiemTraMatKhau('Abc123')
      expect(ketQua.hopLe).toBe(true)
      expect(ketQua.doManh).toBe('trung-binh')
    })

    test('TC11: Mật khẩu mạnh - có chữ hoa, số, ký tự đặc biệt, >=8 ký tự', () => {
      const ketQua = kiemTraMatKhau('Abc123!@')
      expect(ketQua.hopLe).toBe(true)
      expect(ketQua.doManh).toBe('manh')
    })

    test('TC12: Mật khẩu rất mạnh - đủ tất cả tiêu chí, >=12 ký tự', () => {
      const ketQua = kiemTraMatKhau('Abc123!@#XYZ')
      expect(ketQua.hopLe).toBe(true)
      expect(ketQua.doManh).toBe('rat-manh')
    })

    test('TC13: Mật khẩu rỗng', () => {
      const ketQua = kiemTraMatKhau('')
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC14: Mật khẩu quá dài (>50 ký tự)', () => {
      const matKhauDai = 'a'.repeat(51)
      const ketQua = kiemTraMatKhau(matKhauDai)
      expect(ketQua.hopLe).toBe(false)
    })
  })

  describe('kiemTraSoDienThoai', () => {
    test('TC15: Số điện thoại hợp lệ - bắt đầu bằng 0', () => {
      const ketQua = kiemTraSoDienThoai('0912345678')
      expect(ketQua.hopLe).toBe(true)
    })

    test('TC16: Số điện thoại hợp lệ - bắt đầu bằng +84', () => {
      const ketQua = kiemTraSoDienThoai('+84912345678')
      expect(ketQua.hopLe).toBe(true)
    })

    test('TC17: Số điện thoại không hợp lệ - quá ngắn', () => {
      const ketQua = kiemTraSoDienThoai('091234567')
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC18: Số điện thoại không hợp lệ - bắt đầu bằng số khác 0', () => {
      const ketQua = kiemTraSoDienThoai('1912345678')
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC19: Số điện thoại có khoảng trắng và dấu gạch ngang', () => {
      const ketQua = kiemTraSoDienThoai('0912 345 678')
      expect(ketQua.hopLe).toBe(true) // Nên tự động loại bỏ khoảng trắng
    })

    test('TC20: Số điện thoại rỗng', () => {
      const ketQua = kiemTraSoDienThoai('')
      expect(ketQua.hopLe).toBe(false)
    })
  })

  describe('kiemTraTen', () => {
    test('TC21: Tên hợp lệ - đủ độ dài', () => {
      const ketQua = kiemTraTen('Nguyễn Văn A')
      expect(ketQua.hopLe).toBe(true)
    })

    test('TC22: Tên quá ngắn (<2 ký tự)', () => {
      const ketQua = kiemTraTen('A')
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC23: Tên rỗng', () => {
      const ketQua = kiemTraTen('')
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC24: Tên quá dài (>100 ký tự)', () => {
      const tenDai = 'A'.repeat(101)
      const ketQua = kiemTraTen(tenDai)
      expect(ketQua.hopLe).toBe(false)
    })

    test('TC25: Tên có khoảng trắng ở đầu/cuối', () => {
      const ketQua = kiemTraTen('  Nguyễn Văn A  ')
      expect(ketQua.hopLe).toBe(true) // Nên trim
    })
  })
})

