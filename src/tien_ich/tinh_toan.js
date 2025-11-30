/**
 * File tinh_toan.js - Chứa các hàm tính toán cho giỏ hàng và thanh toán
 */

/**
 * Tính tổng tiền trong giỏ hàng
 * @param {Array} gioHang - Mảng các sản phẩm trong giỏ hàng
 * @param {string} maGiamGia - Mã giảm giá (tùy chọn)
 * @returns {Object} - Object chứa tongTien, giamGia, tongTienSauGiam, thue
 */
export function tinhTongTien(gioHang, maGiamGia = '') {
  if (!gioHang || gioHang.length === 0) {
    return {
      tongTien: 0,
      giamGia: 0,
      tongTienSauGiam: 0,
      thue: 0,
      tongThanhToan: 0
    }
  }

  // Tính tổng tiền trước giảm giá
  const tongTien = gioHang.reduce((tong, sanPham) => {
    return tong + (sanPham.gia * sanPham.soLuong)
  }, 0)

  // Tính giảm giá dựa trên mã
  let giamGia = 0
  const maGiamGiaHopLe = {
    'GREEN10': 0.1,  // Giảm 10%
    'GREEN20': 0.2,  // Giảm 20%
    'GREEN50': 0.5   // Giảm 50%
  }

  if (maGiamGia && maGiamGiaHopLe[maGiamGia.toUpperCase()]) {
    const tiLeGiam = maGiamGiaHopLe[maGiamGia.toUpperCase()]
    giamGia = tongTien * tiLeGiam
  }

  const tongTienSauGiam = tongTien - giamGia

  // Tính thuế VAT 10%
  const thue = tongTienSauGiam * 0.1

  // Tổng thanh toán cuối cùng
  const tongThanhToan = tongTienSauGiam + thue

  return {
    tongTien,
    giamGia,
    tongTienSauGiam,
    thue,
    tongThanhToan
  }
}

/**
 * Tính phí vận chuyển
 * @param {number} tongTien - Tổng tiền đơn hàng
 * @param {string} loaiVanChuyen - Loại vận chuyển ('nhanh' | 'chuan' | 'tietKiem')
 * @returns {number} - Phí vận chuyển
 */
export function tinhPhiVanChuyen(tongTien, loaiVanChuyen = 'chuan') {
  // Miễn phí ship nếu đơn hàng trên 500,000đ
  if (tongTien >= 500000) {
    return 0
  }

  const phiVanChuyen = {
    'nhanh': 50000,
    'chuan': 30000,
    'tietKiem': 20000
  }

  return phiVanChuyen[loaiVanChuyen] || phiVanChuyen['chuan']
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

