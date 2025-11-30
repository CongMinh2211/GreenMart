/**
 * File kiem_tra_hop_le.js - Chứa các hàm kiểm tra tính hợp lệ của dữ liệu
 */

/**
 * Kiểm tra email có hợp lệ không
 * @param {string} email - Email cần kiểm tra
 * @returns {Object} - { hopLe: boolean, thongBao: string }
 */
export function kiemTraEmail(email) {
  if (!email || typeof email !== 'string') {
    return {
      hopLe: false,
      thongBao: 'Email không được để trống'
    }
  }

  const emailTrimmed = email.trim()

  if (emailTrimmed.length === 0) {
    return {
      hopLe: false,
      thongBao: 'Email không được để trống'
    }
  }

  // Regex kiểm tra format email cơ bản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(emailTrimmed)) {
    return {
      hopLe: false,
      thongBao: 'Email không đúng định dạng (VD: example@email.com)'
    }
  }

  // Kiểm tra độ dài
  if (emailTrimmed.length > 254) {
    return {
      hopLe: false,
      thongBao: 'Email quá dài (tối đa 254 ký tự)'
    }
  }

  return {
    hopLe: true,
    thongBao: 'Email hợp lệ'
  }
}

/**
 * Kiểm tra mật khẩu có đủ mạnh không
 * @param {string} matKhau - Mật khẩu cần kiểm tra
 * @returns {Object} - { hopLe: boolean, thongBao: string, doManh: string }
 */
export function kiemTraMatKhau(matKhau) {
  if (!matKhau || typeof matKhau !== 'string') {
    return {
      hopLe: false,
      thongBao: 'Mật khẩu không được để trống',
      doManh: 'yeu'
    }
  }

  const doDai = matKhau.length

  // Kiểm tra độ dài tối thiểu
  if (doDai < 6) {
    return {
      hopLe: false,
      thongBao: 'Mật khẩu phải có ít nhất 6 ký tự',
      doManh: 'yeu'
    }
  }

  if (doDai > 50) {
    return {
      hopLe: false,
      thongBao: 'Mật khẩu quá dài (tối đa 50 ký tự)',
      doManh: 'yeu'
    }
  }

  // Đánh giá độ mạnh
  let diem = 0
  let thongBao = ''

  // Có chữ thường
  if (/[a-z]/.test(matKhau)) diem += 1
  // Có chữ hoa
  if (/[A-Z]/.test(matKhau)) diem += 1
  // Có số
  if (/[0-9]/.test(matKhau)) diem += 1
  // Có ký tự đặc biệt
  if (/[^a-zA-Z0-9]/.test(matKhau)) diem += 1
  // Độ dài >= 8
  if (doDai >= 8) diem += 1
  // Độ dài >= 12
  if (doDai >= 12) diem += 1

  let doManh = 'yeu'
  if (diem >= 5) {
    doManh = 'rat-manh'
    thongBao = 'Mật khẩu rất mạnh'
  } else if (diem >= 3) {
    doManh = 'manh'
    thongBao = 'Mật khẩu mạnh'
  } else if (diem >= 2) {
    doManh = 'trung-binh'
    thongBao = 'Mật khẩu trung bình'
  } else {
    doManh = 'yeu'
    thongBao = 'Mật khẩu yếu - nên thêm chữ hoa, số hoặc ký tự đặc biệt'
  }

  return {
    hopLe: true,
    thongBao,
    doManh
  }
}

/**
 * Kiểm tra số điện thoại Việt Nam
 * @param {string} soDienThoai - Số điện thoại cần kiểm tra
 * @returns {Object} - { hopLe: boolean, thongBao: string }
 */
export function kiemTraSoDienThoai(soDienThoai) {
  if (!soDienThoai || typeof soDienThoai !== 'string') {
    return {
      hopLe: false,
      thongBao: 'Số điện thoại không được để trống'
    }
  }

  // Loại bỏ khoảng trắng và ký tự đặc biệt
  const soDienThoaiCleaned = soDienThoai.replace(/[\s\-\(\)]/g, '')

  // Kiểm tra format số điện thoại Việt Nam (10 số, bắt đầu bằng 0 hoặc +84)
  const soDienThoaiRegex = /^(\+84|0)[3-9]\d{8}$/

  if (!soDienThoaiRegex.test(soDienThoaiCleaned)) {
    return {
      hopLe: false,
      thongBao: 'Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)'
    }
  }

  return {
    hopLe: true,
    thongBao: 'Số điện thoại hợp lệ'
  }
}

/**
 * Kiểm tra tên không được để trống
 * @param {string} ten - Tên cần kiểm tra
 * @param {number} doDaiToiThieu - Độ dài tối thiểu (mặc định 2)
 * @returns {Object} - { hopLe: boolean, thongBao: string }
 */
export function kiemTraTen(ten, doDaiToiThieu = 2) {
  if (!ten || typeof ten !== 'string') {
    return {
      hopLe: false,
      thongBao: 'Tên không được để trống'
    }
  }

  const tenTrimmed = ten.trim()

  if (tenTrimmed.length < doDaiToiThieu) {
    return {
      hopLe: false,
      thongBao: `Tên phải có ít nhất ${doDaiToiThieu} ký tự`
    }
  }

  if (tenTrimmed.length > 100) {
    return {
      hopLe: false,
      thongBao: 'Tên quá dài (tối đa 100 ký tự)'
    }
  }

  return {
    hopLe: true,
    thongBao: 'Tên hợp lệ'
  }
}

/**
 * Kiểm tra giá trị có bị để trống không
 * @param {any} value - Giá trị cần kiểm tra
 * @returns {boolean} - True nếu TRỐNG, False nếu CÓ DỮ LIỆU
 */
export function kiemTraTrong(value) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}

/**
 * Validate toàn bộ form
 * @param {Object} data - Object chứa dữ liệu form
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateForm(data) {
  const errors = {}
  let isValid = true

  if (data.email !== undefined) {
    const checkEmail = kiemTraEmail(data.email)
    if (!checkEmail.hopLe) {
      errors.email = checkEmail.thongBao
      isValid = false
    }
  }

  if (data.matKhau !== undefined) {
    const checkPass = kiemTraMatKhau(data.matKhau)
    if (!checkPass.hopLe) {
      errors.matKhau = checkPass.thongBao
      isValid = false
    }
  }

  if (data.soDienThoai !== undefined) {
    const checkSDT = kiemTraSoDienThoai(data.soDienThoai)
    if (!checkSDT.hopLe) {
      errors.soDienThoai = checkSDT.thongBao
      isValid = false
    }
  }

  return { isValid, errors }
}

