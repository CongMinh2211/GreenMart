/**
 * File luu_tru.js - Chứa các hàm lưu trữ và đọc dữ liệu từ LocalStorage
 */

const KEY_GIO_HANG = 'greenmart_gio_hang'
const KEY_NGUOI_DUNG = 'greenmart_nguoi_dung'
const KEY_DON_HANG = 'greenmart_don_hang'
const KEY_TEST_CASE = 'greenmart_test_case'
const KEY_TAI_KHOAN = 'greenmart_tai_khoan'

/**
 * Lưu giỏ hàng vào LocalStorage
 * @param {Array} gioHang - Mảng sản phẩm trong giỏ hàng
 * @returns {boolean} - true nếu lưu thành công
 */
export function luuGioHang(gioHang) {
  try {
    if (!Array.isArray(gioHang)) {
      return false
    }
    const chuoiJson = JSON.stringify(gioHang)
    localStorage.setItem(KEY_GIO_HANG, chuoiJson)
    return true
  } catch (error) {
    console.error('Lỗi khi lưu giỏ hàng:', error)
    return false
  }
}

/**
 * Đọc giỏ hàng từ LocalStorage
 * @returns {Array} - Mảng sản phẩm trong giỏ hàng, mảng rỗng nếu không có
 */
export function docGioHang() {
  try {
    const chuoiJson = localStorage.getItem(KEY_GIO_HANG)
    if (!chuoiJson) {
      return []
    }
    const gioHang = JSON.parse(chuoiJson)
    return Array.isArray(gioHang) ? gioHang : []
  } catch (error) {
    console.error('Lỗi khi đọc giỏ hàng:', error)
    return []
  }
}

/**
 * Xóa giỏ hàng khỏi LocalStorage
 * @returns {boolean} - true nếu xóa thành công
 */
export function xoaGioHang() {
  try {
    localStorage.removeItem(KEY_GIO_HANG)
    return true
  } catch (error) {
    console.error('Lỗi khi xóa giỏ hàng:', error)
    return false
  }
}

/**
 * Lưu thông tin người dùng vào LocalStorage
 * @param {Object} nguoiDung - Object chứa thông tin người dùng
 * @returns {boolean} - true nếu lưu thành công
 */
export function luuNguoiDung(nguoiDung) {
  try {
    if (!nguoiDung || typeof nguoiDung !== 'object') {
      return false
    }
    const chuoiJson = JSON.stringify(nguoiDung)
    localStorage.setItem(KEY_NGUOI_DUNG, chuoiJson)
    return true
  } catch (error) {
    console.error('Lỗi khi lưu thông tin người dùng:', error)
    return false
  }
}

/**
 * Đọc thông tin người dùng từ LocalStorage
 * @returns {Object|null} - Object thông tin người dùng hoặc null
 */
export function docNguoiDung() {
  try {
    const chuoiJson = localStorage.getItem(KEY_NGUOI_DUNG)
    if (!chuoiJson) {
      return null
    }
    return JSON.parse(chuoiJson)
  } catch (error) {
    console.error('Lỗi khi đọc thông tin người dùng:', error)
    return null
  }
}

/**
 * Xóa thông tin người dùng khỏi LocalStorage (đăng xuất)
 * @returns {boolean} - true nếu xóa thành công
 */
export function xoaNguoiDung() {
  try {
    localStorage.removeItem(KEY_NGUOI_DUNG)
    return true
  } catch (error) {
    console.error('Lỗi khi xóa thông tin người dùng:', error)
    return false
  }
}

/**
 * Lưu đơn hàng vào LocalStorage
 * @param {Object} donHang - Object chứa thông tin đơn hàng
 * @returns {boolean} - true nếu lưu thành công
 */
export function luuDonHang(donHang) {
  try {
    if (!donHang || typeof donHang !== 'object') {
      return false
    }

    // Đọc danh sách đơn hàng cũ
    const danhSachDonHang = docDanhSachDonHang()

    // Thêm đơn hàng mới với ID và thời gian
    const donHangMoi = {
      ...donHang,
      id: Date.now().toString(),
      thoiGian: new Date().toISOString()
    }

    danhSachDonHang.push(donHangMoi)

    const chuoiJson = JSON.stringify(danhSachDonHang)
    localStorage.setItem(KEY_DON_HANG, chuoiJson)
    return true
  } catch (error) {
    console.error('Lỗi khi lưu đơn hàng:', error)
    return false
  }
}

/**
 * Đọc danh sách đơn hàng từ LocalStorage
 * @returns {Array} - Mảng các đơn hàng
 */
export function docDanhSachDonHang() {
  try {
    const chuoiJson = localStorage.getItem(KEY_DON_HANG)
    if (!chuoiJson) {
      return []
    }
    const danhSachDonHang = JSON.parse(chuoiJson)
    return Array.isArray(danhSachDonHang) ? danhSachDonHang : []
  } catch (error) {
    console.error('Lỗi khi đọc danh sách đơn hàng:', error)
    return []
  }
}

/**
 * Lưu danh sách test case vào LocalStorage
 * @param {Array} danhSachTestCase - Mảng các test case
 * @returns {boolean} - true nếu lưu thành công
 */
