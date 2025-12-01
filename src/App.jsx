import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import TrangChu from './trang/TrangChu'
import GioHang from './trang/GioHang'
import ThanhToan from './trang/ThanhToan'
import DangNhap from './trang/DangNhap'
import DangKy from './trang/DangKy'
import QuanLyTest from './trang/QuanLyTest'
import ChiTietSanPham from './trang/ChiTietSanPham'
import LichSuMuaHang from './trang/LichSuMuaHang'
import ThongTinCaNhan from './trang/ThongTinCaNhan'
import DoiMatKhau from './trang/DoiMatKhau'
import { docNguoiDung, xoaNguoiDung } from './tien_ich/luu_tru'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [gioHang, setGioHang] = useState(() => {
    const savedCart = docGioHang()
    return savedCart || []
  })
  const [nguoiDung, setNguoiDung] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // Kiểm tra người dùng đã đăng nhập chưa
    const nguoiDungHienTai = docNguoiDung()
    setNguoiDung(nguoiDungHienTai)
  }, [location.pathname])

  // Lưu giỏ hàng vào LocalStorage khi thay đổi
  useEffect(() => {
    luuGioHang(gioHang)
  }, [gioHang])

  // Sync giỏ hàng giữa các tab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'greenmart_gio_hang') {
        const newCart = docGioHang()
        setGioHang(newCart)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleDangXuat = () => {
    xoaNguoiDung()
    setNguoiDung(null)
    setShowDropdown(false)
    chuyenTrang('trangChu')
    alert('Đã đăng xuất thành công!')
  }

  const chuyenTrang = (trang, idSanPham = null) => {
    if (trang === 'chiTietSanPham' && idSanPham) {
      navigate(`/san-pham/${idSanPham}`)
    } else if (trang === 'trangChu') {
      navigate('/')
    } else if (trang === 'gioHang') {
      navigate('/gio-hang')
    } else if (trang === 'thanhToan') {
      navigate('/thanh-toan')
    } else if (trang === 'dangNhap') {
      navigate('/dang-nhap')
    } else if (trang === 'dangKy') {
      navigate('/dang-ky')
    } else if (trang === 'quanLyTest') {
      navigate('/quan-ly-test')
    } else if (trang === 'lichSuMuaHang') {
      navigate('/lich-su-mua-hang')
    } else if (trang === 'thongTinCaNhan') {
      navigate('/thong-tin-ca-nhan')
    } else if (trang === 'doiMatKhau') {
      navigate('/doi-mat-khau')
    }
  }

  const themVaoGioHang = (sanPham) => {
    setGioHang(prev => {
      const tonTai = prev.find(item => item.id === sanPham.id)
      if (tonTai) {
        // Kiểm tra tồn kho
        if (tonTai.soLuong + 1 > sanPham.tonKho) {
          alert(`Sản phẩm ${sanPham.ten} chỉ còn ${sanPham.tonKho} sản phẩm!`)
          return prev
        }
        return prev.map(item =>
          item.id === sanPham.id
            ? { ...item, soLuong: item.soLuong + 1 }
            : item
        )
      }
      // Kiểm tra tồn kho cho sản phẩm mới
      if (1 > sanPham.tonKho) {
        alert(`Sản phẩm ${sanPham.ten} đã hết hàng!`)
        return prev
      }
      return [...prev, { ...sanPham, soLuong: 1 }]
    })
    alert('Đã thêm vào giỏ hàng!')
  }

  const capNhatGioHang = (id, soLuong) => {
    if (soLuong <= 0) {
      xoaKhoiGioHang(id)
      return
    }

    setGioHang(prev => {
      const item = prev.find(i => i.id === id)
      if (item && soLuong > item.tonKho) {
        alert(`Sản phẩm ${item.ten} chỉ còn ${item.tonKho} sản phẩm!`)
        return prev.map(i => i.id === id ? { ...i, soLuong: item.tonKho } : i)
      }
      return prev.map(item =>
        item.id === id ? { ...item, soLuong } : item
      )
    })
  }

  const xoaKhoiGioHang = (id) => {
    setGioHang(prev => prev.filter(item => item.id !== id))
  }

  const xoaHetGioHang = () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      setGioHang([])
    }
  }

  return (
    <div data-testid="app-container">
      <nav data-testid="thanh-dieu-huong" className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/" onClick={(e) => { e.preventDefault(); chuyenTrang('trangChu') }} data-testid="logo">
            <i className="fas fa-leaf me-2"></i>GreenMart
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                  href="/"
                  onClick={(e) => { e.preventDefault(); chuyenTrang('trangChu') }}
                  data-testid="nut-trang-chu"
                >
                  <i className="fas fa-home me-1"></i>Trang Chủ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === '/gio-hang' ? 'active' : ''}`}
                  href="/gio-hang"
                  onClick={(e) => { e.preventDefault(); chuyenTrang('gioHang') }}
                  data-testid="nut-gio-hang"
                >
                  <i className="fas fa-shopping-cart me-1"></i>Giỏ Hàng
                  {gioHang.length > 0 && <span className="badge bg-danger ms-1">{gioHang.length}</span>}
                </a>
              </li>
              {!nguoiDung ? (
                <>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${location.pathname === '/dang-nhap' ? 'active' : ''}`}
                      href="/dang-nhap"
                      onClick={(e) => { e.preventDefault(); chuyenTrang('dangNhap') }}
                      data-testid="nut-dang-nhap"
                    >
                      <i className="fas fa-sign-in-alt me-1"></i>Đăng Nhập
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${location.pathname === '/dang-ky' ? 'active' : ''}`}
                      href="/dang-ky"
                      onClick={(e) => { e.preventDefault(); chuyenTrang('dangKy') }}
                      data-testid="nut-dang-ky"
                    >
                      <i className="fas fa-user-plus me-1"></i>Đăng Ký
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown" style={{ position: 'relative' }}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowDropdown(!showDropdown)
                    }}
                    data-testid="nut-nguoi-dung"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-user me-1"></i>{nguoiDung.hoTen || nguoiDung.email}
                  </a>
                  {showDropdown && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        zIndex: 1000,
                        background: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        minWidth: '200px'
                      }}
                      data-testid="dropdown-menu-nguoi-dung"
                    >
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowDropdown(false)
                          chuyenTrang('thongTinCaNhan')
                        }}
                        data-testid="nut-thong-tin-ca-nhan"
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                      >
                        <i className="fas fa-user-circle me-2"></i>Thông Tin Cá Nhân
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowDropdown(false)
                          chuyenTrang('doiMatKhau')
                        }}
                        data-testid="nut-doi-mat-khau"
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                      >
                        <i className="fas fa-key me-2"></i>Đổi Mật Khẩu
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowDropdown(false)
                          handleDangXuat()
                        }}
                        data-testid="nut-dang-xuat"
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', color: 'red' }}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>Đăng Xuất
                      </a>
                    </div>
                  )}
                </li>
              )}
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === '/lich-su-mua-hang' ? 'active' : ''}`}
                  href="/lich-su-mua-hang"
                  onClick={(e) => { e.preventDefault(); chuyenTrang('lichSuMuaHang') }}
                  data-testid="nut-lich-su-mua-hang"
                >
                  <i className="fas fa-history me-1"></i>Lịch Sử
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={`nav-link text-warning ${location.pathname === '/quan-ly-test' ? 'active' : ''}`}
                  href="/quan-ly-test"
                  onClick={(e) => { e.preventDefault(); chuyenTrang('quanLyTest') }}
                  data-testid="nut-quan-ly-test"
                >
                  <i className="fas fa-clipboard-list me-1"></i>Quản Lý Test
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main data-testid="noi-dung-chinh" onClick={() => setShowDropdown(false)}>
        <Routes>
          <Route path="/" element={<TrangChu themVaoGioHang={themVaoGioHang} chuyenTrang={chuyenTrang} />} />
          <Route path="/gio-hang" element={<GioHang gioHang={gioHang} capNhatGioHang={capNhatGioHang} xoaKhoiGioHang={xoaKhoiGioHang} xoaHetGioHang={xoaHetGioHang} chuyenTrang={chuyenTrang} />} />
          <Route path="/thanh-toan" element={<ThanhToan gioHang={gioHang} />} />
          <Route path="/dang-nhap" element={<DangNhap chuyenTrang={chuyenTrang} setNguoiDung={setNguoiDung} />} />
          <Route path="/dang-ky" element={<DangKy chuyenTrang={chuyenTrang} />} />
          <Route path="/quan-ly-test" element={<QuanLyTest />} />
          <Route path="/lich-su-mua-hang" element={<LichSuMuaHang chuyenTrang={chuyenTrang} />} />
          <Route path="/san-pham/:id" element={<ChiTietSanPham themVaoGioHang={themVaoGioHang} chuyenTrang={chuyenTrang} />} />
          <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhan chuyenTrang={chuyenTrang} />} />
          <Route path="/doi-mat-khau" element={<DoiMatKhau chuyenTrang={chuyenTrang} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

