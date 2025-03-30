import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// types
import { formDetails } from './types';
// style
import './Login.scss';

const Login = () => {
    const [formData, setFormData] = useState<formDetails>({ email: '', password: '' });
    const [formError, setFormError] = useState<formDetails>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleOnSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (!formData.email) {
            setFormError((prev) => ({ ...prev, 'email': "Please Enter Email" }))
        } else if (!formData.password) {
            setFormError((prev) => ({ ...prev, 'password': "Please Enter Password" }))
        } else {
            navigate('/dashboard');
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: '' }));
    }

    return (
        <div className='container'>
            <div className='form-wrapper'>
                <form onSubmit={handleOnSubmit} data-testid='form-container'>
                    <div className='input-wrapper'>
                        <label className='label'>Email: </label>
                        <input
                            data-testid='email-input'
                            className='input'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder='Enter Email'
                        />
                        {formError.email ? <p className='error' data-testid='error-text'>{formError.email}</p> : null}
                    </div>
                    <div className='input-wrapper'>
                        <label className='label'>Password: </label>
                        <input
                            data-testid='password-input'
                            className='input'
                            name='password'
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            type='password'
                        />
                        {formError.password ? <p className='error' data-testid='error-text'>{formError.password}</p> : null}
                    </div>
                    <div className='btn-wrapper'>
                        <button type='submit' className='btn' data-testid='submit-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;