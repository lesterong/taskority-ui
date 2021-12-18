import logo from '../assets/logo.svg';
import './Login.css';
import Button from '../components/Button';

const Login = () => {
  return (
    <div>
      <div className='login-header'>
        <img src={logo} alt="logo" />
        <h1> Taskority </h1>
      </div>
      <div className="login-container">
        <h1> Login </h1>
        <form>
          <div>
            <label htmlFor='email'> Email </label>
            <p>Email</p>
            <input
              id="email"
              type="email"
              placeholder='Email'
            />
          </div>

          <div>
            <label htmlFor='password'> Password </label>
            <input
              className='mb-3'
              id="password"
              type="password"
              placeholder='Password'
            />
          </div>

          <Button 
            tier='btn-primary'
            type="submit"
            text='Login'
          />

          <h3 className='text-center pt-4'> Don't have an account? Sign Up. </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;