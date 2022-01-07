import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';
import Button from '../components/Button';
import './auth.css';
import authService from '../services/auth';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const handleEmail = (event: any) => setEmail(event.target.value);
  const [password, setPassword] = useState<string>('');
  const handlePassword = (event: any) => setPassword(event.target.value);

  const handleSignup = (event: any) => {
    event.preventDefault()
    authService
      .signup({ "user": { "email": email, "password": password } })
    
    authService  
      .login({ "user": { "email": email, "password": password } })
      .then(data => sessionStorage.setItem('token', JSON.stringify(data)));
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
          <div>
            <label htmlFor='email'> Email </label>
            <input id="email" type="email" placeholder='Email' value={email} onChange={handleEmail}/>
          </div>

          <div>
            <label htmlFor='password'> Password </label>
            <input className='mb-3' id="password" type="password" placeholder='Password' value={password} onChange={handlePassword}/>
          </div>

          <Button 
            variant='btn-primary w-full'
            type="submit"
            text='Sign Up'
          />
        </form>

        <Link to="/login">
          <h3 className='text-center pt-4'> Already have an account? Login here. </h3>
        </Link>
      </div>
    </div>
  );
};

export default Signup;