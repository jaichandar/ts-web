import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import Login from './Login';

describe("Testing Login Page", () => {
    test("renders Login page", () => {
        render(<Login />)
        expect(screen.getByTestId('form-container')).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    })

    test('Handle Input changes event', () => {
        render(<Login />);
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');

        fireEvent.change(email, { target: { value: 'test@gmail.com' } })
        fireEvent.change(password, { target: { value: 'testing' } })

        expect(email).toHaveValue('test@gmail.com');
        expect(password).toHaveValue('testing');
    })

    test('Handle With Error', () => {
        render(<Login />);
        const submitBtn = screen.getByTestId('submit-btn');
        expect(screen.queryByText('Please Enter Password')).not.toBeInTheDocument();
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'testing@gmail.com' } });
        fireEvent.click(submitBtn);
        expect(screen.getByText('Please Enter Password')).toBeInTheDocument();
    })
})