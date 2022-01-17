import spinner from '../assets/spinner.svg';
import './Button.css';

type ButtonProps = {
  onClick?: () => void;
  variant: string;
  alt: string;
  icon?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  loader?: true | false;
};

const Button = ({
  onClick,
  variant,
  alt,
  icon,
  text,
  type = 'button',
  loader = false,
}: ButtonProps) => {
  return (
    <button className={variant} onClick={onClick} type={type} aria-label={alt}>
      <div className='flex justify-center'>
        {icon && <img className='mx-auto' src={icon} alt={alt} />}
        {loader && (
          <img className='mx-auto animate-spin' src={spinner} alt='Loading' />
        )}
        {!loader && text && <p className='pl-1'> {text} </p>}
      </div>
    </button>
  );
};

export default Button;
