import { useState } from 'react'
import { tinhTongTien, tinhPhiVanChuyen, dinhDangTien } from '../tien_ich/tinh_toan'
import { kiemTraEmail, kiemTraSoDienThoai, kiemTraTen } from '../tien_ich/kiem_tra_hop_le'
import { luuDonHang, xoaGioHang } from '../tien_ich/luu_tru'

function ThanhToan({ gioHang }) {
  const [thongTinGiaoHang, setThongTinGiaoHang] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    diaChi: '',
    loaiVanChuyen: 'chuan'
  })
  const [maGiamGia, setMaGiamGia] = useState('')
  const [loi, setLoi] = useState({})
  const [daThanhToan, setDaThanhToan] = useState(false)

  const ketQuaTinhToan = tinhTongTien(gioHang, maGiamGia)
  const phiVanChuyen = tinhPhiVanChuyen(ketQuaTinhToan.tongThanhToan, thongTinGiaoHang.loaiVanChuyen)
  const tongThanhToan = ketQuaTinhToan.tongThanhToan + phiVanChuyen

  const handleThayDoi = (truong, giaTri) => {
    setThongTinGiaoHang(prev => ({ ...prev, [truong]: giaTri }))
    // Xóa lỗi khi người dùng nhập lại
    if (loi[truong]) {
      setLoi(prev => ({ ...prev, [truong]: null }))
    }
  }

  const kiemTraForm = () => {
    const loiMoi = {}

    // Kiểm tra họ tên
    const ketQuaTen = kiemTraTen(thongTinGiaoHang.hoTen)
    if (!ketQuaTen.hopLe) {
      loiMoi.hoTen = ketQuaTen.thongBao
    }

    // Kiểm tra email
    const ketQuaEmail = kiemTraEmail(thongTinGiaoHang.email)
    if (!ketQuaEmail.hopLe) {
      loiMoi.email = ketQuaEmail.thongBao
    }

    // Kiểm tra số điện thoại
    const ketQuaSDT = kiemTraSoDienThoai(thongTinGiaoHang.soDienThoai)
    if (!ketQuaSDT.hopLe) {
      loiMoi.soDienThoai = ketQuaSDT.thongBao
    }

    // Kiểm tra địa chỉ
    if (!thongTinGiaoHang.diaChi || thongTinGiaoHang.diaChi.trim().length < 10) {
      loiMoi.diaChi = 'Địa chỉ phải có ít nhất 10 ký tự'
    }

    setLoi(loiMoi)
    return Object.keys(loiMoi).length === 0
  }

  const handleThanhToan = () => {
    if (!kiemTraForm()) {
      return
    }

    const donHang = {
      thongTinGiaoHang,
      gioHang,
      maGiamGia,
      tongTien: ketQuaTinhToan.tongTien,
      giamGia: ketQuaTinhToan.giamGia,
      thue: ketQuaTinhToan.thue,
      phiVanChuyen,
      tongThanhToan
    }

    luuDonHang(donHang)
    xoaGioHang()
    setDaThanhToan(true)
  }

  if (daThanhToan) {
    return (
      <div data-testid="thanh-toan-thanh-cong" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 data-testid="tieu-de-thanh-cong" style={{ color: '#2d5016', marginBottom: '1rem' }}>
          Đặt hàng thành công!
        </h1>
        <p data-testid="thong-bao-thanh-cong">
          Cảm ơn bạn đã mua sắm tại GreenMart. Đơn hàng của bạn đã được ghi nhận.
        </p>
      </div>
    )
  }

  if (gioHang.length === 0) {
    return (
      <div data-testid="gio-hang-rong-thanh-toan" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Giỏ hàng trống</h2>
        <p>Bạn cần có sản phẩm trong giỏ hàng để thanh toán</p>
      </div>
    )
  }

  return (
    <div data-testid="trang-thanh-toan" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 data-testid="tieu-de-thanh-toan" style={{ marginBottom: '2rem', color: '#2d5016' }}>
        Thanh toán
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Form thông tin giao hàng */}
        <div data-testid="form-thong-tin-giao-hang" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 data-testid="tieu-de-form" style={{ marginBottom: '1rem' }}>Thông tin giao hàng</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label data-testid="label-ho-ten">Họ và tên *</label>
            <input
              data-testid="input-ho-ten"
              type="text"
              value={thongTinGiaoHang.hoTen}
              onChange={(e) => handleThayDoi('hoTen', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: loi.hoTen ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            {loi.hoTen && (
              <p data-testid="loi-ho-ten" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {loi.hoTen}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label data-testid="label-email">Email *</label>
            <input
              data-testid="input-email"
              type="email"
              value={thongTinGiaoHang.email}
              onChange={(e) => handleThayDoi('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: loi.email ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            {loi.email && (
              <p data-testid="loi-email" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {loi.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label data-testid="label-so-dien-thoai">Số điện thoại *</label>
            <input
              data-testid="input-so-dien-thoai"
              type="tel"
              value={thongTinGiaoHang.soDienThoai}
              onChange={(e) => handleThayDoi('soDienThoai', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: loi.soDienThoai ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            {loi.soDienThoai && (
              <p data-testid="loi-so-dien-thoai" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {loi.soDienThoai}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label data-testid="label-dia-chi">Địa chỉ giao hàng *</label>
            <textarea
              data-testid="input-dia-chi"
              value={thongTinGiaoHang.diaChi}
              onChange={(e) => handleThayDoi('diaChi', e.target.value)}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: loi.diaChi ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px',
                resize: 'vertical'
              }}
            />
            {loi.diaChi && (
              <p data-testid="loi-dia-chi" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {loi.diaChi}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label data-testid="label-loai-van-chuyen">Loại vận chuyển</label>
            <select
              data-testid="select-loai-van-chuyen"
              value={thongTinGiaoHang.loaiVanChuyen}
              onChange={(e) => handleThayDoi('loaiVanChuyen', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <option value="tietKiem">Tiết kiệm (17,000 đ)</option>
              <option value="chuan">Chuẩn (36,000 đ)</option>
              <option value="nhanh">Nhanh (40,000 đ)</option>
              <option value="noiThanh">Nội thành (20,000 đ)</option>
              <option value="ngoaiThanh">Ngoại thành (30,000 đ)</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label data-testid="label-ma-giam-gia">Mã giảm giá</label>
            <input
              data-testid="input-ma-giam-gia-thanh-toan"
              type="text"
              value={maGiamGia}
              onChange={(e) => setMaGiamGia(e.target.value)}
              placeholder="Nhập mã giảm giá (VD: GREEN10, GREEN20, GREEN50)"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div data-testid="tom-tat-don-hang-thanh-toan" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          height: 'fit-content',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 data-testid="tieu-de-tom-tat-thanh-toan" style={{ marginBottom: '1rem' }}>Tóm tắt đơn hàng</h2>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tổng tiền:</span>
              <span data-testid="tong-tien-thanh-toan">{dinhDangTien(ketQuaTinhToan.tongTien)}</span>
            </div>

            {ketQuaTinhToan.giamGia > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'green' }}>
                <span>Giảm giá:</span>
                <span data-testid="giam-gia-thanh-toan">-{dinhDangTien(ketQuaTinhToan.giamGia)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Thuế VAT (10%):</span>
              <span data-testid="thue-thanh-toan">{dinhDangTien(ketQuaTinhToan.thue)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Phí vận chuyển:</span>
              <span data-testid="phi-van-chuyen">
                {phiVanChuyen === 0 ? 'Miễn phí' : dinhDangTien(phiVanChuyen)}
              </span>
            </div>

            <hr style={{ margin: '1rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Tổng thanh toán:</span>
              <span data-testid="tong-thanh-toan-cuoi" style={{ color: '#2d5016' }}>
                {dinhDangTien(tongThanhToan)}
              </span>
            </div>
          </div>

          <button
            data-testid="nut-xac-nhan-thanh-toan"
            onClick={handleThanhToan}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#2d5016',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThanhToan

