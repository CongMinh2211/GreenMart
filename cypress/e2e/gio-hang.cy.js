// Test cho chức năng Giỏ hàng (Người 2)

describe('Quản lý Giỏ hàng', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('TC1: Thêm sản phẩm vào giỏ hàng từ trang chủ', () => {
    cy.get('[data-testid="the-san-pham-1"]').should('be.visible')
    cy.get('[data-testid="input-so-luong-1"]').clear().type('2')
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
    
    cy.get('[data-testid="nut-gio-hang"]').should('contain', 'Giỏ Hàng (1)')
  })

  it('TC2: Xem giỏ hàng và hiển thị sản phẩm', () => {
    // Thêm sản phẩm vào giỏ
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
    
    // Vào giỏ hàng
    cy.get('[data-testid="nut-gio-hang"]').click()
    
    cy.get('[data-testid="trang-gio-hang"]').should('be.visible')
    cy.get('[data-testid="san-pham-gio-hang-1"]').should('be.visible')
  })

  it('TC3: Cập nhật số lượng sản phẩm trong giỏ hàng', () => {
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
    cy.get('[data-testid="nut-gio-hang"]').click()
    
    cy.get('[data-testid="input-so-luong-gio-hang-1"]').clear().type('5')
    cy.get('[data-testid="tong-tien"]').should('be.visible')
  })

  it('TC4: Xóa sản phẩm khỏi giỏ hàng', () => {
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
    cy.get('[data-testid="nut-gio-hang"]').click()
    
    cy.get('[data-testid="nut-xoa-san-pham-1"]').click()
    
    cy.get('[data-testid="gio-hang-rong"]').should('be.visible')
  })

  it('TC5: Áp dụng mã giảm giá hợp lệ', () => {
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
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
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
    cy.get('[data-testid="nut-them-vao-gio-2"]').click()
    cy.get('[data-testid="nut-gio-hang"]').click()
    
    cy.get('[data-testid="tong-tien"]').should('be.visible')
    cy.get('[data-testid="tong-thanh-toan"]').should('be.visible')
  })

  it('TC8: Chuyển từ giỏ hàng sang trang thanh toán', () => {
    cy.get('[data-testid="nut-them-vao-gio-1"]').click()
    cy.get('[data-testid="nut-gio-hang"]').click()
    cy.get('[data-testid="nut-thanh-toan"]').click()
    
    cy.get('[data-testid="trang-thanh-toan"]').should('be.visible')
  })
})

