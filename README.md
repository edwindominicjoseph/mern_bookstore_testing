# 📚 BookVerse – MERN Stack Bookstore

This is a full-stack bookstore application built using the MERN stack with a focus on scalable architecture and testing best practices.

---

## ✅ Current Progress: Testing Implementation

### 🧪 Testing Stack
- **Framework**: [Vitest](https://vitest.dev/)
- **UI Testing**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Coverage**: Vite + built-in `v8` coverage provider
- **Mocking**: Vitest's `vi.fn()` and custom hook mocks

---

### ✅ Unit Tests Implemented


| Component/Page     | Description                                                                 | Status       |
|--------------------|------------------------------------------------------------------------------|--------------|
| `BookCard.jsx`     | Renders book info, dispatches `addToCart`, links to detail page              | ✔️ Completed |
| `Login.jsx`        | Renders form, submits valid login, handles auth errors                       | ✔️ Completed |
| `Register.jsx`     | Registers with valid data, handles error, Google Sign-In                     | ✔️ Completed |
| `Navbar.jsx`       | Avatar state toggle, cart count, logout, guest view                          | ✔️ Completed |
| `CartPage.jsx`     | Displays cart items, calculates total                                        | ✔️ Completed |
| `Topsellers.jsx`   | Fetches books, filters by category, renders Swiper with BookCards            | ✔️ Completed |


---


