/**
 * File xuat_excel.js - Chứa hàm xuất dữ liệu test case ra file Excel
 */

/**
 * Xuất danh sách test case ra file Excel
 * @param {Array} danhSachTestCase - Mảng các test case
 * @param {string} tenFile - Tên file Excel (không cần .xlsx)
 */
export async function xuatExcelTestCase(danhSachTestCase, tenFile = 'Bao_Cao_Test_Case') {
  try {
    // Import động xlsx
    const xlsxModule = await import('xlsx')
    // Xử lý cả default export và named export
    const XLSX = xlsxModule.default || xlsxModule
    // Tạo workbook mới
    const wb = XLSX.utils.book_new()

    // Chuẩn bị dữ liệu cho sheet
    const duLieu = danhSachTestCase.map((tc, index) => ({
      'STT': index + 1,
      'Mã Test Case': tc.id,
      'Tên Test Case': tc.ten,
      'Người Test': tc.nguoi,
      'Chức năng': tc.chucNang,
      'Loại Test': tc.loai,
      'Mô tả': tc.moTa,
      'Input': tc.input,
      'Expected': tc.expected,
      'Trạng thái': tc.trangThai === 'pass' ? 'PASS' : 
                    tc.trangThai === 'fail' ? 'FAIL' : 
                    tc.trangThai === 'skip' ? 'SKIP' : 'CHƯA TEST',
      'Ghi chú': tc.ghiChu || ''
    }))

    // Tạo worksheet từ dữ liệu
    const ws = XLSX.utils.json_to_sheet(duLieu)

    // Đặt độ rộng cột
    ws['!cols'] = [
      { wch: 5 },   // STT
      { wch: 15 },  // Mã Test Case
      { wch: 40 },  // Tên Test Case
      { wch: 12 },  // Người Test
      { wch: 25 },  // Chức năng
      { wch: 12 },  // Loại Test
      { wch: 30 },  // Mô tả
      { wch: 40 },  // Input
      { wch: 40 },  // Expected
      { wch: 12 },  // Trạng thái
      { wch: 30 }   // Ghi chú
    ]

    // Style cho header row
    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '2d5016' } },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
      }
    }

    // Áp dụng style cho header (row 1)
    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C })
      if (!ws[cellAddress]) continue
      ws[cellAddress].s = headerStyle
    }

    // Style cho các dòng dữ liệu
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C })
        if (!ws[cellAddress]) continue
        
        // Style mặc định
        ws[cellAddress].s = {
          alignment: { vertical: 'top', wrapText: true },
          border: {
            top: { style: 'thin', color: { rgb: 'CCCCCC' } },
            bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
            left: { style: 'thin', color: { rgb: 'CCCCCC' } },
            right: { style: 'thin', color: { rgb: 'CCCCCC' } }
          }
        }

        // Màu nền theo trạng thái (cột Trạng thái - cột 9)
        if (C === 9) {
          const trangThai = ws[cellAddress].v
          if (trangThai === 'PASS') {
            ws[cellAddress].s.fill = { fgColor: { rgb: 'C6EFCE' } }
            ws[cellAddress].s.font = { color: { rgb: '006100' }, bold: true }
          } else if (trangThai === 'FAIL') {
            ws[cellAddress].s.fill = { fgColor: { rgb: 'FFC7CE' } }
            ws[cellAddress].s.font = { color: { rgb: '9C0006' }, bold: true }
          } else if (trangThai === 'SKIP') {
            ws[cellAddress].s.fill = { fgColor: { rgb: 'FFEB9C' } }
            ws[cellAddress].s.font = { color: { rgb: '9C6500' }, bold: true }
          }
        }
      }
    }

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Test Cases')

    // Tạo sheet tổng kết
    const tongKet = [
      { 'Chỉ số': 'Tổng số Test Case', 'Giá trị': danhSachTestCase.length },
      { 'Chỉ số': 'Đã Pass', 'Giá trị': danhSachTestCase.filter(tc => tc.trangThai === 'pass').length },
      { 'Chỉ số': 'Đã Fail', 'Giá trị': danhSachTestCase.filter(tc => tc.trangThai === 'fail').length },
      { 'Chỉ số': 'Đã Skip', 'Giá trị': danhSachTestCase.filter(tc => tc.trangThai === 'skip').length },
      { 'Chỉ số': 'Chưa Test', 'Giá trị': danhSachTestCase.filter(tc => tc.trangThai === 'chua-test').length },
      { 'Chỉ số': 'Tỷ lệ Pass', 'Giá trị': `${((danhSachTestCase.filter(tc => tc.trangThai === 'pass').length / danhSachTestCase.length) * 100).toFixed(1)}%` }
    ]

    const wsTongKet = XLSX.utils.json_to_sheet(tongKet)
    wsTongKet['!cols'] = [{ wch: 20 }, { wch: 15 }]
    XLSX.utils.book_append_sheet(wb, wsTongKet, 'Tổng kết')

    // Xuất file
    const ngayXuat = new Date().toISOString().split('T')[0].replace(/-/g, '')
    const tenFileDayDu = `${tenFile}_${ngayXuat}.xlsx`
    XLSX.writeFile(wb, tenFileDayDu)

    alert(`Đã xuất file Excel thành công: ${tenFileDayDu}`)
  } catch (error) {
    console.error('Lỗi khi xuất Excel:', error)
    alert('Lỗi khi xuất Excel. Vui lòng cài đặt thư viện xlsx: npm install xlsx')
  }
}

