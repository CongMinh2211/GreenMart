import { useState } from 'react'
import { kiemTraEmail, kiemTraMatKhau, kiemTraSoDienThoai, kiemTraTen } from '../tien_ich/kiem_tra_hop_le'
import { luuTaiKhoan } from '../tien_ich/luu_tru'

function DangKy({ chuyenTrang }) {
  const [thongTin, setThongTin] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    matKhau: '',
    xacNhanMatKhau: ''
  })
  const [loi, setLoi] = useState({})
  const [doManhMatKhau, setDoManhMatKhau] = useState(null)
  const [daDangKy, setDaDangKy] = useState(false)
  const [hienMatKhau, setHienMatKhau] = useState(false)

  const handleThayDoi = (truong, giaTri) => {
    setThongTin(prev => ({ ...prev, [truong]: giaTri }))

    // Xóa lỗi khi người dùng nhập lại
    if (loi[truong]) {
      setLoi(prev => ({ ...prev, [truong]: null }))
    }

    // Kiểm tra độ mạnh mật khẩu khi người dùng nhập
    if (truong === 'matKhau') {
      const ketQua = kiemTraMatKhau(giaTri)
      setDoManhMatKhau(ketQua)
    }
  }

  const handleDangKy = (e) => {
    e.preventDefault()
    const loiMoi = {}

    // Kiểm tra họ tên
    const ketQuaTen = kiemTraTen(thongTin.hoTen)
    if (!ketQuaTen.hopLe) {
      loiMoi.hoTen = ketQuaTen.thongBao
    }

    // Kiểm tra email
    const ketQuaEmail = kiemTraEmail(thongTin.email)
    if (!ketQuaEmail.hopLe) {
      loiMoi.email = ketQuaEmail.thongBao
    }

    // Kiểm tra số điện thoại
    const ketQuaSDT = kiemTraSoDienThoai(thongTin.soDienThoai)
    if (!ketQuaSDT.hopLe) {
      loiMoi.soDienThoai = ketQuaSDT.thongBao
    }

    // Kiểm tra mật khẩu
    const ketQuaMatKhau = kiemTraMatKhau(thongTin.matKhau)
    if (!ketQuaMatKhau.hopLe) {
      loiMoi.matKhau = ketQuaMatKhau.thongBao
    }

    // Kiểm tra xác nhận mật khẩu
    if (thongTin.matKhau !== thongTin.xacNhanMatKhau) {
      loiMoi.xacNhanMatKhau = 'Mật khẩu xác nhận không khớp'
    }

    if (Object.keys(loiMoi).length > 0) {
      setLoi(loiMoi)
      return
    }

    // Lưu tài khoản
    const ketQua = luuTaiKhoan({
      email: thongTin.email,
      matKhau: thongTin.matKhau,
      hoTen: thongTin.hoTen,
      soDienThoai: thongTin.soDienThoai
    })

    if (!ketQua) {
      loiMoi.email = 'Email này đã được đăng ký'
      setLoi(loiMoi)
      return
    }

    // Đăng ký thành công
    setDaDangKy(true)
    alert('Đăng ký thành công!')
  }

  if (daDangKy) {
    return (
      <div data-testid="dang-ky-thanh-cong" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 data-testid="tieu-de-dang-ky-thanh-cong" style={{ color: '#2d5016' }}>
          Đăng ký thành công!
        </h1>
        <p data-testid="thong-bao-dang-ky-thanh-cong">
          Chào mừng bạn đến với GreenMart. Vui lòng đăng nhập để tiếp tục.
        </p>
        <button
          data-testid="nut-chuyen-dang-nhap"
          onClick={() => chuyenTrang('dangNhap')}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#2d5016',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Đăng nhập ngay
        </button>
      </div>
    )
  }

  return (
    <div data-testid="trang-dang-ky" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 data-testid="tieu-de-dang-ky" style={{ marginBottom: '2rem', color: '#2d5016', textAlign: 'center' }}>
        Đăng ký tài khoản
      </h1>

      <form data-testid="form-dang-ky" onSubmit={handleDangKy} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-ho-ten-dang-ky">Họ và tên *</label>
          <input
            data-testid="input-ho-ten-dang-ky"
            type="text"
            value={thongTin.hoTen}
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
            <p data-testid="loi-ho-ten-dang-ky" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.hoTen}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-email-dang-ky">Email *</label>
          <input
            data-testid="input-email-dang-ky"
            type="email"
            value={thongTin.email}
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
            <p data-testid="loi-email-dang-ky" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-so-dien-thoai-dang-ky">Số điện thoại *</label>
          <input
            data-testid="input-so-dien-thoai-dang-ky"
            type="tel"
            value={thongTin.soDienThoai}
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
            <p data-testid="loi-so-dien-thoai-dang-ky" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.soDienThoai}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-mat-khau-dang-ky">Mật khẩu *</label>
          <div style={{ position: 'relative', marginTop: '0.5rem' }}>
            <input
              data-testid="input-mat-khau-dang-ky"
              type={hienMatKhau ? "text" : "password"}
              value={thongTin.matKhau}
              onChange={(e) => handleThayDoi('matKhau', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                paddingRight: '2.5rem',
                border: loi.matKhau ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <button
              type="button"
              onClick={() => setHienMatKhau(!hienMatKhau)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <i className={hienMatKhau ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
          {doManhMatKhau && (
            <p
              data-testid="thong-bao-do-manh-mat-khau"
              style={{
                fontSize: '0.9rem',
                marginTop: '0.25rem',
                color: doManhMatKhau.doManh === 'rat-manh' ? 'green' :
                  doManhMatKhau.doManh === 'manh' ? 'blue' :
                    doManhMatKhau.doManh === 'trung-binh' ? 'orange' : 'red'
              }}
            >
              {doManhMatKhau.thongBao}
            </p>
          )}
          {loi.matKhau && (
            <p data-testid="loi-mat-khau-dang-ky" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.matKhau}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-xac-nhan-mat-khau">Xác nhận mật khẩu *</label>
          <div style={{ position: 'relative', marginTop: '0.5rem' }}>
            <input
              data-testid="input-xac-nhan-mat-khau"
              type={hienMatKhau ? "text" : "password"}
              value={thongTin.xacNhanMatKhau}
              onChange={(e) => handleThayDoi('xacNhanMatKhau', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                paddingRight: '2.5rem',
                border: loi.xacNhanMatKhau ? '1px solid red' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <button
              type="button"
              onClick={() => setHienMatKhau(!hienMatKhau)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <i className={hienMatKhau ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
          {loi.xacNhanMatKhau && (
            <p data-testid="loi-xac-nhan-mat-khau" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.xacNhanMatKhau}
            </p>
          )}
        </div>

        <button
          data-testid="nut-dang-ky"
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
          Đăng ký
        </button>

        <p style={{ textAlign: 'center' }}>
          Đã có tài khoản?{' '}
          <button
            data-testid="nut-chuyen-dang-nhap-tu-dang-ky"
            type="button"
            onClick={() => chuyenTrang('dangNhap')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2d5016',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Đăng nhập ngay
          </button>
        </p>
      </form>
    </div>
  )
}

export default DangKy

