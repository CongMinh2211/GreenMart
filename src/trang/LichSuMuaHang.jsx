import { useState, useEffect } from 'react'
import { docDanhSachDonHang } from '../tien_ich/luu_tru'
import { dinhDangTien } from '../tien_ich/tinh_toan'

function LichSuMuaHang({ chuyenTrang }) {
  const [danhSachDonHang, setDanhSachDonHang] = useState([])
  const [donHangChiTiet, setDonHangChiTiet] = useState(null)

  useEffect(() => {
    const donHangs = docDanhSachDonHang()
    // Sắp xếp theo thời gian mới nhất
    donHangs.sort((a, b) => new Date(b.thoiGian) - new Date(a.thoiGian))
    setDanhSachDonHang(donHangs)
  }, [])

  const formatNgay = (isoString) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (donHangChiTiet) {
    return (
      <div data-testid="trang-chi-tiet-don-hang" className="container my-5">
        <button
          data-testid="nut-quay-lai-lich-su"
          className="btn btn-secondary mb-3"
          onClick={() => setDonHangChiTiet(null)}
        >
          <i className="fas fa-arrow-left me-2"></i>Quay lại
        </button>

        <div className="card">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">
              <i className="fas fa-receipt me-2"></i>
              Chi tiết đơn hàng #{donHangChiTiet.id}
            </h4>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <h6 className="fw-bold">Thông tin giao hàng:</h6>
                <p className="mb-1"><strong>Họ tên:</strong> {donHangChiTiet.thongTinGiaoHang?.hoTen}</p>
                <p className="mb-1"><strong>Email:</strong> {donHangChiTiet.thongTinGiaoHang?.email}</p>
                <p className="mb-1"><strong>SĐT:</strong> {donHangChiTiet.thongTinGiaoHang?.soDienThoai}</p>
                <p className="mb-0"><strong>Địa chỉ:</strong> {donHangChiTiet.thongTinGiaoHang?.diaChi}</p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold">Thông tin đơn hàng:</h6>
                <p className="mb-1"><strong>Ngày đặt:</strong> {formatNgay(donHangChiTiet.thoiGian)}</p>
                <p className="mb-1"><strong>Vận chuyển:</strong> {donHangChiTiet.thongTinGiaoHang?.loaiVanChuyen === 'nhanh' ? 'Nhanh' : 'Chuẩn'}</p>
                {donHangChiTiet.maGiamGia && (
                  <p className="mb-1"><strong>Mã giảm giá:</strong> {donHangChiTiet.maGiamGia}</p>
                )}
              </div>
            </div>

            <hr />

            <h6 className="fw-bold mb-3">Sản phẩm đã mua:</h6>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {donHangChiTiet.gioHang?.map((sp, index) => (
                    <tr key={index}>
                      <td>{sp.ten}</td>
                      <td>{sp.soLuong}</td>
                      <td>{dinhDangTien(sp.gia)}</td>
                      <td>{dinhDangTien(sp.gia * sp.soLuong)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row mt-3">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <div className="d-flex justify-content-between mb-2">
                  <span>Tổng tiền:</span>
                  <strong>{dinhDangTien(donHangChiTiet.tongTien || 0)}</strong>
                </div>
                {donHangChiTiet.giamGia > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Giảm giá:</span>
                    <strong>-{dinhDangTien(donHangChiTiet.giamGia || 0)}</strong>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Thuế VAT (10%):</span>
                  <strong>{dinhDangTien(donHangChiTiet.thue || 0)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <strong>{dinhDangTien(donHangChiTiet.phiVanChuyen || 0)}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Tổng thanh toán:</span>
                  <strong className="text-success fs-5">{dinhDangTien(donHangChiTiet.tongThanhToan || 0)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="trang-lich-su-mua-hang" className="container my-5">
      <h2 className="mb-4">
        <i className="fas fa-history me-2"></i>
        Lịch sử mua hàng
      </h2>

      {danhSachDonHang.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">Chưa có đơn hàng nào</h4>
          <p className="text-muted">Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
          <button
            data-testid="nut-mua-sam-ngay"
            className="btn btn-success"
            onClick={() => chuyenTrang('trangChu')}
          >
            <i className="fas fa-shopping-cart me-2"></i>Mua sắm ngay
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {danhSachDonHang.map((donHang) => (
            <div key={donHang.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Đơn hàng #{donHang.id.slice(-6)}</span>
                    <span className="badge bg-success">Đã đặt</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <i className="fas fa-calendar me-2"></i>
                    <strong>Ngày đặt:</strong> {formatNgay(donHang.thoiGian)}
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-box me-2"></i>
                    <strong>Số sản phẩm:</strong> {donHang.gioHang?.length || 0}
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <strong>Giao đến:</strong> {donHang.thongTinGiaoHang?.diaChi?.substring(0, 30)}...
                  </p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Tổng tiền:</span>
                    <span className="text-success fs-5 fw-bold">
                      {dinhDangTien(donHang.tongThanhToan || 0)}
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-white">
                  <button
                    data-testid={`nut-xem-chi-tiet-${donHang.id}`}
                    className="btn btn-outline-primary w-100"
                    onClick={() => setDonHangChiTiet(donHang)}
                  >
                    <i className="fas fa-eye me-2"></i>Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LichSuMuaHang

