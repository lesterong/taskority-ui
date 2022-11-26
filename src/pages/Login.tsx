import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UpdatingAuth } from '../types/Auth';
import Button from '../components/Button';
import authService from '../services/auth';
import LandingHeader from '../components/LandingHeader';

const Login = ({ updateAuth }: UpdatingAuth) => {
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailRequired, setEmailRequired] = useState<boolean>(false);
  const [emailPattern, setEmailPattern] = useState<boolean>(false);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidateEmail(true);
    setEmail(event.target.value);
  };
  const checkEmail = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validateEmail) {
      if (event.target.validity.valueMissing) {
        setEmailRequired(true);
        setEmailPattern(false);
      } else if (event.target.validity.patternMismatch) {
        setEmailRequired(false);
        setEmailPattern(true);
      } else {
        setEmailRequired(false);
        setEmailPattern(false);
      }
    }
  };

  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidatePassword(true);
    setPassword(event.target.value);
  };
  const checkPassword = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validatePassword) {
      event.target.validity.valueMissing
        ? setPasswordRequired(true)
        : setPasswordRequired(false);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  let navigate = useNavigate();
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    authService
      .login({ user: { email: email, password: password } })
      .then((data) => {
        if (data.status === 200) {
          setLoading(false);
          localStorage.setItem(
            'token',
            JSON.stringify(data.headers.get('Authorization')),
          );
          updateAuth(true);
          navigate('/');
        } else {
          setLoading(false);
          setInvalidError(true);
        }
      });
  };

  return (
    <div>
      <LandingHeader />
      <div className='container max-w-xl mx-auto px-4'>
        <h1 className='mb-3 text-2xl'> Login </h1>
        <form onSubmit={handleLogin}>
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
            {validatePassword && invalidError && (
              <h3 className='text-red-600'> Incorrect email or password. </h3>
            )}
          </div>
          <Button
            variant='btn-primary w-full'
            type='submit'
            alt='Login'
            text='Login'
            loader={loading}
          />
        </form>

        <Link to='/signup'>
          <h3 className='text-center mt-4'>
            Don&apos;t have an account? Sign Up.
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Login;
