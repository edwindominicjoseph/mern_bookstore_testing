import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../Register';
import { useAuth } from '../../context/authcontext';

vi.mock('../../context/authcontext', () => ({
  useAuth: vi.fn(),
}));

describe('Register Component', () => {
  const mockRegisterUser = vi.fn();
  const mockGoogleSignIn = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      registerUser: mockRegisterUser,
      googleSignIn: mockGoogleSignIn,
    });
  });

  it('renders email and password fields', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
  });

  it('submits registration form with valid data', async () => {
    mockRegisterUser.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'securepass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith('test@example.com', 'securepass');
    });
  });

  it('displays error message on registration failure', async () => {
    mockRegisterUser.mockRejectedValueOnce(new Error('Failed'));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/please provide a valid email/i)).toBeInTheDocument();
    });
  });

  it('calls Google Sign-In on button click', async () => {
    mockGoogleSignIn.mockResolvedValueOnce();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /sign up with google/i }));

    await waitFor(() => {
      expect(mockGoogleSignIn).toHaveBeenCalled();
    });
  });
});
