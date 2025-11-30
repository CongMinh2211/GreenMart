import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import danhSachSanPham from '../du_lieu/danh_sach_san_pham.json'

function ChiTietSanPham({ themVaoGioHang }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sanPham, setSanPham] = useState(null)
  const [soLuong, setSoLuong] = useState(1)
  const [zoomAnh, setZoomAnh] = useState(false)

  useEffect(() => {
    const timSanPham = danhSachSanPham.find(sp => sp.id === parseInt(id))
    if (timSanPham) {
      setSanPham(timSanPham)
    } else {
      navigate('/')
    }
  }, [id, navigate])

  if (!sanPham) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      </div>
    )
  }

  const handleThemVaoGioHang = () => {
    if (soLuong > 0 && soLuong <= sanPham.tonKho) {
      themVaoGioHang({ ...sanPham, soLuong })
      alert(`Đã thêm ${soLuong} ${sanPham.donVi} ${sanPham.ten} vào giỏ hàng!`)
    }
  }

  const hienThiSao = (soSao) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.floor(soSao) ? 'text-warning' : 'text-secondary'}`}
      />
    ))
  }

  return (
    <div data-testid="trang-chi-tiet-san-pham" className="container my-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }} style={{ cursor: 'pointer' }}>
              <i className="fas fa-home me-1"></i>Trang chủ
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{sanPham.ten}</li>
        </ol>
      </nav>

      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6 mb-4">
          <div className="position-relative" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <img
              data-testid={`anh-san-pham-chi-tiet-${sanPham.id}`}
              src={sanPham.anh}
              alt={sanPham.ten}
              className="img-fluid rounded shadow-sm"
              style={{ cursor: 'pointer', width: '100%', height: '500px', objectFit: 'contain' }}
              onClick={() => setZoomAnh(true)}
            />
            <div className="position-absolute top-0 end-0 m-3">
              <span className="badge bg-success fs-6">
                <i className="fas fa-check-circle me-1"></i>Còn hàng
              </span>
            </div>
          </div>

          {/* Đánh giá */}
          <div className="mt-3 d-flex align-items-center">
            <div className="me-2">
              {hienThiSao(sanPham.danhGia)}
            </div>
            <span className="text-muted">
              {sanPham.danhGia} ({sanPham.soLuongDanhGia} đánh giá)
            </span>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h1 data-testid={`ten-san-pham-chi-tiet-${sanPham.id}`} className="mb-3 text-success">
            {sanPham.ten}
          </h1>

          <div className="mb-3">
            <h2 className="text-danger fw-bold">
              {new Intl.NumberFormat('vi-VN').format(sanPham.gia)} đ
              <small className="text-muted fs-6 ms-2">/{sanPham.donVi}</small>
            </h2>
          </div>

          <div className="mb-4">
            <p className="lead" data-testid={`mo-ta-chi-tiet-${sanPham.id}`}>
              {sanPham.moTa}
            </p>
          </div>

          <div className="mb-4">
            <div className="row g-3">
              <div className="col-6">
                <div className="card border-success">
                  <div className="card-body text-center">
                    <i className="fas fa-box text-success fs-4 mb-2"></i>
                    <div className="fw-bold">Tồn kho</div>
                    <div className="text-success">{sanPham.tonKho} {sanPham.donVi}</div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card border-info">
                  <div className="card-body text-center">
                    <i className="fas fa-leaf text-info fs-4 mb-2"></i>
                    <div className="fw-bold">Loại</div>
                    <div className="text-info">
                      {sanPham.loai === 'rau-cu' ? 'Rau củ' : 'Trái cây'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              <i className="fas fa-shopping-cart me-2"></i>Số lượng:
            </label>
            <div className="input-group" style={{ maxWidth: '200px' }}>
              <button
                data-testid={`nut-giam-so-luong-${sanPham.id}`}
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSoLuong(Math.max(1, soLuong - 1))}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input
                data-testid={`input-so-luong-chi-tiet-${sanPham.id}`}
                type="number"
                className="form-control text-center"
                min="1"
                max={sanPham.tonKho}
                value={soLuong}
                onChange={(e) => {
                  const giaTri = parseInt(e.target.value) || 1
                  setSoLuong(Math.min(Math.max(1, giaTri), sanPham.tonKho))
                }}
              />
              <button
                data-testid={`nut-tang-so-luong-${sanPham.id}`}
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSoLuong(Math.min(sanPham.tonKho, soLuong + 1))}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <small className="text-muted">
              Tối đa: {sanPham.tonKho} {sanPham.donVi}
            </small>
          </div>

          {/* Nút thêm vào giỏ */}
          <div className="d-grid gap-2 d-md-flex">
            <button
              data-testid={`nut-them-vao-gio-chi-tiet-${sanPham.id}`}
              className="btn btn-success btn-lg flex-fill"
              onClick={handleThemVaoGioHang}
              disabled={soLuong <= 0 || soLuong > sanPham.tonKho}
            >
              <i className="fas fa-cart-plus me-2"></i>
              Thêm vào giỏ hàng
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate('/gio-hang')}
            >
              <i className="fas fa-shopping-bag me-2"></i>
              Xem giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Modal zoom ảnh */}
      {zoomAnh && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setZoomAnh(false)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                onClick={() => setZoomAnh(false)}
                aria-label="Close"
              ></button>
              <img
                src={sanPham.anh}
                alt={sanPham.ten}
                className="img-fluid rounded"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChiTietSanPham

