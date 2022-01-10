import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import Button from '../components/Button';
import './auth.css';
import authService from '../services/auth';

const Signup = ({updateAuth}: {updateAuth: (status: boolean) => void}) => {
  const [email, setEmail] = useState<string>('');
  const [emailRequired, setEmailRequired] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailDuplicate, setEmailDuplicate] = useState<boolean>(false);
  const handleEmail = (event: any) => setEmail(event.target.value);

  const [password, setPassword] = useState<string>('');
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const handlePassword = (event: any) => setPassword(event.target.value);

  let navigate = useNavigate();
  const handleSignup = (event: any) => {
    event.preventDefault()
    authService
      .signup({ "user": { "email": email, "password": password } })
      .then(data => {
        if (data.status === 200) {
          authService
            .login({ "user": { "email": email, "password": password } })
            .then(data => {
              localStorage.setItem('token', JSON.stringify(data.headers.get('Authorization')))
              updateAuth(true);
              navigate('/')
            })
        } else if (data.status === 409) {
          setEmailDuplicate(true);
        } else {
          setPasswordRequired(false);
          setPasswordError(true);
        }
      })
  }

  const checkEmail = (event: any) => {
    if (event.target.validity.valueMissing) {
      setEmailRequired(true);
      setEmailError(false);
      setEmailDuplicate(false);
    } else if (event.target.validity.typeMismatch) {
      setEmailRequired(false);
      setEmailError(true);
      setEmailDuplicate(false);
    } else {
      setEmailError(false);
      setEmailRequired(false);
      setEmailDuplicate(false);
    }
  }

  const checkPassword = (event: any) => {
    if (event.target.validity.valueMissing) {
      setPasswordError(false);
      setPasswordRequired(true);
    }
  }
    
  return (
    <div>
      <div className='auth-header'>
        <img className="h-12" src={logo} alt="logo" />
        <h1 className="text-4xl"> Taskority </h1>
      </div>
      <div className="auth-container">
        <h2 className="pb-3 text-2xl"> Sign Up </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor='email'> Email </label>
            <input
              type="email" id="email" placeholder="Email"
              value={email}
              onChange={handleEmail}
              onBlur={checkEmail}
              required
            />
            {emailRequired && <h3 className="text-red-600"> Please enter an email. </h3>}
            {emailError && <h3 className="text-red-600"> Please enter a valid email. </h3>}
            {emailDuplicate && <h3 className="text-red-600"> Email is already in use. </h3>}
          </div>

          <div className="mb-6">
            <label htmlFor='password'> Password </label>
            <input 
              type="password" id="password" placeholder='Password'
              value={password}
              onChange={handlePassword}
              onBlur={checkPassword}
              required
            />
            {passwordRequired && <h3 className="text-red-600"> Please enter a password. </h3>}
            {passwordError &&
              <h3 className="text-red-600">
                Please use a stronger password with at least 8 characters, a mix of uppercase and lowercase letters and a number.
              </h3>
            }
          </div>

          <Button 
            variant='btn-primary w-full'
            type="submit"
            text='Sign Up'
          />
        </form>

        <Link to="/login">
          <h3 className='text-center mt-4'> Already have an account? Login here. </h3>
        </Link>
      </div>
    </div>
  );
};

export default Signup;