import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Recommended from '../Recommended';
import { useFetchAllBooksQuery } from '../../../redux/features/cart/books/booksApi';

vi.mock('../../../redux/features/cart/books/booksApi', () => ({
  useFetchAllBooksQuery: vi.fn(),
}));

vi.mock('../books/bookcard', () => ({
  default: ({ book }) => <div>{book.title}</div>,
}));

vi.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="swiperslide">{children}</div>,
}));

vi.mock('swiper/modules', () => ({
  Pagination: {},
  Navigation: {},
}));


describe('Recommended Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders book cards from index 8 onwards', () => {
    const sampleBooks = Array.from({ length: 10 }, (_, i) => ({
      _id: String(i),
      title: `Book ${i}`,
    }));

    useFetchAllBooksQuery.mockReturnValue({ data: { books: sampleBooks } });

    render(
      <MemoryRouter>
        <Recommended />
      </MemoryRouter>
    );

    expect(screen.getByText(/recommended for you/i)).toBeInTheDocument();

    const expected = sampleBooks.slice(8, 16);
    expect(screen.getAllByTestId('swiperslide')).toHaveLength(expected.length);
    expected.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it('renders no slides when there are no books', () => {
    useFetchAllBooksQuery.mockReturnValue({ data: { books: [] } });

    render(
      <MemoryRouter>
        <Recommended />
      </MemoryRouter>
    );

    expect(screen.queryAllByTestId('swiperslide')).toHaveLength(0);
  });
});
