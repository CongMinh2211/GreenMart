// Test cho chức năng Tìm kiếm & Bộ lọc (Người 2)

describe('Tìm kiếm và Bộ lọc sản phẩm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('TC1: Tìm kiếm sản phẩm theo tên có dấu', () => {
    cy.get('[data-testid="input-tim-kiem"]').type('cải')
    cy.get('[data-testid="the-san-pham-1"]').should('be.visible')
    cy.get('[data-testid="ten-san-pham-1"]').should('contain', 'cải')
  })

  it('TC2: Tìm kiếm sản phẩm theo tên không dấu', () => {
    cy.get('[data-testid="input-tim-kiem"]').type('cai')
    cy.get('[data-testid="the-san-pham-1"]').should('be.visible')
  })

  it('TC3: Lọc sản phẩm theo loại', () => {
    cy.get('[data-testid="select-loc-loai"]').select('rau-cu')
    cy.get('[data-testid="danh-sach-san-pham"]').children().should('have.length.at.least', 1)
  })

  it('TC4: Lọc sản phẩm theo khoảng giá', () => {
    cy.get('[data-testid="input-gia-min"]').type('20000')
    cy.get('[data-testid="input-gia-max"]').type('30000')
    
    cy.get('[data-testid="danh-sach-san-pham"]').children().should('have.length.at.least', 1)
  })

  it('TC5: Sắp xếp sản phẩm theo giá tăng dần', () => {
    cy.get('[data-testid="select-sap-xep"]').select('gia-tang')
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
  })

  it('TC6: Sắp xếp sản phẩm theo giá giảm dần', () => {
    cy.get('[data-testid="select-sap-xep"]').select('gia-giam')
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
  })

  it('TC7: Sắp xếp sản phẩm theo tên A-Z', () => {
    cy.get('[data-testid="select-sap-xep"]').select('ten-a-z')
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
  })

  it('TC8: Hiển thị thông báo khi không tìm thấy sản phẩm', () => {
    cy.get('[data-testid="input-tim-kiem"]').type('không tồn tại 12345')
    cy.get('[data-testid="thong-bao-khong-tim-thay"]').should('be.visible')
  })

  it('TC9: Kết hợp tìm kiếm và lọc', () => {
    cy.get('[data-testid="input-tim-kiem"]').type('cải')
    cy.get('[data-testid="select-loc-loai"]').select('rau-cu')
    cy.get('[data-testid="danh-sach-san-pham"]').should('be.visible')
  })

  it('TC10: Xóa bộ lọc và hiển thị tất cả sản phẩm', () => {
    cy.get('[data-testid="select-loc-loai"]').select('rau-cu')
    cy.get('[data-testid="select-loc-loai"]').select('tat-ca')
    cy.get('[data-testid="danh-sach-san-pham"]').children().should('have.length', 3)
  })
})

