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
          <label>
            <p>Email</p>
            <input
              type="email"
              placeholder='Email'
            />
          </label>

          <label className='pb-3'>
            <p>Password</p>
            <input
              type="password"
              placeholder='Password'
            />
          </label>

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