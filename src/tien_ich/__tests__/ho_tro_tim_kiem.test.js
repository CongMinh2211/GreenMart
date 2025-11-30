import { 
  timKiemSanPham, 
  chuyenDoiKhongDau, 
  sapXepSanPham, 
  locTheoLoai, 
  locTheoGia 
} from '../ho_tro_tim_kiem'

describe('ho_tro_tim_kiem.js - Test các hàm tìm kiếm và sắp xếp', () => {
  const danhSachSanPham = [
    { id: 1, ten: 'Rau cải xanh', gia: 25000, loai: 'rau-cu' },
    { id: 2, ten: 'Cà chua hữu cơ', gia: 35000, loai: 'rau-cu' },
    { id: 3, ten: 'Chuối tiêu', gia: 20000, loai: 'trai-cay' }
  ]

  describe('chuyenDoiKhongDau', () => {
    test('TC1: Chuyển đổi chữ có dấu thành không dấu', () => {
      expect(chuyenDoiKhongDau('Nguyễn')).toBe('Nguyen')
      expect(chuyenDoiKhongDau('Đỗ')).toBe('Do')
    })

    test('TC2: Chuyển đổi chuỗi có nhiều từ', () => {
      expect(chuyenDoiKhongDau('Rau cải xanh')).toBe('Rau cai xanh')
    })

    test('TC3: Chuỗi rỗng', () => {
      expect(chuyenDoiKhongDau('')).toBe('')
    })

    test('TC4: Chuỗi không có dấu', () => {
      expect(chuyenDoiKhongDau('Hello World')).toBe('Hello World')
    })
  })

  describe('timKiemSanPham', () => {
    test('TC5: Tìm kiếm theo tên - có dấu', () => {
      const ketQua = timKiemSanPham(danhSachSanPham, 'cải')
      expect(ketQua.length).toBe(1)
      expect(ketQua[0].id).toBe(1)
    })

    test('TC6: Tìm kiếm theo tên - không dấu', () => {
      const ketQua = timKiemSanPham(danhSachSanPham, 'cai')
      expect(ketQua.length).toBe(1)
      expect(ketQua[0].id).toBe(1)
    })

    test('TC7: Tìm kiếm theo loại', () => {
      const ketQua = timKiemSanPham(danhSachSanPham, 'rau-cu')
      expect(ketQua.length).toBe(2)
    })

    test('TC8: Tìm kiếm không có kết quả', () => {
      const ketQua = timKiemSanPham(danhSachSanPham, 'không tồn tại')
      expect(ketQua.length).toBe(0)
    })

    test('TC9: Tìm kiếm với từ khóa rỗng - trả về tất cả', () => {
      const ketQua = timKiemSanPham(danhSachSanPham, '')
      expect(ketQua.length).toBe(3)
    })

    test('TC10: Tìm kiếm không phân biệt hoa thường', () => {
      const ketQua = timKiemSanPham(danhSachSanPham, 'CHUOI')
      expect(ketQua.length).toBe(1)
    })
  })

  describe('sapXepSanPham', () => {
    test('TC11: Sắp xếp theo giá tăng dần', () => {
      const ketQua = sapXepSanPham(danhSachSanPham, 'gia-tang')
      expect(ketQua[0].gia).toBe(20000)
      expect(ketQua[2].gia).toBe(35000)
    })

    test('TC12: Sắp xếp theo giá giảm dần', () => {
      const ketQua = sapXepSanPham(danhSachSanPham, 'gia-giam')
      expect(ketQua[0].gia).toBe(35000)
      expect(ketQua[2].gia).toBe(20000)
    })

    test('TC13: Sắp xếp theo tên A-Z', () => {
      const ketQua = sapXepSanPham(danhSachSanPham, 'ten-a-z')
      expect(ketQua[0].ten).toBe('Cà chua hữu cơ')
    })

    test('TC14: Sắp xếp theo tên Z-A', () => {
      const ketQua = sapXepSanPham(danhSachSanPham, 'ten-z-a')
      expect(ketQua[0].ten).toBe('Rau cải xanh')
    })

    test('TC15: Sắp xếp với tiêu chí không hợp lệ - trả về mảng gốc', () => {
      const ketQua = sapXepSanPham(danhSachSanPham, 'invalid')
      expect(ketQua.length).toBe(3)
    })
  })

  describe('locTheoLoai', () => {
    test('TC16: Lọc theo loại rau-cu', () => {
      const ketQua = locTheoLoai(danhSachSanPham, 'rau-cu')
      expect(ketQua.length).toBe(2)
      expect(ketQua.every(sp => sp.loai === 'rau-cu')).toBe(true)
    })

    test('TC17: Lọc theo loại trai-cay', () => {
      const ketQua = locTheoLoai(danhSachSanPham, 'trai-cay')
      expect(ketQua.length).toBe(1)
    })

    test('TC18: Lọc tất cả (tat-ca)', () => {
      const ketQua = locTheoLoai(danhSachSanPham, 'tat-ca')
      expect(ketQua.length).toBe(3)
    })

    test('TC19: Lọc với loại không tồn tại', () => {
      const ketQua = locTheoLoai(danhSachSanPham, 'khong-ton-tai')
      expect(ketQua.length).toBe(0)
    })
  })

  describe('locTheoGia', () => {
    test('TC20: Lọc theo khoảng giá', () => {
      const ketQua = locTheoGia(danhSachSanPham, 20000, 30000)
      expect(ketQua.length).toBe(2)
      expect(ketQua.every(sp => sp.gia >= 20000 && sp.gia <= 30000)).toBe(true)
    })

    test('TC21: Lọc giá tối thiểu', () => {
      const ketQua = locTheoGia(danhSachSanPham, 30000, Infinity)
      expect(ketQua.length).toBe(1)
    })

    test('TC22: Lọc giá tối đa', () => {
      const ketQua = locTheoGia(danhSachSanPham, 0, 25000)
      expect(ketQua.length).toBe(2)
    })

    test('TC23: Lọc với khoảng giá không có sản phẩm', () => {
      const ketQua = locTheoGia(danhSachSanPham, 100000, 200000)
      expect(ketQua.length).toBe(0)
    })
  })
})

