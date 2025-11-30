/**
 * File tinh_toan.js - Chứa các hàm tính toán cho giỏ hàng và thanh toán
 */

/**
 * Tính giảm giá dựa trên tổng tiền và mã
 * @param {number} tongTien - Tổng tiền
 * @param {string} maGiamGia - Mã giảm giá
 * @returns {number} - Số tiền được giảm
 */
export function tinhGiamGia(tongTien, maGiamGia) {
  if (!maGiamGia) return 0

  const maGiamGiaHopLe = {
    'GREEN10': 0.1,  // Giảm 10%
    'GREEN20': 0.2,  // Giảm 20%
    'GREEN50': 0.5   // Giảm 50%
  }

  if (maGiamGiaHopLe[maGiamGia.toUpperCase()]) {
    const tiLeGiam = maGiamGiaHopLe[maGiamGia.toUpperCase()]
    // Giới hạn giảm giá tối đa (ví dụ 200k)
    const giamGia = tongTien * tiLeGiam
    return giamGia
  }

  return 0
}

/**
 * Tính thuế VAT
 * @param {number} tongTienSauGiam - Tổng tiền sau khi giảm giá
 * @param {number} vatRate - Tỉ lệ VAT (mặc định 0.1)
 * @returns {number} - Tiền thuế
 */
export function tinhThueVAT(tongTienSauGiam, vatRate = 0.1) {
  if (tongTienSauGiam <= 0) return 0
  return tongTienSauGiam * vatRate
}

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
    const soLuong = sanPham.soLuong > 0 ? sanPham.soLuong : 0
    return tong + (sanPham.gia * soLuong)
  }, 0)

  // Tính giảm giá
  const giamGia = tinhGiamGia(tongTien, maGiamGia)

  const tongTienSauGiam = tongTien - giamGia

  // Tính thuế VAT 10%
  const thue = tinhThueVAT(tongTienSauGiam)

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
  // Miễn phí ship nếu đơn hàng trên 200,000đ
  if (tongTien >= 200000) {
    return 0
  }

  const phiVanChuyen = {
    'nhanh': 40000,
    'chuan': 36000,
    'tietKiem': 17000,
    'noiThanh': 20000,
    'ngoaiThanh': 30000
  }

  return phiVanChuyen[loaiVanChuyen] || phiVanChuyen['chuan']
}

/**
 * Cộng dồn sản phẩm vào giỏ hàng
 * @param {Array} gioHang - Giỏ hàng hiện tại
 * @param {Object} sanPhamMoi - Sản phẩm mới thêm vào
 * @returns {Array} - Giỏ hàng mới
 */
export function congDonGio(gioHang, sanPhamMoi) {
  const gioHangMoi = [...gioHang]
  const index = gioHangMoi.findIndex(sp => sp.id === sanPhamMoi.id)

  if (index !== -1) {
    // Nếu đã có, tăng số lượng
    gioHangMoi[index] = {
      ...gioHangMoi[index],
      soLuong: gioHangMoi[index].soLuong + sanPhamMoi.soLuong
    }
  } else {
    // Nếu chưa có, thêm mới
    gioHangMoi.push(sanPhamMoi)
  }

  return gioHangMoi
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
