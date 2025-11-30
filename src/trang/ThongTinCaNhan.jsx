import { useState, useEffect } from 'react'
import { docNguoiDung, docDanhSachTaiKhoan, luuNguoiDung } from '../tien_ich/luu_tru'

function ThongTinCaNhan({ chuyenTrang }) {
  const [thongTin, setThongTin] = useState({
    hoTen: '',
    email: '',
    soDienThoai: ''
  })
  const [loi, setLoi] = useState({})
  const [thongBao, setThongBao] = useState('')

  useEffect(() => {
    const nguoiDung = docNguoiDung()
    if (nguoiDung) {
      setThongTin({
        hoTen: nguoiDung.hoTen || '',
        email: nguoiDung.email || '',
        soDienThoai: nguoiDung.soDienThoai || ''
      })
    } else {
      alert('Vui lòng đăng nhập để xem thông tin cá nhân!')
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

  const handleLuu = (e) => {
    e.preventDefault()
    const loiMoi = {}

    if (!thongTin.hoTen || thongTin.hoTen.trim().length === 0) {
      loiMoi.hoTen = 'Họ tên không được để trống'
    }

    if (!thongTin.email || thongTin.email.trim().length === 0) {
      loiMoi.email = 'Email không được để trống'
    }

    if (!thongTin.soDienThoai || thongTin.soDienThoai.trim().length === 0) {
      loiMoi.soDienThoai = 'Số điện thoại không được để trống'
    }

    if (Object.keys(loiMoi).length > 0) {
      setLoi(loiMoi)
      return
    }

    // Cập nhật thông tin trong danh sách tài khoản
    const danhSachTaiKhoan = docDanhSachTaiKhoan()
    const taiKhoanIndex = danhSachTaiKhoan.findIndex(tk => tk.email === thongTin.email)
    
    if (taiKhoanIndex !== -1) {
      danhSachTaiKhoan[taiKhoanIndex] = {
        ...danhSachTaiKhoan[taiKhoanIndex],
        hoTen: thongTin.hoTen,
        soDienThoai: thongTin.soDienThoai
      }
      
      // Lưu lại danh sách tài khoản
      localStorage.setItem('greenmart_tai_khoan', JSON.stringify(danhSachTaiKhoan))
      
      // Cập nhật thông tin người dùng đã đăng nhập
      luuNguoiDung({
        email: thongTin.email,
        hoTen: thongTin.hoTen,
        soDienThoai: thongTin.soDienThoai
      })
      
      setThongBao('Cập nhật thông tin thành công!')
      setTimeout(() => {
        setThongBao('')
        chuyenTrang('trangChu')
      }, 1500)
    }
  }

  return (
    <div data-testid="trang-thong-tin-ca-nhan" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 data-testid="tieu-de-thong-tin-ca-nhan" style={{ marginBottom: '2rem', color: '#2d5016', textAlign: 'center' }}>
        Thông Tin Cá Nhân
      </h1>

      <form data-testid="form-thong-tin-ca-nhan" onSubmit={handleLuu} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-ho-ten">Họ và tên *</label>
          <input
            data-testid="input-ho-ten"
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
            <p data-testid="loi-ho-ten" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.hoTen}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-email">Email *</label>
          <input
            data-testid="input-email"
            type="email"
            value={thongTin.email}
            disabled
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#f5f5f5',
              color: '#666'
            }}
          />
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            Email không thể thay đổi
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label data-testid="label-so-dien-thoai">Số điện thoại *</label>
          <input
            data-testid="input-so-dien-thoai"
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
            <p data-testid="loi-so-dien-thoai" style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {loi.soDienThoai}
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
            data-testid="nut-luu-thong-tin"
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
            Lưu Thông Tin
          </button>
          <button
            data-testid="nut-huy"
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

export default ThongTinCaNhan

