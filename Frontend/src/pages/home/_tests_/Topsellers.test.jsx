// src/pages/home/_tests_/Topsellers.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Topsellers from '../Topsellers';

// 🧪 Mock Swiper modules 
vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

vi.mock('swiper/css', () => ({ default: {} }));
vi.mock('swiper/css/pagination', () => ({ default: {} }));
vi.mock('swiper/css/navigation', () => ({ default: {} }));

// 🧪 Mock useFetchAllBooksQuery
vi.mock('../../../redux/features/cart/books/booksApi', () => ({
  useFetchAllBooksQuery: () => ({
    data: {
      books: [
        {
          _id: '1',
          title: 'Book A',
          category: 'Fiction',
          coverImage: 'bookA.jpg',
          newPrice: 10,
          oldPrice: 15,
          description: 'This is a short description for Book A.',
        },
        {
          _id: '2',
          title: 'Book B',
          category: 'Business',
          coverImage: 'bookB.jpg',
          newPrice: 12,
          oldPrice: 18,
          description: 'This is a short description for Book B.',
        },
      ],
    },
  }),
}));

const mockStore = configureStore([]);

describe('Topsellers Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { cartItems: [] },
    });
  });

  it('renders top sellers and book cards', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Topsellers />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Top Sellers/i)).toBeInTheDocument();
    expect(screen.getByText('Book A')).toBeInTheDocument();
    expect(screen.getByText('Book B')).toBeInTheDocument();
  });

  it('filters books by selected category', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Topsellers />
        </MemoryRouter>
      </Provider>
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'Fiction' } });

    expect(screen.getByText('Book A')).toBeInTheDocument();
    expect(screen.queryByText('Book B')).not.toBeInTheDocument();
  });

  it('shows no book cards if category filter yields none', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Topsellers />
        </MemoryRouter>
      </Provider>
    );

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'Horror' } });

    expect(screen.queryByText('Book A')).not.toBeInTheDocument();
    expect(screen.queryByText('Book B')).not.toBeInTheDocument();
  });
});
