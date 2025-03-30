import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import Login from './Login';

// Mocking useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe("Testing Login Page", () => {
    test("renders Login page", () => {
        render(<Login />)
        expect(screen.getByTestId('form-container')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    });

    test('Handle Input changes event', () => {
        render(<Login />);
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');

        fireEvent.change(email, { target: { value: 'test@gmail.com' } })
        fireEvent.change(password, { target: { value: 'testing' } })

        expect(email).toHaveValue('test@gmail.com');
        expect(password).toHaveValue('testing');
    });

    test('Handle With Error', () => {
        render(<Login />);
        const submitBtn = screen.getByTestId('submit-btn');

        expect(screen.queryByText('Please Enter Password')).not.toBeInTheDocument();
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'testing@gmail.com' } });
        fireEvent.click(submitBtn);

        expect(screen.getByText('Please Enter Password')).toBeInTheDocument();
    });

    test("Should navigate to dashboard on successful login", () => {
        render(<Login />);
        
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByTestId('submit-btn'));

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
});
