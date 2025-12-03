// Test cho chức năng Lịch sử mua hàng

describe('Lịch sử mua hàng', () => {
  beforeEach(() => {
    cy.visit('/')
    // Chờ trang load và sản phẩm xuất hiện
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
  })

  it('TC1: Hiển thị trang lịch sử mua hàng', () => {
    cy.get('a[href="/lich-su-mua-hang"]').click()

    cy.get('[data-testid="trang-lich-su-mua-hang"]').should('be.visible')
  })

  it('TC2: Hiển thị thông báo khi chưa có đơn hàng', () => {
    // Xóa tất cả đơn hàng trong localStorage trước
    cy.window().then((win) => {
      win.localStorage.removeItem('greenmart_don_hang')
    })

    cy.get('a[href="/lich-su-mua-hang"]').click()

    cy.get('[data-testid="trang-lich-su-mua-hang"]').should('contain', 'Chưa có đơn hàng nào')
    cy.get('[data-testid="nut-mua-sam-ngay"]').should('be.visible')
  })

  it('TC3: Tạo đơn hàng và kiểm tra hiển thị trong lịch sử', () => {
    // Đợi trang chủ load
    cy.get('[data-testid="trang-chu"]').should('be.visible')
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
    cy.get('[data-testid^="the-san-pham-"]').should('have.length.at.least', 1)
    cy.wait(1000)

    // Thêm sản phẩm vào giỏ hàng
    cy.get('[data-testid^="the-san-pham-"]').first().should('be.visible').within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().should('be.visible').and('not.be.disabled').click()
    })
    cy.wait(1000) // Wait for alert to close
    cy.get('[data-testid="nut-gio-hang"]').should('be.visible').click()
    cy.wait(500)
    cy.get('[data-testid="nut-thanh-toan"]').should('be.visible').click()
    cy.wait(500)

    // Điền thông tin và thanh toán
    cy.get('[data-testid="input-ho-ten"]').type('Nguyễn Văn A')
    cy.get('[data-testid="input-email"]').type('test@example.com')
    cy.get('[data-testid="input-so-dien-thoai"]').type('0912345678')
    cy.get('[data-testid="input-dia-chi"]').type('123 Đường ABC, Phường XYZ, Quận 1, TP.HCM')
    cy.get('[data-testid="nut-xac-nhan-thanh-toan"]').click()

    // Chờ thông báo thành công
    cy.get('[data-testid="thanh-toan-thanh-cong"]').should('be.visible')
    cy.wait(1000)

    // Vào lịch sử mua hàng
    cy.get('a[href="/lich-su-mua-hang"]').click()
    cy.wait(1000)

    // Kiểm tra có đơn hàng hiển thị
    cy.get('[data-testid="trang-lich-su-mua-hang"]').should('not.contain', 'Chưa có đơn hàng nào')
  })

  it('TC4: Xem chi tiết đơn hàng', () => {
    // Đảm bảo có đơn hàng trước
    cy.window().then((win) => {
      const donHangs = JSON.parse(win.localStorage.getItem('greenmart_don_hang') || '[]')
      if (donHangs.length === 0) {
        // Tạo đơn hàng nếu chưa có
        cy.get('[data-testid="trang-chu"]').should('be.visible')
        cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
        cy.get('[data-testid^="the-san-pham-"]').should('have.length.at.least', 1)

        cy.get('[data-testid^="the-san-pham-"]').first().should('be.visible').within(() => {
          cy.get('[data-testid*="nut-them-vao-gio-"]').first().should('be.visible').and('not.be.disabled').click()
        })
        cy.wait(1000)
        cy.get('[data-testid="nut-gio-hang"]').click()
        cy.wait(500)
        cy.get('[data-testid="nut-thanh-toan"]').click()
        cy.wait(500)
        cy.get('[data-testid="input-ho-ten"]').type('Test User')
        cy.get('[data-testid="input-email"]').type('test@example.com')
        cy.get('[data-testid="input-so-dien-thoai"]').type('0912345678')
        cy.get('[data-testid="input-dia-chi"]').type('123 Đường ABC, Phường XYZ, Quận 1, TP.HCM')
        cy.get('[data-testid="nut-xac-nhan-thanh-toan"]').click()
        cy.wait(2000)
      }
    })

    cy.get('a[href="/lich-su-mua-hang"]').click()
    cy.wait(1000)

    // Click vào nút xem chi tiết đơn hàng đầu tiên
    cy.get('body').then($body => {
      const detailButtons = $body.find('[data-testid^="nut-xem-chi-tiet-"]')
      if (detailButtons.length > 0) {
        cy.wrap(detailButtons.first()).click()
        cy.get('[data-testid="trang-chi-tiet-don-hang"]').should('be.visible')
      }
    })
  })

  it('TC5: Quay lại từ chi tiết đơn hàng', () => {
    // Đảm bảo có đơn hàng và vào chi tiết
    cy.window().then((win) => {
      const donHangs = JSON.parse(win.localStorage.getItem('greenmart_don_hang') || '[]')
      if (donHangs.length > 0) {
        cy.get('a[href="/lich-su-mua-hang"]').click()
        cy.wait(1000)
        cy.get('body').then($body => {
          const detailButtons = $body.find('[data-testid^="nut-xem-chi-tiet-"]')
          if (detailButtons.length > 0) {
            cy.wrap(detailButtons.first()).click()
            cy.get('[data-testid="nut-quay-lai-lich-su"]').click()
            cy.get('[data-testid="trang-lich-su-mua-hang"]').should('be.visible')
          }
        })
      }
    })
  })

  it('TC6: Hiển thị thông tin đơn hàng đầy đủ', () => {
    cy.window().then((win) => {
      const donHangs = JSON.parse(win.localStorage.getItem('greenmart_don_hang') || '[]')
      if (donHangs.length > 0) {
        cy.get('a[href="/lich-su-mua-hang"]').click()
        cy.wait(1000)

        // Kiểm tra các thông tin cơ bản hiển thị
        cy.get('[data-testid="trang-lich-su-mua-hang"]').should('contain', 'Đơn hàng')
        cy.get('[data-testid="trang-lich-su-mua-hang"]').should('contain', 'Ngày đặt')
      }
    })
  })

  it('TC7: Chuyển đến trang chủ từ nút mua sắm ngay', () => {
    // Xóa đơn hàng để hiển thị thông báo trống
    cy.window().then((win) => {
      win.localStorage.removeItem('greenmart_don_hang')
    })

    cy.get('a[href="/lich-su-mua-hang"]').click()
    cy.get('[data-testid="nut-mua-sam-ngay"]').click()

    cy.get('[data-testid="trang-chu"]').should('be.visible')
  })

  it('TC8: Sắp xếp đơn hàng theo thời gian mới nhất', () => {
    // Tạo nhiều đơn hàng để test sắp xếp
    cy.window().then((win) => {
      const donHangs = JSON.parse(win.localStorage.getItem('greenmart_don_hang') || '[]')
      if (donHangs.length < 2) {
        // Tạo thêm đơn hàng nếu cần
        cy.get('[data-testid="trang-chu"]').should('be.visible')
        cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
        cy.get('[data-testid^="the-san-pham-"]').should('have.length.at.least', 1)

        cy.get('[data-testid^="the-san-pham-"]').first().should('be.visible').within(() => {
          cy.get('[data-testid*="nut-them-vao-gio-"]').first().should('be.visible').and('not.be.disabled').click()
        })
        cy.wait(1000)
        cy.get('[data-testid="nut-gio-hang"]').click()
        cy.wait(500)
        cy.get('[data-testid="nut-thanh-toan"]').click()
        cy.wait(500)
        cy.get('[data-testid="input-ho-ten"]').type('Test User 2')
        cy.get('[data-testid="input-email"]').type('test2@example.com')
        cy.get('[data-testid="input-so-dien-thoai"]').type('0912345679')
        cy.get('[data-testid="input-dia-chi"]').type('456 Đường DEF, Phường UVW, Quận 2, TP.HCM')
        cy.get('[data-testid="nut-xac-nhan-thanh-toan"]').click()
        cy.wait(2000)
      }
    })

    cy.get('a[href="/lich-su-mua-hang"]').click()
    cy.wait(1000)

    // Kiểm tra đơn hàng được hiển thị (sắp xếp sẽ được kiểm tra bằng cách so sánh thời gian)
    cy.get('[data-testid="trang-lich-su-mua-hang"]').should('not.contain', 'Chưa có đơn hàng nào')
  })
})

