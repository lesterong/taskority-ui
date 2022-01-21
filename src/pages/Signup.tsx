import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UpdatingAuth } from '../types/Auth';
import { Logo } from '../assets/Logo';
import { LogoText } from '../assets/LogoText';
import Button from '../components/Button';
import authService from '../services/auth';

const Signup = ({ updateAuth }: UpdatingAuth) => {
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailRequired, setEmailRequired] = useState<boolean>(false);
  const [emailPattern, setEmailPattern] = useState<boolean>(false);
  const [emailDuplicate, setEmailDuplicate] = useState<boolean>(false);
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidateEmail(true);
    setEmail(event.target.value);
  };
  const checkEmail = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validateEmail) {
      if (event.target.validity.valueMissing) {
        setEmailRequired(true);
        setEmailPattern(false);
        setEmailDuplicate(false);
      } else if (event.target.validity.patternMismatch) {
        setEmailRequired(false);
        setEmailPattern(true);
        setEmailDuplicate(false);
      } else {
        setEmailRequired(false);
        setEmailPattern(false);
        setEmailDuplicate(false);
      }
    }
  };

  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [passwordMin, setPasswordMin] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidatePassword(true);
    setPassword(event.target.value);
  };
  const checkPassword = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validatePassword) {
      if (event.target.validity.valueMissing) {
        setPasswordError(false);
        setPasswordMin(false);
        setPasswordRequired(true);
      } else if (password.length < 8) {
        setPasswordError(false);
        setPasswordMin(true);
        setPasswordRequired(false);
      } else {
        setPasswordError(false);
        setPasswordMin(false);
        setPasswordRequired(false);
      }
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  let navigate = useNavigate();
  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    authService
      .signup({ user: { email: email, password: password } })
      .then((data) => {
        if (data.status === 200) {
          authService
            .login({ user: { email: email, password: password } })
            .then((data) => {
              setLoading(false);
              localStorage.setItem(
                'token',
                JSON.stringify(data.headers.get('Authorization')),
              );
              updateAuth(true);
              navigate('/');
            });
        } else if (data.status === 409) {
          setEmailDuplicate(true);
          setPasswordError(false);
          setLoading(false);
        } else {
          setPasswordRequired(false);
          setPasswordError(true);
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <div className='bg-white border-b border-gray-200 flex py-3 mb-3 items-center justify-center'>
        <Logo style='h-12 mr-2' />
        <LogoText style='h-9' />
      </div>
      <div className='container max-w-xl mx-auto px-4'>
        <h1 className='mb-3 text-2xl'> Sign Up </h1>
        <form onSubmit={handleSignup}>
          <div className='mb-3'>
            <label htmlFor='email'> Email </label>
            <input
              type='email'
              pattern='[^@\s]+@[^@\s]+\.[^@\s]+'
              id='email'
              placeholder='Email'
              value={email}
              onChange={handleEmail}
              onBlur={checkEmail}
              required
            />
            {validateEmail && emailRequired && (
              <h3 className='text-red-600'> Please enter an email. </h3>
            )}
            {validateEmail && emailPattern && (
              <h3 className='text-red-600'> Please enter a valid email. </h3>
            )}
            {validateEmail && emailDuplicate && (
              <h3 className='text-red-600'> Email is already in use. </h3>
            )}
          </div>

          <div className='mb-6'>
            <label htmlFor='password'> Password </label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePassword}
              onBlur={checkPassword}
              required
            />
            {validatePassword && passwordRequired && (
              <h3 className='text-red-600'> Please enter a password. </h3>
            )}
            {validatePassword && passwordMin && (
              <h3 className='text-red-600'>
                Password must be at least 8 characters.
              </h3>
            )}
            {validatePassword && passwordError && (
              <h3 className='text-red-600'>
                Please use a stronger password with at least 8 characters, a mix
                of uppercase and lowercase letters and a number.
              </h3>
            )}
          </div>
          <Button
            variant='btn-primary w-full'
            type='submit'
            alt='Sign Up'
            text='Sign Up'
            loader={loading}
          />
        </form>

        <Link to='/login'>
          <h3 className='text-center mt-4'>
            Already have an account? Login here.
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
