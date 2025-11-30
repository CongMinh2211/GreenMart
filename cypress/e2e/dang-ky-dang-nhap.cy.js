// Test cho chức năng Đăng ký & Đăng nhập (Người 1)

describe('Đăng ký và Đăng nhập', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Đăng ký', () => {
    it('TC1: Đăng ký thành công với thông tin hợp lệ', () => {
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="input-ho-ten-dang-ky"]').type('Nguyễn Văn A')
      cy.get('[data-testid="input-email-dang-ky"]').type('test@example.com')
      cy.get('[data-testid="input-so-dien-thoai-dang-ky"]').type('0912345678')
      cy.get('[data-testid="input-mat-khau-dang-ky"]').type('Abc123!@#')
      cy.get('[data-testid="input-xac-nhan-mat-khau"]').type('Abc123!@#')
      
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="dang-ky-thanh-cong"]').should('be.visible')
      cy.get('[data-testid="tieu-de-dang-ky-thanh-cong"]').should('contain', 'Đăng ký thành công')
    })

    it('TC2: Hiển thị lỗi khi email không hợp lệ', () => {
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="input-email-dang-ky"]').type('email-khong-hop-le')
      cy.get('[data-testid="input-ho-ten-dang-ky"]').type('Test')
      cy.get('[data-testid="input-mat-khau-dang-ky"]').type('Abc123')
      cy.get('[data-testid="input-xac-nhan-mat-khau"]').type('Abc123')
      
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="loi-email-dang-ky"]').should('be.visible')
      cy.get('[data-testid="loi-email-dang-ky"]').should('contain', 'không đúng định dạng')
    })

    it('TC3: Hiển thị lỗi khi mật khẩu quá ngắn', () => {
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="input-mat-khau-dang-ky"]').type('12345')
      
      cy.get('[data-testid="thong-bao-do-manh-mat-khau"]').should('be.visible')
    })

    it('TC4: Hiển thị lỗi khi mật khẩu xác nhận không khớp', () => {
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="input-mat-khau-dang-ky"]').type('Abc123!@')
      cy.get('[data-testid="input-xac-nhan-mat-khau"]').type('Abc123!@#')
      
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="loi-xac-nhan-mat-khau"]').should('be.visible')
      cy.get('[data-testid="loi-xac-nhan-mat-khau"]').should('contain', 'không khớp')
    })

    it('TC5: Hiển thị lỗi khi số điện thoại không hợp lệ', () => {
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="input-so-dien-thoai-dang-ky"]').type('123456')
      cy.get('[data-testid="input-ho-ten-dang-ky"]').type('Test')
      cy.get('[data-testid="input-email-dang-ky"]').type('test@example.com')
      cy.get('[data-testid="input-mat-khau-dang-ky"]').type('Abc123')
      cy.get('[data-testid="input-xac-nhan-mat-khau"]').type('Abc123')
      
      cy.get('[data-testid="nut-dang-ky"]').click()
      
      cy.get('[data-testid="loi-so-dien-thoai-dang-ky"]').should('be.visible')
    })
  })

  describe('Đăng nhập', () => {
    it('TC6: Đăng nhập thành công với email và mật khẩu hợp lệ', () => {
      cy.get('[data-testid="nut-dang-nhap"]').click()
      
      cy.get('[data-testid="input-email-dang-nhap"]').type('test@example.com')
      cy.get('[data-testid="input-mat-khau-dang-nhap"]').type('password123')
      
      cy.get('[data-testid="nut-dang-nhap"]').click()
      
      cy.get('[data-testid="dang-nhap-thanh-cong"]').should('be.visible')
    })

    it('TC7: Hiển thị lỗi khi email không hợp lệ', () => {
      cy.get('[data-testid="nut-dang-nhap"]').click()
      
      cy.get('[data-testid="input-email-dang-nhap"]').type('email-sai')
      cy.get('[data-testid="input-mat-khau-dang-nhap"]').type('password123')
      
      cy.get('[data-testid="nut-dang-nhap"]').click()
      
      cy.get('[data-testid="loi-email-dang-nhap"]').should('be.visible')
    })

    it('TC8: Hiển thị lỗi khi mật khẩu trống', () => {
      cy.get('[data-testid="nut-dang-nhap"]').click()
      
      cy.get('[data-testid="input-email-dang-nhap"]').type('test@example.com')
      
      cy.get('[data-testid="nut-dang-nhap"]').click()
      
      cy.get('[data-testid="loi-mat-khau-dang-nhap"]').should('be.visible')
    })

    it('TC9: Chuyển từ trang đăng nhập sang đăng ký', () => {
      cy.get('[data-testid="nut-dang-nhap"]').click()
      cy.get('[data-testid="nut-chuyen-dang-ky"]').click()
      
      cy.get('[data-testid="trang-dang-ky"]').should('be.visible')
    })

    it('TC10: Chuyển từ trang đăng ký sang đăng nhập', () => {
      cy.get('[data-testid="nut-dang-ky"]').click()
      cy.get('[data-testid="nut-chuyen-dang-nhap-tu-dang-ky"]').click()
      
      cy.get('[data-testid="trang-dang-nhap"]').should('be.visible')
    })
  })
})