export function luuDanhSachTestCase(danhSachTestCase) {
  try {
    if (!Array.isArray(danhSachTestCase)) {
      return false
    }
    const chuoiJson = JSON.stringify(danhSachTestCase)
    localStorage.setItem(KEY_TEST_CASE, chuoiJson)
    return true
  } catch (error) {
    console.error('Lỗi khi lưu danh sách test case:', error)
    return false
  }
}

/**
 * Đọc danh sách test case từ LocalStorage
 * @returns {Array} - Mảng các test case, mảng rỗng nếu không có
 */
export function docDanhSachTestCase() {
  try {
    const chuoiJson = localStorage.getItem(KEY_TEST_CASE)
    if (!chuoiJson) {
      return []
    }
    const danhSachTestCase = JSON.parse(chuoiJson)
    return Array.isArray(danhSachTestCase) ? danhSachTestCase : []
  } catch (error) {
    console.error('Lỗi khi đọc danh sách test case:', error)
    return []
  }
}

/**
 * Format số tiền thành chuỗi tiền tệ Việt Nam
 * @param {number} soTien - Số tiền cần format
 * @returns {string} - Chuỗi đã format (VD: "25.000 đ")
 */
export function dinhDangTien(soTien) {
  if (typeof soTien !== 'number' || isNaN(soTien)) {
    return '0 đ'
  }
  return new Intl.NumberFormat('vi-VN').format(soTien) + ' đ'
}

/**
 * Lưu tài khoản đã đăng ký vào LocalStorage
 * @param {Object} taiKhoan - Object chứa thông tin tài khoản (email, matKhau, hoTen, soDienThoai)
 * @returns {boolean} - true nếu lưu thành công
 */
export function luuTaiKhoan(taiKhoan) {
  try {
    if (!taiKhoan || typeof taiKhoan !== 'object' || !taiKhoan.email || !taiKhoan.matKhau) {
      return false
    }

    // Đọc danh sách tài khoản cũ
    const danhSachTaiKhoan = docDanhSachTaiKhoan()

    // Kiểm tra email đã tồn tại chưa
    const tonTai = danhSachTaiKhoan.find(tk => tk.email === taiKhoan.email)
    if (tonTai) {
      return false // Email đã tồn tại
    }

    // Thêm tài khoản mới (không lưu mật khẩu dạng plain text, chỉ lưu hash đơn giản)
    const taiKhoanMoi = {
      email: taiKhoan.email,
      matKhau: taiKhoan.matKhau, // Trong thực tế nên hash mật khẩu
      hoTen: taiKhoan.hoTen,
      soDienThoai: taiKhoan.soDienThoai,
      ngayDangKy: new Date().toISOString()
    }

    danhSachTaiKhoan.push(taiKhoanMoi)
    const chuoiJson = JSON.stringify(danhSachTaiKhoan)
    localStorage.setItem(KEY_TAI_KHOAN, chuoiJson)
    return true
  } catch (error) {
    console.error('Lỗi khi lưu tài khoản:', error)
    return false
  }
}

/**
 * Đọc danh sách tài khoản đã đăng ký từ LocalStorage
 * @returns {Array} - Mảng các tài khoản
 */
export function docDanhSachTaiKhoan() {
  try {
    const chuoiJson = localStorage.getItem(KEY_TAI_KHOAN)
    if (!chuoiJson) {
      return []
    }
    const danhSachTaiKhoan = JSON.parse(chuoiJson)
    return Array.isArray(danhSachTaiKhoan) ? danhSachTaiKhoan : []
  } catch (error) {
    console.error('Lỗi khi đọc danh sách tài khoản:', error)
    return []
  }
}

/**
 * Kiểm tra tài khoản đăng nhập
 * @param {string} email - Email đăng nhập
 * @param {string} matKhau - Mật khẩu
 * @returns {Object|null} - Thông tin tài khoản nếu đúng, null nếu sai
 */
export function kiemTraDangNhap(email, matKhau) {
  try {
    const danhSachTaiKhoan = docDanhSachTaiKhoan()
    const taiKhoan = danhSachTaiKhoan.find(tk => tk.email === email && tk.matKhau === matKhau)
    return taiKhoan || null
  } catch (error) {
    console.error('Lỗi khi kiểm tra đăng nhập:', error)
    return null
  }
}

/**
 * Format ngày tháng
 * @param {string} dateString - Chuỗi ngày tháng (ISO)
 * @returns {string} - Chuỗi ngày tháng đã format (dd/mm/yyyy)
 */
export function formatNgay(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

/**
 * Kiểm tra token (giả lập)
 * @returns {boolean} - true nếu có token (đã đăng nhập)
 */
export function checkToken() {
  const user = docNguoiDung()
  return !!user
}

/**
 * Tạo mã đơn hàng ngẫu nhiên
 * @returns {string} - Mã đơn hàng
 */
export function taoMaDon() {
  return 'DH' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
}

/**
 * Alias cho dinhDangTien
 */
export const formatTienTe = dinhDangTien
export const luuUser = luuNguoiDung
export const xoaUser = xoaNguoiDung
export const layGioHang = docGioHang

