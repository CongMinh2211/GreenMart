import { useState, useEffect } from 'react'
import TheSanPham from '../thanh_phan/TheSanPham'
import { timKiemSanPham, sapXepSanPham, locTheoLoai, locTheoGia } from '../tien_ich/ho_tro_tim_kiem'
import danhSachSanPham from '../du_lieu/danh_sach_san_pham.json'

function TrangChu({ themVaoGioHang, chuyenTrang }) {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('')
  const [loaiLoc, setLoaiLoc] = useState('tat-ca')
  const [tieuChiSapXep, setTieuChiSapXep] = useState('gia-tang')
  const [giaMin, setGiaMin] = useState('')
  const [giaMax, setGiaMax] = useState('')
  const [sanPhamHienThi, setSanPhamHienThi] = useState(danhSachSanPham)
  const [trangHienTai, setTrangHienTai] = useState(1)
  const soSanPhamMoiTrang = 12

  useEffect(() => {
    let ketQua = [...danhSachSanPham]

    // Tìm kiếm
    if (tuKhoaTimKiem) {
      ketQua = timKiemSanPham(ketQua, tuKhoaTimKiem)
    }

    // Lọc theo loại
    if (loaiLoc !== 'tat-ca') {
      ketQua = locTheoLoai(ketQua, loaiLoc)
    }

    // Lọc theo giá
    const giaMinNum = giaMin ? parseInt(giaMin) : 0
    const giaMaxNum = giaMax ? parseInt(giaMax) : Infinity
    ketQua = locTheoGia(ketQua, giaMinNum, giaMaxNum)

    // Sắp xếp
    ketQua = sapXepSanPham(ketQua, tieuChiSapXep)

    setSanPhamHienThi(ketQua)
    setTrangHienTai(1) // Reset về trang 1 khi filter thay đổi
  }, [tuKhoaTimKiem, loaiLoc, tieuChiSapXep, giaMin, giaMax])

  // Tính toán phân trang
  const tongSoTrang = Math.ceil(sanPhamHienThi.length / soSanPhamMoiTrang)
  const viTriBatDau = (trangHienTai - 1) * soSanPhamMoiTrang
  const viTriKetThuc = viTriBatDau + soSanPhamMoiTrang
  const sanPhamTrangHienTai = sanPhamHienThi.slice(viTriBatDau, viTriKetThuc)

  return (
    <div data-testid="trang-chu" className="container my-5">
      {/* Hero Section */}
      <div className="jumbotron bg-success text-white rounded p-5 mb-5 text-center">
        <h1 data-testid="tieu-de-trang-chu" className="display-4 fw-bold mb-3">
          <i className="fas fa-leaf me-3"></i>
          Chào mừng đến với GreenMart
        </h1>
        <p className="lead">Thực phẩm xanh - Sức khỏe vàng</p>
        <p className="mb-0">Nơi cung cấp thực phẩm hữu cơ tươi ngon, an toàn cho sức khỏe</p>
      </div>

      {/* Thanh tìm kiếm và lọc */}
      <div data-testid="thanh-tim-kiem-va-loc" className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label fw-bold">
                <i className="fas fa-search me-2"></i>Tìm kiếm sản phẩm
              </label>
              <input
                data-testid="input-tim-kiem"
                type="text"
                className="form-control form-control-lg"
                placeholder="Nhập tên sản phẩm..."
                value={tuKhoaTimKiem}
                onChange={(e) => setTuKhoaTimKiem(e.target.value)}
              />
            </div>
            
            <div className="col-md-3">
              <label className="form-label fw-bold">
                <i className="fas fa-filter me-2"></i>Lọc theo loại
              </label>
              <select
                data-testid="select-loc-loai"
                className="form-select"
                value={loaiLoc}
                onChange={(e) => setLoaiLoc(e.target.value)}
              >
                <option value="tat-ca">Tất cả</option>
                <option value="rau-cu">Rau củ</option>
                <option value="trai-cay">Trái cây</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">
                <i className="fas fa-dollar-sign me-2"></i>Giá từ
              </label>
              <input
                data-testid="input-gia-min"
                type="number"
                className="form-control"
                placeholder="0"
                value={giaMin}
                onChange={(e) => setGiaMin(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">đến</label>
              <input
                data-testid="input-gia-max"
                type="number"
                className="form-control"
                placeholder="∞"
                value={giaMax}
                onChange={(e) => setGiaMax(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">
                <i className="fas fa-sort me-2"></i>Sắp xếp
              </label>
              <select
                data-testid="select-sap-xep"
                className="form-select"
                value={tieuChiSapXep}
                onChange={(e) => setTieuChiSapXep(e.target.value)}
              >
                <option value="gia-tang">Giá tăng dần</option>
                <option value="gia-giam">Giá giảm dần</option>
                <option value="ten-a-z">Tên A-Z</option>
                <option value="ten-z-a">Tên Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Kết quả tìm kiếm */}
      <div className="mb-3">
        <p className="text-muted">
          <i className="fas fa-info-circle me-2"></i>
          Tìm thấy <strong>{sanPhamHienThi.length}</strong> sản phẩm
        </p>
      </div>

      {/* Danh sách sản phẩm */}
      {sanPhamHienThi.length > 0 ? (
        <>
          <div 
            data-testid="danh-sach-san-pham"
            className="row g-4"
          >
            {sanPhamTrangHienTai.map(sanPham => (
              <div key={sanPham.id} className="col-md-6 col-lg-4 col-xl-3">
                <TheSanPham
                  sanPham={sanPham}
                  themVaoGioHang={themVaoGioHang}
                  chuyenTrang={chuyenTrang}
                />
              </div>
            ))}
          </div>

          {/* Phân trang */}
          {tongSoTrang > 1 && (
            <nav aria-label="Phân trang sản phẩm" className="mt-5">
              <ul className="pagination justify-content-center" data-testid="phan-trang">
                <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setTrangHienTai(prev => Math.max(1, prev - 1))}
                    data-testid="nut-trang-truoc"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                </li>
                {Array.from({ length: tongSoTrang }, (_, i) => i + 1).map(trang => {
                  if (
                    trang === 1 ||
                    trang === tongSoTrang ||
                    (trang >= trangHienTai - 2 && trang <= trangHienTai + 2)
                  ) {
                    return (
                      <li key={trang} className={`page-item ${trang === trangHienTai ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setTrangHienTai(trang)}
                          data-testid={`nut-trang-${trang}`}
                        >
                          {trang}
                        </button>
                      </li>
                    )
                  } else if (trang === trangHienTai - 3 || trang === trangHienTai + 3) {
                    return (
                      <li key={trang} className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )
                  }
                  return null
                })}
                <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setTrangHienTai(prev => Math.min(tongSoTrang, prev + 1))}
                    data-testid="nut-trang-sau"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
              <p className="text-center text-muted mt-2">
                Trang {trangHienTai} / {tongSoTrang} ({sanPhamHienThi.length} sản phẩm)
              </p>
            </nav>
          )}
        </>
      ) : (
        <div 
          data-testid="thong-bao-khong-tim-thay"
          className="text-center py-5"
        >
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Không tìm thấy sản phẩm nào</h4>
          <p className="text-muted">Vui lòng thử lại với từ khóa khác</p>
        </div>
      )}
    </div>
  )
}

export default TrangChu
