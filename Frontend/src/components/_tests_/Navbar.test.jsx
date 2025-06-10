import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import configureStore from 'redux-mock-store';
import { useAuth } from '../../context/authcontext';

vi.mock('../../context/authcontext', () => ({
  useAuth: vi.fn(),
}));

const mockStore = configureStore([]);

describe('Navbar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [{ _id: '1' }, { _id: '2' }], // 2 items in cart
      },
    });
    store.dispatch = vi.fn();
  });

  it('renders login icon when user is not logged in', () => {
    useAuth.mockReturnValue({
      currentUser: null,
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument(); // Login icon <Link>
  });

  it('renders user avatar and dropdown when logged in', () => {
    useAuth.mockReturnValue({
      currentUser: { email: 'test@example.com' },
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const avatar = screen.getByRole('button',  { name: /toggle user dropdown/i });
    expect(avatar).toBeInTheDocument();

    fireEvent.click(avatar);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('shows cart count correctly', () => {
    useAuth.mockReturnValue({
      currentUser: null,
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument(); // 2 items in cart
  });

  it('shows zero when cart is empty', () => {
    store = mockStore({
      cart: {
        cartItems: [],
      },
    });

    useAuth.mockReturnValue({
      currentUser: null,
      logout: vi.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
