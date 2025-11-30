import { useState, useEffect } from 'react'
import danhSachTestCase from '../du_lieu/danh_sach_test_case.json'
import { xuatExcelTestCase } from '../tien_ich/xuat_excel'
import { luuDanhSachTestCase, docDanhSachTestCase } from '../tien_ich/luu_tru'

function QuanLyTest() {
  const [testCases, setTestCases] = useState([])
  const [locNguoi, setLocNguoi] = useState('tat-ca')
  const [locTrangThai, setLocTrangThai] = useState('tat-ca')
  const [locChucNang, setLocChucNang] = useState('tat-ca')
  const [timKiem, setTimKiem] = useState('')

  useEffect(() => {
    // Đọc dữ liệu từ localStorage nếu có, nếu không dùng dữ liệu mặc định
    const duLieuLuu = docDanhSachTestCase()
    // Nếu file JSON có nhiều test cases hơn localStorage, cập nhật từ file JSON
    if (danhSachTestCase.length > (duLieuLuu?.length || 0)) {
      setTestCases(danhSachTestCase)
      luuDanhSachTestCase(danhSachTestCase)
    } else if (duLieuLuu && duLieuLuu.length > 0) {
      setTestCases(duLieuLuu)
    } else {
      setTestCases(danhSachTestCase)
      luuDanhSachTestCase(danhSachTestCase)
    }
  }, [])

  const capNhatTrangThai = (id, trangThaiMoi) => {
    const capNhat = testCases.map(tc => 
      tc.id === id ? { ...tc, trangThai: trangThaiMoi } : tc
    )
    setTestCases(capNhat)
    luuDanhSachTestCase(capNhat)
  }

  const capNhatGhiChu = (id, ghiChu) => {
    const capNhat = testCases.map(tc => 
      tc.id === id ? { ...tc, ghiChu } : tc
    )
    setTestCases(capNhat)
    luuDanhSachTestCase(capNhat)
  }

  // Lọc và tìm kiếm
  const testCasesLoc = testCases.filter(tc => {
    const dungNguoi = locNguoi === 'tat-ca' || tc.nguoi === locNguoi
    const dungTrangThai = locTrangThai === 'tat-ca' || tc.trangThai === locTrangThai
    const dungChucNang = locChucNang === 'tat-ca' || tc.chucNang === locChucNang
    const dungTimKiem = !timKiem || 
      tc.id.toLowerCase().includes(timKiem.toLowerCase()) ||
      tc.ten.toLowerCase().includes(timKiem.toLowerCase()) ||
      tc.moTa.toLowerCase().includes(timKiem.toLowerCase())
    
    return dungNguoi && dungTrangThai && dungChucNang && dungTimKiem
  })

  const danhSachNguoi = ['tat-ca', ...new Set(testCases.map(tc => tc.nguoi))]
  const danhSachChucNang = ['tat-ca', ...new Set(testCases.map(tc => tc.chucNang))]

  const thongKe = {
    tong: testCases.length,
    pass: testCases.filter(tc => tc.trangThai === 'pass').length,
    fail: testCases.filter(tc => tc.trangThai === 'fail').length,
    skip: testCases.filter(tc => tc.trangThai === 'skip').length,
    chuaTest: testCases.filter(tc => tc.trangThai === 'chua-test').length
  }

  const handleXuatExcel = () => {
    // Xuất tất cả hoặc chỉ các test case đã được test
    const duLieuXuat = locTrangThai === 'tat-ca' 
      ? testCasesLoc 
      : testCasesLoc.filter(tc => tc.trangThai !== 'chua-test')
    
    if (duLieuXuat.length === 0) {
      alert('Không có dữ liệu để xuất Excel!')
      return
    }

    xuatExcelTestCase(duLieuXuat, 'Bao_Cao_Test_Case_GreenMart')
  }

  const handleTaiLaiTuFile = () => {
    // Xóa localStorage và tải lại từ file JSON
    localStorage.removeItem('greenmart_test_case')
    setTestCases(danhSachTestCase)
    luuDanhSachTestCase(danhSachTestCase)
    alert(`Đã tải lại ${danhSachTestCase.length} test cases từ file JSON!`)
  }

  return (
    <div data-testid="trang-quan-ly-test" style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 data-testid="tieu-de-quan-ly-test" style={{ marginBottom: '2rem', color: '#2d5016' }}>
        Quản lý Test Cases - GreenMart
      </h1>

      {/* Thống kê */}
      <div data-testid="thong-ke" style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d5016' }}>{thongKe.tong}</div>
          <div style={{ color: '#666' }}>Tổng số TC</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'green' }}>{thongKe.pass}</div>
          <div style={{ color: '#666' }}>Pass</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'red' }}>{thongKe.fail}</div>
          <div style={{ color: '#666' }}>Fail</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'orange' }}>{thongKe.skip}</div>
          <div style={{ color: '#666' }}>Skip</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#999' }}>{thongKe.chuaTest}</div>
          <div style={{ color: '#666' }}>Chưa Test</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d5016' }}>
            {thongKe.tong > 0 ? ((thongKe.pass / thongKe.tong) * 100).toFixed(1) : 0}%
          </div>
          <div style={{ color: '#666' }}>Tỷ lệ Pass</div>
        </div>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div data-testid="bo-loc" style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Tìm kiếm: </label>
            <input
              data-testid="input-tim-kiem-test"
              type="text"
              placeholder="Tìm theo mã, tên, mô tả..."
              value={timKiem}
              onChange={(e) => setTimKiem(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label>Lọc theo người: </label>
            <select
              data-testid="select-loc-nguoi"
              value={locNguoi}
              onChange={(e) => setLocNguoi(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            >
              {danhSachNguoi.map(nguoi => (
                <option key={nguoi} value={nguoi}>
                  {nguoi === 'tat-ca' ? 'Tất cả' : nguoi}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Lọc theo trạng thái: </label>
            <select
              data-testid="select-loc-trang-thai"
              value={locTrangThai}
              onChange={(e) => setLocTrangThai(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            >
              <option value="tat-ca">Tất cả</option>
              <option value="chua-test">Chưa Test</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
              <option value="skip">Skip</option>
            </select>
          </div>
          <div>
            <label>Lọc theo chức năng: </label>
            <select
              data-testid="select-loc-chuc-nang"
              value={locChucNang}
              onChange={(e) => setLocChucNang(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            >
              {danhSachChucNang.map(cn => (
                <option key={cn} value={cn}>
                  {cn === 'tat-ca' ? 'Tất cả' : cn}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            data-testid="nut-tai-lai-tu-file"
            onClick={handleTaiLaiTuFile}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            🔄 Tải lại từ file ({danhSachTestCase.length} TC)
          </button>
          <button
            data-testid="nut-xuat-excel"
            onClick={handleXuatExcel}
            style={{
              padding: '0.75rem 2rem',
              background: '#2d5016',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            📊 Xuất Excel ({testCasesLoc.length} TC)
          </button>
        </div>
      </div>

      {/* Danh sách test cases */}
      <div data-testid="danh-sach-test-case">
        {testCasesLoc.length > 0 ? (
          testCasesLoc.map((tc, index) => (
            <div
              key={tc.id}
              data-testid={`test-case-${tc.id}`}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${
                  tc.trangThai === 'pass' ? 'green' :
                  tc.trangThai === 'fail' ? 'red' :
                  tc.trangThai === 'skip' ? 'orange' : '#ddd'
                }`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem', color: '#2d5016' }}>
                    {tc.id}: {tc.ten}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span style={{ background: '#f0f0f0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                      👤 {tc.nguoi}
                    </span>
                    <span style={{ background: '#e3f2fd', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                      📋 {tc.chucNang}
                    </span>
                    <span style={{ background: '#fff3e0', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                      🏷️ {tc.loai}
                    </span>
                  </div>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}><strong>Mô tả:</strong> {tc.moTa}</p>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}><strong>Input:</strong> {tc.input}</p>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}><strong>Expected:</strong> {tc.expected}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Trạng thái:</label>
                    <select
                      data-testid={`select-trang-thai-${tc.id}`}
                      value={tc.trangThai}
                      onChange={(e) => capNhatTrangThai(tc.id, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: tc.trangThai === 'pass' ? '#C6EFCE' :
                                   tc.trangThai === 'fail' ? '#FFC7CE' :
                                   tc.trangThai === 'skip' ? '#FFEB9C' : 'white'
                      }}
                    >
                      <option value="chua-test">Chưa Test</option>
                      <option value="pass">Pass</option>
                      <option value="fail">Fail</option>
                      <option value="skip">Skip</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Ghi chú:</label>
                    <textarea
                      data-testid={`textarea-ghi-chu-${tc.id}`}
                      value={tc.ghiChu || ''}
                      onChange={(e) => capNhatGhiChu(tc.id, e.target.value)}
                      placeholder="Nhập ghi chú..."
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        resize: 'vertical',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '8px' }}>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>Không tìm thấy test case nào</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuanLyTest

