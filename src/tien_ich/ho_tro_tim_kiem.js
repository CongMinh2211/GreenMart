/**
 * File ho_tro_tim_kiem.js - Chứa các hàm hỗ trợ tìm kiếm và sắp xếp
 */

/**
 * Tìm kiếm sản phẩm theo từ khóa (hỗ trợ tiếng Việt có dấu/không dấu)
 * @param {Array} danhSachSanPham - Mảng sản phẩm cần tìm
 * @param {string} tuKhoa - Từ khóa tìm kiếm
 * @returns {Array} - Mảng sản phẩm tìm được
 */
export function timKiemSanPham(danhSachSanPham, tuKhoa) {
  if (!danhSachSanPham || !Array.isArray(danhSachSanPham)) {
    return []
  }

  if (!tuKhoa || typeof tuKhoa !== 'string' || tuKhoa.trim().length === 0) {
    return danhSachSanPham
  }

  const tuKhoaChuanHoa = chuyenDoiKhongDau(tuKhoa.trim().toLowerCase())

  return danhSachSanPham.filter(sanPham => {
    const tenChuanHoa = chuyenDoiKhongDau(sanPham.ten.toLowerCase())
    const loaiChuanHoa = chuyenDoiKhongDau((sanPham.loai || '').toLowerCase())

    return tenChuanHoa.includes(tuKhoaChuanHoa) ||
      loaiChuanHoa.includes(tuKhoaChuanHoa)
  })
}

/**
 * Chuyển đổi chuỗi tiếng Việt có dấu thành không dấu
 * @param {string} chuoi - Chuỗi cần chuyển đổi
 * @returns {string} - Chuỗi đã chuyển đổi
 */
export function chuyenDoiKhongDau(chuoi) {
  if (!chuoi || typeof chuoi !== 'string') {
    return ''
  }

  const mapDau = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A',
    'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
    'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
    'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E',
    'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O',
    'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O',
    'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U',
    'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
    'Đ': 'D'
  }

  return chuoi.split('').map(kyTu => mapDau[kyTu] || kyTu).join('')
}

/**
 * Sắp xếp mảng sản phẩm theo tiêu chí
 * @param {Array} danhSachSanPham - Mảng sản phẩm cần sắp xếp
 * @param {string} tieuChi - Tiêu chí sắp xếp ('gia-tang' | 'gia-giam' | 'ten-a-z' | 'ten-z-a')
 * @returns {Array} - Mảng đã sắp xếp
 */
export function sapXepSanPham(danhSachSanPham, tieuChi = 'gia-tang') {
  if (!danhSachSanPham || !Array.isArray(danhSachSanPham)) {
    return []
  }

  const danhSachSaoChep = [...danhSachSanPham]

  switch (tieuChi) {
    case 'gia-tang':
      return danhSachSaoChep.sort((a, b) => a.gia - b.gia)

    case 'gia-giam':
      return danhSachSaoChep.sort((a, b) => b.gia - a.gia)

    case 'ten-a-z':
      return danhSachSaoChep.sort((a, b) => {
        const tenA = chuyenDoiKhongDau(a.ten.toLowerCase())
        const tenB = chuyenDoiKhongDau(b.ten.toLowerCase())
        return tenA.localeCompare(tenB)
      })

    case 'ten-z-a':
      return danhSachSaoChep.sort((a, b) => {
        const tenA = chuyenDoiKhongDau(a.ten.toLowerCase())
        const tenB = chuyenDoiKhongDau(b.ten.toLowerCase())
        return tenB.localeCompare(tenA)
      })

    default:
      return danhSachSaoChep
  }
}

/**
 * Lọc sản phẩm theo loại
 * @param {Array} danhSachSanPham - Mảng sản phẩm
 * @param {string} loai - Loại sản phẩm cần lọc
 * @returns {Array} - Mảng sản phẩm đã lọc
 */
export function locTheoLoai(danhSachSanPham, loai) {
  if (!danhSachSanPham || !Array.isArray(danhSachSanPham)) {
    return []
  }

  if (!loai || loai === 'tat-ca') {
    return danhSachSanPham
  }

  return danhSachSanPham.filter(sanPham => sanPham.loai === loai)
}

/**
 * Lọc sản phẩm theo khoảng giá
 * @param {Array} danhSachSanPham - Mảng sản phẩm
 * @param {number} giaMin - Giá tối thiểu
 * @param {number} giaMax - Giá tối đa
 * @returns {Array} - Mảng sản phẩm đã lọc
 */
export function locTheoGia(danhSachSanPham, giaMin = 0, giaMax = Infinity) {
  if (!danhSachSanPham || !Array.isArray(danhSachSanPham)) {
    return []
  }

  return danhSachSanPham.filter(sanPham => {
    return sanPham.gia >= giaMin && sanPham.gia <= giaMax
  })
}

/**
 * Tạo slug từ chuỗi (VD: "Táo Mỹ" -> "tao-my")
 * @param {string} str - Chuỗi cần tạo slug
 * @returns {string} - Slug
 */
export function taoSlug(str) {
  if (!str) return ''
  const khongDau = chuyenDoiKhongDau(str)
  return khongDau.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Xóa ký tự đặc biệt
    .replace(/\s+/g, '-')         // Thay khoảng trắng bằng -
    .replace(/-+/g, '-')          // Xóa - dư thừa
}

/**
 * Highlight từ khóa trong chuỗi
 * @param {string} text - Chuỗi gốc
 * @param {string} keyword - Từ khóa cần highlight
 * @returns {string} - Chuỗi HTML có highlight
 */
export function highlight(text, keyword) {
  if (!text) return ''
  if (!keyword) return text

  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<b>$1</b>')
}

/**
 * Phân trang danh sách
 * @param {Array} list - Danh sách gốc
 * @param {number} page - Trang hiện tại (1-based)
 * @param {number} limit - Số lượng item mỗi trang
 * @returns {Array} - Danh sách item của trang đó
 */
export function phantrang(list, page = 1, limit = 10) {
  if (!list || !Array.isArray(list)) return []
  if (page < 1) page = 1

  const start = (page - 1) * limit
  const end = start + limit

  return list.slice(start, end)
}

