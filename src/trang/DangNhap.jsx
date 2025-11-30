import { useState } from 'react'
import { kiemTraEmail, kiemTraMatKhau } from '../tien_ich/kiem_tra_hop_le'
import { kiemTraDangNhap, luuNguoiDung } from '../tien_ich/luu_tru'

function DangNhap({ chuyenTrang, setNguoiDung }) {
  const [email, setEmail] = useState('')
  const [matKhau, setMatKhau] = useState('')
  const [loi, setLoi] = useState({})
  const [daDangNhap, setDaDangNhap] = useState(false)

  const handleDangNhap = (e) => {
    e.preventDefault()
    const loiMoi = {}

    // Kiểm tra email
    const ketQuaEmail = kiemTraEmail(email)
    if (!ketQuaEmail.hopLe) {
      loiMoi.email = ketQuaEmail.thongBao
    }

    // Kiểm tra mật khẩu
    if (!matKhau || matKhau.length === 0) {
      loiMoi.matKhau = 'Mật khẩu không được để trống'
    }

    if (Object.keys(loiMoi).length > 0) {
      setLoi(loiMoi)
      return
    }

    // Kiểm tra tài khoản đã đăng ký
    const taiKhoan = kiemTraDangNhap(email, matKhau)
    
    if (!taiKhoan) {
      loiMoi.email = 'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới.'
      setLoi(loiMoi)
      return
    }

    // Lưu thông tin người dùng đã đăng nhập
    const thongTinNguoiDung = {
      email: taiKhoan.email,
      hoTen: taiKhoan.hoTen,
      soDienThoai: taiKhoan.soDienThoai
    }
    luuNguoiDung(thongTinNguoiDung)

    // Cập nhật state trong App.jsx
    if (setNguoiDung) {
      setNguoiDung(thongTinNguoiDung)
    }

    // Đăng nhập thành công
    setDaDangNhap(true)
    alert('Đăng nhập thành công!')
    chuyenTrang('trangChu')
  }

  if (daDangNhap) {
    return (
      <div data-testid="dang-nhap-thanh-cong" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 data-testid="tieu-de-dang-nhap-thanh-cong" style={{ color: '#2d5016' }}>
          Đăng nhập thành công!
        </h1>
        <p data-testid="thong-bao-dang-nhap-thanh-cong">Chào mừng bạn quay trở lại GreenMart</p>
      </div>
    )
  }

  return (
    <div data-testid="trang-dang-nhap" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 data-testid="tieu-de-dang-nhap" style={{ marginBottom: '2rem', color: '#2d5016', textAlign: 'center' }}>
        Đăng nhập
      </h1>

      <form data-testid="form-dang-nhap" onSubmit={handleDangNhap} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-email-dang-nhap">Email *</label>
          <input
            data-testid="input-email-dang-nhap"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (loi.email) setLoi(prev => ({ ...prev, email: null }))
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: loi.email ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {loi.email && (
            <p data-testid="loi-email-dang-nhap" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-mat-khau-dang-nhap">Mật khẩu *</label>
          <input
            data-testid="input-mat-khau-dang-nhap"
            type="password"
            value={matKhau}
            onChange={(e) => {
              setMatKhau(e.target.value)
              if (loi.matKhau) setLoi(prev => ({ ...prev, matKhau: null }))
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: loi.matKhau ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {loi.matKhau && (
            <p data-testid="loi-mat-khau-dang-nhap" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.matKhau}
            </p>
          )}
        </div>

        <button
          data-testid="nut-dang-nhap"
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            background: '#2d5016',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}
        >
          Đăng nhập
        </button>

        <p style={{ textAlign: 'center' }}>
          Chưa có tài khoản?{' '}
          <button
            data-testid="nut-chuyen-dang-ky"
            type="button"
            onClick={() => chuyenTrang('dangKy')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2d5016',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Đăng ký ngay
          </button>
        </p>
      </form>
    </div>
  )
}

export default DangNhap

