import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../CartPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { removeFromCart, clearCart } from '../../../../redux/features/cart/cartSlice';

vi.mock('../../../../redux/features/cart/cartSlice', () => ({
  removeFromCart: vi.fn((product) => ({ type: 'cart/removeFromCart', payload: product })),
  clearCart: vi.fn(() => ({ type: 'cart/clearCart' })),
}));

const mockStore = configureStore([]);

describe('CartPage Component', () => {
  let store;
  const sampleProduct = {
    _id: '1',
    title: 'Test Book',
    newPrice: 25,
    category: 'Fiction',
    coverImage: 'test.jpg',
  };

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [sampleProduct],
      },
    });
    store.dispatch = vi.fn();
  });

  it('renders cart item with correct details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Shopping cart')).toBeInTheDocument();
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
    expect(screen.getByText(/qty/i)).toBeInTheDocument();
  });

  it('dispatches removeFromCart when Remove button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(removeFromCart(sampleProduct));
  });

  it('dispatches clearCart when Clear Cart button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    const clearButton = screen.getByRole('button', { name: /clear cart/i });
    fireEvent.click(clearButton);

    expect(store.dispatch).toHaveBeenCalledWith(clearCart());
  });

  it('shows empty message when cart is empty', () => {
    const emptyStore = mockStore({
      cart: {
        cartItems: [],
      },
    });

    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/no product found/i)).toBeInTheDocument();
  });

  it('shows correct subtotal price', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('$25.00')).toBeInTheDocument();
  });
});
