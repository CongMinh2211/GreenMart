import { useState } from 'react'

function TheSanPham({ sanPham, themVaoGioHang, chuyenTrang }) {
  const [soLuong, setSoLuong] = useState(1)

  const handleThemVaoGioHang = () => {
    if (soLuong > 0 && soLuong <= sanPham.tonKho) {
      themVaoGioHang({ ...sanPham, soLuong })
      setSoLuong(1)
    }
  }

  const handleXemChiTiet = () => {
    chuyenTrang('chiTietSanPham', sanPham.id)
  }

  const hienThiSao = (soSao) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.floor(soSao) ? 'text-warning' : 'text-secondary'}`}
        style={{ fontSize: '0.8rem' }}
      />
    ))
  }

  return (
    <div 
      data-testid={`the-san-pham-${sanPham.id}`}
      className="card h-100 shadow-sm"
    >
      <div className="position-relative">
        <img 
          data-testid={`anh-san-pham-${sanPham.id}`}
          src={sanPham.anh} 
          alt={sanPham.ten}
          className="card-img-top"
          style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
          onClick={handleXemChiTiet}
        />
        <span className="position-absolute top-0 end-0 m-2 badge bg-success">
          <i className="fas fa-check-circle me-1"></i>Còn hàng
        </span>
        {sanPham.danhGia >= 4.5 && (
          <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark">
            <i className="fas fa-star me-1"></i>Hot
          </span>
        )}
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 
          data-testid={`ten-san-pham-${sanPham.id}`}
          className="card-title"
          style={{ minHeight: '48px', cursor: 'pointer' }}
          onClick={handleXemChiTiet}
        >
          {sanPham.ten}
        </h5>
        
        <div className="mb-2">
          <div className="d-flex align-items-center mb-1">
            {hienThiSao(sanPham.danhGia)}
            <small className="text-muted ms-2">({sanPham.danhGia})</small>
          </div>
        </div>

        <p 
          data-testid={`gia-san-pham-${sanPham.id}`}
          className="text-danger fw-bold fs-4 mb-2"
        >
          {new Intl.NumberFormat('vi-VN').format(sanPham.gia)} đ
          <small className="text-muted fs-6 ms-1">/{sanPham.donVi}</small>
        </p>

        <p 
          data-testid={`loai-san-pham-${sanPham.id}`}
          className="text-muted small mb-3"
        >
          <i className={`fas ${sanPham.loai === 'rau-cu' ? 'fa-carrot' : 'fa-apple-alt'} me-1`}></i>
          {sanPham.loai === 'rau-cu' ? 'Rau củ' : 'Trái cây'}
        </p>

        <div className="input-group mb-3" style={{ maxWidth: '150px' }}>
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => setSoLuong(Math.max(1, soLuong - 1))}
          >
            <i className="fas fa-minus"></i>
          </button>
          <input
            data-testid={`input-so-luong-${sanPham.id}`}
            type="number"
            className="form-control form-control-sm text-center"
            min="1"
            max={sanPham.tonKho}
            value={soLuong}
            onChange={(e) => {
              const giaTri = parseInt(e.target.value) || 1
              setSoLuong(Math.min(Math.max(1, giaTri), sanPham.tonKho))
            }}
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => setSoLuong(Math.min(sanPham.tonKho, soLuong + 1))}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="d-grid gap-2 mt-auto">
          <button
            data-testid={`nut-them-vao-gio-${sanPham.id}`}
            onClick={handleThemVaoGioHang}
            className="btn btn-success"
            disabled={soLuong <= 0 || soLuong > sanPham.tonKho}
          >
            <i className="fas fa-cart-plus me-2"></i>
            Thêm vào giỏ
          </button>
          <button
            data-testid={`nut-xem-chi-tiet-${sanPham.id}`}
            onClick={handleXemChiTiet}
            className="btn btn-outline-primary"
          >
            <i className="fas fa-eye me-2"></i>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  )
}

export default TheSanPham
