import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axiosClient';

const Signup = () => {
    const Navigate = useNavigate();
    const { setUser, setToken } = useStateContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post('/Signup',{
                name,
                email,
                password,
                password_confirmation,

            }).then(({data})=>{
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            setUser(data.user);
            setToken(data.token);
            setError('');

            Navigate('/');
        });
        } catch (error) {
            console.log(error.message);

            if (!error.responseHandled) {
                setError(error.response.data.message || 'an error occurred during the registratin ');
            }
            else {
                if(!error.frontendErrorHandled){
                    setError('an expected error occurred')
                }
            }
        }
    };

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                   {error && (
                        <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '10px' }}>
                           {error}
                        </div>
                    )}
                <form onSubmit={handleRegister}>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name' />
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <input
                        type='password'
                        value={password_confirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder='Confirm your Password'
                    />
                    <button className='btn btn-block' type='submit'>
                        Sign Up
                    </button>
                    <p className='message'>
                        Already Registered? <Link to='/Login'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
