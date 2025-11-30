import { useState, useEffect } from 'react'
import { docNguoiDung, docDanhSachTaiKhoan } from '../tien_ich/luu_tru'
import { kiemTraMatKhau } from '../tien_ich/kiem_tra_hop_le'

function DoiMatKhau({ chuyenTrang }) {
  const [thongTin, setThongTin] = useState({
    matKhauCu: '',
    matKhauMoi: '',
    xacNhanMatKhauMoi: ''
  })
  const [loi, setLoi] = useState({})
  const [thongBao, setThongBao] = useState('')
  const [nguoiDung, setNguoiDung] = useState(null)

  useEffect(() => {
    const nguoiDungHienTai = docNguoiDung()
    if (nguoiDungHienTai) {
      setNguoiDung(nguoiDungHienTai)
    } else {
      alert('Vui lòng đăng nhập để đổi mật khẩu!')
      chuyenTrang('dangNhap')
    }
  }, [chuyenTrang])

  const handleThayDoi = (truong, giaTri) => {
    setThongTin(prev => ({ ...prev, [truong]: giaTri }))
    if (loi[truong]) {
      setLoi(prev => ({ ...prev, [truong]: null }))
    }
    setThongBao('')
  }

  const handleDoiMatKhau = (e) => {
    e.preventDefault()
    const loiMoi = {}

    if (!thongTin.matKhauCu || thongTin.matKhauCu.length === 0) {
      loiMoi.matKhauCu = 'Vui lòng nhập mật khẩu cũ'
    }

    if (!thongTin.matKhauMoi || thongTin.matKhauMoi.length === 0) {
      loiMoi.matKhauMoi = 'Vui lòng nhập mật khẩu mới'
    } else {
      const ketQua = kiemTraMatKhauHopLe(thongTin.matKhauMoi)
      if (!ketQua.hopLe) {
        loiMoi.matKhauMoi = ketQua.thongBao
      }
    }

    if (thongTin.matKhauMoi !== thongTin.xacNhanMatKhauMoi) {
      loiMoi.xacNhanMatKhauMoi = 'Mật khẩu xác nhận không khớp'
    }

    if (Object.keys(loiMoi).length > 0) {
      setLoi(loiMoi)
      return
    }

    // Kiểm tra mật khẩu cũ
    if (!nguoiDung || !nguoiDung.email) {
      loiMoi.matKhauCu = 'Không tìm thấy thông tin người dùng'
      setLoi(loiMoi)
      return
    }

    const danhSachTaiKhoan = docDanhSachTaiKhoan()
    const taiKhoan = danhSachTaiKhoan.find(tk => tk.email === nguoiDung.email)
    
    if (!taiKhoan) {
      loiMoi.matKhauCu = 'Không tìm thấy tài khoản'
      setLoi(loiMoi)
      return
    }

    if (taiKhoan.matKhau !== thongTin.matKhauCu) {
      loiMoi.matKhauCu = 'Mật khẩu cũ không đúng'
      setLoi(loiMoi)
      return
    }

    // Cập nhật mật khẩu mới
    const taiKhoanIndex = danhSachTaiKhoan.findIndex(tk => tk.email === nguoiDung.email)
    if (taiKhoanIndex !== -1) {
      danhSachTaiKhoan[taiKhoanIndex] = {
        ...danhSachTaiKhoan[taiKhoanIndex],
        matKhau: thongTin.matKhauMoi
      }
      
      // Lưu lại danh sách tài khoản
      localStorage.setItem('greenmart_tai_khoan', JSON.stringify(danhSachTaiKhoan))
      
      setThongBao('Đổi mật khẩu thành công!')
      setThongTin({
        matKhauCu: '',
        matKhauMoi: '',
        xacNhanMatKhauMoi: ''
      })
      
      setTimeout(() => {
        setThongBao('')
        chuyenTrang('trangChu')
      }, 1500)
    }
  }

  return (
    <div data-testid="trang-doi-mat-khau" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 data-testid="tieu-de-doi-mat-khau" style={{ marginBottom: '2rem', color: '#2d5016', textAlign: 'center' }}>
        Đổi Mật Khẩu
      </h1>

      <form data-testid="form-doi-mat-khau" onSubmit={handleDoiMatKhau} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-mat-khau-cu">Mật khẩu cũ *</label>
          <input
            data-testid="input-mat-khau-cu"
            type="password"
            value={thongTin.matKhauCu}
            onChange={(e) => handleThayDoi('matKhauCu', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: loi.matKhauCu ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {loi.matKhauCu && (
            <p data-testid="loi-mat-khau-cu" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.matKhauCu}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-mat-khau-moi">Mật khẩu mới *</label>
          <input
            data-testid="input-mat-khau-moi"
            type="password"
            value={thongTin.matKhauMoi}
            onChange={(e) => handleThayDoi('matKhauMoi', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: loi.matKhauMoi ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {loi.matKhauMoi && (
            <p data-testid="loi-mat-khau-moi" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.matKhauMoi}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-xac-nhan-mat-khau-moi">Xác nhận mật khẩu mới *</label>
          <input
            data-testid="input-xac-nhan-mat-khau-moi"
            type="password"
            value={thongTin.xacNhanMatKhauMoi}
            onChange={(e) => handleThayDoi('xacNhanMatKhauMoi', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: loi.xacNhanMatKhauMoi ? '1px solid red' : '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          {loi.xacNhanMatKhauMoi && (
            <p data-testid="loi-xac-nhan-mat-khau-moi" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.xacNhanMatKhauMoi}
            </p>
          )}
        </div>

        {thongBao && (
          <div style={{
            padding: '0.75rem',
            background: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {thongBao}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            data-testid="nut-doi-mat-khau"
            type="submit"
            style={{
              flex: 1,
              padding: '1rem',
              background: '#2d5016',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Đổi Mật Khẩu
          </button>
          <button
            data-testid="nut-huy-doi-mat-khau"
            type="button"
            onClick={() => chuyenTrang('trangChu')}
            style={{
              flex: 1,
              padding: '1rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoiMatKhau

