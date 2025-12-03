import { useState } from 'react'
import { tinhTongTien, dinhDangTien } from '../tien_ich/tinh_toan'

function GioHang({ gioHang, capNhatGioHang, xoaKhoiGioHang, xoaHetGioHang, chuyenTrang }) {
  const [maGiamGia, setMaGiamGia] = useState('')
  const ketQuaTinhToan = tinhTongTien(gioHang, maGiamGia)

  if (gioHang.length === 0) {
    return (
      <div data-testid="gio-hang-rong" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 data-testid="tieu-de-gio-hang-rong">Giỏ hàng trống</h2>
        <p data-testid="thong-bao-gio-hang-rong">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <button
          data-testid="nut-mua-sam-ngay"
          onClick={() => chuyenTrang('trangChu')}
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
          Mua sắm ngay
        </button>
      </div>
    )
  }

  return (
    <div data-testid="trang-gio-hang" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 data-testid="tieu-de-gio-hang" style={{ color: '#2d5016', margin: 0 }}>
          Giỏ hàng của bạn
        </h1>
        {gioHang.length > 0 && (
          <button
            data-testid="nut-xoa-tat-ca"
            onClick={xoaHetGioHang}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Xóa tất cả
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Danh sách sản phẩm */}
        <div data-testid="danh-sach-san-pham-gio-hang">
          <table className="table" style={{ background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {gioHang.map(sanPham => (
                <tr
                  key={sanPham.id}
                  data-testid={`san-pham-gio-hang-${sanPham.id}`}
                >
                  <td>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img
                        src={sanPham.anh}
                        alt={sanPham.ten}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <h5
                        data-testid={`ten-san-pham-gio-hang-${sanPham.id}`}
                        onClick={() => chuyenTrang('chiTietSanPham', sanPham.id)}
                        style={{ cursor: 'pointer', color: '#2d5016', margin: 0 }}
                      >
                        {sanPham.ten}
                      </h5>
                    </div>
                  </td>
                  <td>
                    <p data-testid={`gia-san-pham-gio-hang-${sanPham.id}`} style={{ margin: 0 }}>
                      {dinhDangTien(sanPham.gia)} / sản phẩm
                    </p>
                  </td>
                  <td>
                    <input
                      data-testid={`input-so-luong-gio-hang-${sanPham.id}`}
                      type="number"
                      min="1"
                      value={sanPham.soLuong}
                      onChange={(e) => capNhatGioHang(sanPham.id, parseInt(e.target.value) || 1)}
                      style={{ width: '60px', padding: '0.25rem' }}
                      max={sanPham.tonKho}
                    />
                    <small style={{ display: 'block', color: '#666', marginTop: '0.25rem' }}>
                      Còn: {sanPham.tonKho}
                    </small>
                  </td>
                  <td>
                    <button
                      data-testid={`nut-xoa-san-pham-${sanPham.id}`}
                      onClick={() => xoaKhoiGioHang(sanPham.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div data-testid="tom-tat-don-hang" style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          height: 'fit-content',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 data-testid="tieu-de-tom-tat" style={{ marginBottom: '1rem' }}>Tóm tắt đơn hàng</h2>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tổng tiền:</span>
              <span data-testid="tong-tien">{dinhDangTien(ketQuaTinhToan.tongTien)}</span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label>Mã giảm giá:</label>
              <input
                data-testid="input-ma-giam-gia"
                type="text"
                value={maGiamGia}
                onChange={(e) => setMaGiamGia(e.target.value)}
                placeholder="Nhập mã giảm giá"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>

            {ketQuaTinhToan.giamGia > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'green' }}>
                <span>Giảm giá:</span>
                <span data-testid="giam-gia">-{dinhDangTien(ketQuaTinhToan.giamGia)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Thuế VAT (10%):</span>
              <span data-testid="thue">{dinhDangTien(ketQuaTinhToan.thue)}</span>
            </div>

            <hr style={{ margin: '1rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Tổng thanh toán:</span>
              <span data-testid="tong-thanh-toan" style={{ color: '#2d5016' }}>
                {dinhDangTien(ketQuaTinhToan.tongThanhToan)}
              </span>
            </div>
          </div>

          <button
            data-testid="nut-thanh-toan"
            onClick={() => chuyenTrang('thanhToan')}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#2d5016',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default GioHang

