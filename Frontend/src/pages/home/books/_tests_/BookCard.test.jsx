// src/__tests__/BookCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../BookCard'; // Adjust path as needed
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Mock useDispatch and action
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../utils/gettingImgUrl', () => ({
  default: (path) => `mocked_url/${path}`,
}));

describe('BookCard Component', () => {
  const book = {
    _id: '123',
    title: 'The Test Book',
    description: 'A very nice book for testing purposes that is long enough to slice.',
    oldPrice: 30,
    newPrice: 20,
    coverImage: 'book-cover.jpg',
  };

  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('renders book title, prices, and description', () => {
    render(
      <MemoryRouter>
        <BookCard book={book} />
      </MemoryRouter>
    );

    expect(screen.getByText('The Test Book')).toBeInTheDocument();
    expect(screen.getByText('$30')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText(/testing purposes/i)).toBeInTheDocument();
  });

  it('calls dispatch on Add to Cart click', () => {
    render(
      <MemoryRouter>
        <BookCard book={book} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: book,
    });
  });
});
