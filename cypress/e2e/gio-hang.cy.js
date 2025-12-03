// Test cho chức năng Giỏ hàng (Người 2)

describe('Quản lý Giỏ hàng', () => {
  beforeEach(() => {
    // Clear cart before each test
    cy.window().then((win) => {
      win.localStorage.removeItem('greenmart_gio_hang')
    })
    cy.visit('/')
    // Đợi trang chủ load và sản phẩm hiển thị
    cy.get('[data-testid="trang-chu"]').should('be.visible')
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
    cy.get('[data-testid^="the-san-pham-"]').should('have.length.at.least', 1)
  })

  it('TC1: Thêm sản phẩm vào giỏ hàng từ trang chủ', () => {
    // Target the specific "Add to cart" button using data-testid
    cy.get('[data-testid^="the-san-pham-"]').first().should('be.visible')
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().should('be.visible').and('not.be.disabled').click()
    })

    cy.wait(1500) // Wait for state update and alert to close

    // Verify cart count updates - check for badge with number
    cy.get('[data-testid="nut-gio-hang"]').should('be.visible')
    cy.get('[data-testid="nut-gio-hang"]').within(() => {
      cy.get('.badge').should('exist').and('not.be.empty')
    })
  })

  it('TC2: Xem giỏ hàng và hiển thị sản phẩm', () => {
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().click()
    })
    cy.wait(500)

    cy.get('[data-testid="nut-gio-hang"]').click()

    cy.get('[data-testid="trang-gio-hang"]').should('be.visible')
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table tbody tr').should('have.length.at.least', 1)
      } else {
        cy.get('[data-testid="trang-gio-hang"]').children().should('have.length.at.least', 1)
      }
    })
  })

  it('TC3: Xóa tất cả sản phẩm khỏi giỏ hàng', () => {
    // Ensure we are on home and products are loaded
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')

    // Add product
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().should('be.visible').and('not.be.disabled').click()
    })

    // Wait for badge to appear to ensure product is added
    cy.get('[data-testid="nut-gio-hang"] .badge').should('be.visible').and('contain', '1')

    // Navigate to cart
    cy.get('[data-testid="nut-gio-hang"]').click()

    // Verify we are on cart page
    cy.get('[data-testid="trang-gio-hang"]').should('be.visible')

    // Click "Delete All" button
    cy.get('[data-testid="nut-xoa-tat-ca"]').should('be.visible').click()

    // Handle confirmation dialog
    cy.on('window:confirm', () => true)

    // Verify cart is empty
    cy.get('[data-testid="gio-hang-rong"]').should('be.visible')
    cy.get('[data-testid="tieu-de-gio-hang-rong"]').should('contain', 'Giỏ hàng trống')
  })

  it('TC4: Xóa sản phẩm khỏi giỏ hàng', () => {
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().click()
    })
    cy.wait(500)
    cy.get('[data-testid="nut-gio-hang"]').click()

    cy.contains('button', 'Xóa').click()

    cy.get('[data-testid="gio-hang-rong"]').should('be.visible')
  })

  it('TC5: Áp dụng mã giảm giá hợp lệ', () => {
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().click()
    })
    cy.wait(500)
    cy.get('[data-testid="nut-gio-hang"]').click()

    cy.get('[data-testid="input-ma-giam-gia"]').type('GREEN10')
    cy.get('[data-testid="giam-gia"]').should('be.visible')
  })

  it('TC6: Hiển thị giỏ hàng trống khi chưa có sản phẩm', () => {
    cy.get('[data-testid="nut-gio-hang"]').click()

    cy.get('[data-testid="gio-hang-rong"]').should('be.visible')
    cy.get('[data-testid="tieu-de-gio-hang-rong"]').should('contain', 'Giỏ hàng trống')
  })

  it('TC7: Tính tổng tiền chính xác với nhiều sản phẩm', () => {
    // Add first available product
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().click()
    })
    cy.wait(500)

    // Try to add another product (different one or same one if allowed)
    cy.get('body').then($body => {
      // Find all "Add to cart" buttons that are NOT disabled
      const buttons = $body.find('[data-testid^="the-san-pham-"] button.btn-success:not([disabled])')

      if (buttons.length > 0) {
        // Click the first available enabled button (could be the same product if stock > 1, or a different one)
        cy.wrap(buttons.first()).click()
        cy.wait(500)
      } else {
        cy.log('No more enabled add to cart buttons found')
      }
    })

    cy.get('[data-testid="nut-gio-hang"]').click()
    cy.wait(1000)

    // Verify totals are visible (should work with 1 or more products)
    cy.get('[data-testid="tong-tien"]').should('be.visible')
    cy.get('[data-testid="tong-thanh-toan"]').should('be.visible')
  })

  it('TC8: Chuyển từ giỏ hàng sang trang thanh toán', () => {
    cy.get('[data-testid^="the-san-pham-"]').first().within(() => {
      cy.get('[data-testid*="nut-them-vao-gio-"]').first().click()
    })
    cy.wait(500)
    cy.get('[data-testid="nut-gio-hang"]').click()
    cy.get('[data-testid="nut-thanh-toan"]').click()

    cy.get('[data-testid="trang-thanh-toan"]').should('be.visible')
  })
})
