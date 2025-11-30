import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import TrangChu from './trang/TrangChu'
import GioHang from './trang/GioHang'
import ThanhToan from './trang/ThanhToan'
import DangNhap from './trang/DangNhap'
import DangKy from './trang/DangKy'
import QuanLyTest from './trang/QuanLyTest'
import ChiTietSanPham from './trang/ChiTietSanPham'
import LichSuMuaHang from './trang/LichSuMuaHang'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [gioHang, setGioHang] = useState([])

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
    }
  }

  const themVaoGioHang = (sanPham) => {
    setGioHang(prev => {
      const tonTai = prev.find(item => item.id === sanPham.id)
      if (tonTai) {
        return prev.map(item =>
          item.id === sanPham.id
            ? { ...item, soLuong: item.soLuong + 1 }
            : item
        )
      }
      return [...prev, { ...sanPham, soLuong: 1 }]
    })
  }

  const capNhatGioHang = (id, soLuong) => {
    if (soLuong <= 0) {
      xoaKhoiGioHang(id)
      return
    }
    setGioHang(prev =>
      prev.map(item =>
        item.id === id ? { ...item, soLuong } : item
      )
    )
  }

  const xoaKhoiGioHang = (id) => {
    setGioHang(prev => prev.filter(item => item.id !== id))
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

      <main data-testid="noi-dung-chinh">
        <Routes>
          <Route path="/" element={<TrangChu themVaoGioHang={themVaoGioHang} chuyenTrang={chuyenTrang} />} />
          <Route path="/gio-hang" element={<GioHang gioHang={gioHang} capNhatGioHang={capNhatGioHang} xoaKhoiGioHang={xoaKhoiGioHang} chuyenTrang={chuyenTrang} />} />
          <Route path="/thanh-toan" element={<ThanhToan gioHang={gioHang} />} />
          <Route path="/dang-nhap" element={<DangNhap chuyenTrang={chuyenTrang} />} />
          <Route path="/dang-ky" element={<DangKy chuyenTrang={chuyenTrang} />} />
          <Route path="/quan-ly-test" element={<QuanLyTest />} />
          <Route path="/lich-su-mua-hang" element={<LichSuMuaHang chuyenTrang={chuyenTrang} />} />
          <Route path="/san-pham/:id" element={<ChiTietSanPham themVaoGioHang={themVaoGioHang} chuyenTrang={chuyenTrang} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

