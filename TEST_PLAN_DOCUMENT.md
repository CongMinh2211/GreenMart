# Test Plan - GreenMart

## 1. Introduction

### 1.1. Purpose
The purpose of this Test Plan is to describe the testing approach and overall framework that will drive the testing of the GreenMart web application. The document defines the scope, approach, resources, and schedule of the testing activities. It identifies the items to be tested, the features to be tested, the types of testing to be performed, the personnel responsible for testing, the resources and schedule required to complete testing, and the risks associated with the plan.

### 1.2. Scope
The scope of this test plan includes the functional testing of the GreenMart e-commerce website.
- **User Features**:
    - Registration, Login, Profile Management.
    - Product Browsing, Searching, Filtering.
    - Shopping Cart Management (Add, Update, Delete).
    - Checkout and Order Placement.
    - Order History.
- **Admin Features** (if applicable):
    - Product Management.
    - Order Management.
- **Browsers**: Google Chrome, Microsoft Edge (Latest versions).

### 1.3. Out of scope
- Performance Testing (Load, Stress testing).
- Security Penetration Testing.
- Mobile Application Testing (Native apps).
- Payment Gateway Integration (Real transactions - using mock/sandbox only).

### 1.4. Reference
| Document Name | Version | Description |
|---|---|---|
| GreenMart Requirements Specification | 1.0 | Detailed functional requirements |
| GreenMart Design Document | 1.0 | UI/UX and Database design |
| KE_HOACH_TEST.md | 1.0 | Initial test case assignments |

### 1.5. Risk list
| Risk | Impact | Mitigation |
|---|---|---|
| Schedule Slippage | High | Prioritize critical features; Daily stand-ups. |
| Browser Compatibility Issues | Medium | Test on Chrome and Edge early. |
| Third-party Library Bugs | Medium | Use stable versions; Monitor updates. |
| Requirement Changes | High | Freeze requirements during testing phase. |

## 2. Target Test Areas
- **Functional Testing**: Verifying that all features work as per requirements.
- **UI/UX Testing**: Ensuring the interface is user-friendly and responsive.
- **Database Testing**: Verifying data persistence (LocalStorage) and retrieval.
- **Integration Testing**: Verifying interactions between components (e.g., Cart and Checkout).

## 3. Test Specification

### 3.1. Features

#### 3.1.1 Capstone 1
**Web application**: GreenMart
- **Module 1: Authentication**: Register, Login, Logout, Forgot Password.
- **Module 2: Product Catalog**: Home page, Product List, Product Detail, Search, Filter.
- **Module 3: Shopping Cart**: View Cart, Update Quantity, Remove Item, Discount Code.
- **Module 4: Checkout**: Shipping Info, Payment Method, Order Confirmation.
- **Module 5: User Profile**: View Profile, Edit Profile, Order History.

### 3.2. Test deliverables
- **Test Plan**: This document.
- **Test Cases**: Detailed steps, inputs, and expected results (Excel/Markdown).
- **Bug Reports**: Issues found during testing (Jira/GitHub Issues).
- **Test Summary Report**: Final report on testing activities and results.

### 3.3. Requirements for test environments
**Test items**:
- GreenMart Web Application URL (Localhost/Staging).
- Source Code Repository (GitHub).

**Test strategy**:
- **Manual Testing**: For UI/UX and complex flows.
- **Automated Testing**: Unit tests (Jest) for logic, E2E tests (Cypress) for critical flows.
- **Black-box Testing**: Testing without looking at internal code structure.

**Hardware environment**:
- **Client**: Windows 10/11 PC, 8GB RAM, Internet Connection.
- **Server**: Localhost (Node.js environment).

### 3.4. Test schedule
**Human resources**:
- **Test Manager**: 1 person (Plan, Monitor).
- **Testers**: 4 persons (Execute, Report).
- **Developers**: 5 persons (Fix bugs).

**Test Schedule**:
| Activity | Start Date | End Date |
|---|---|---|
| Test Planning | 01/12/2025 | 02/12/2025 |
| Test Case Design | 02/12/2025 | 05/12/2025 |
| Test Execution (Cycle 1) | 06/12/2025 | 10/12/2025 |
| Bug Fixing | 11/12/2025 | 13/12/2025 |
| Test Execution (Cycle 2) | 14/12/2025 | 15/12/2025 |
| Final Report | 16/12/2025 | 16/12/2025 |

## 4. Test Cycle and Exit Criteria

### 4.1. Entry criteria
- Source code is frozen and deployed to the test environment.
- Smoke test passed (Critical features like Login, Home page are working).
- Test cases are reviewed and approved.
- Test data is ready.

### 4.2. Exit criteria
- 100% of critical test cases passed.
- 95% of total test cases executed.
- No critical or high-severity bugs remaining open.
- Test Summary Report is approved.
