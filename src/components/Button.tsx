import { ButtonProps } from '../types/Button';
import { Spinner } from '../assets/Spinner';

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
        {icon}
        {loader && <Spinner style='h-6' />}
        {!loader && text && <p className='pl-1'> {text} </p>}
      </div>
    </button>
  );
};

export default Button;
