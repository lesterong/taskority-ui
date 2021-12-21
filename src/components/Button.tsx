import './Button.css'

type ButtonProps = {
  onClick?: any;
  variant: string;
  icon?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({onClick, variant, icon, text, type="button"}: ButtonProps) => {
  return (
    <button
      className={variant}
      onClick={onClick}
      type={type}
    >
      <div className="flex justify-center">
        {icon && <img className="mx-auto" src={icon} alt={text}/>}
        {text && <p className='px-1'> {text} </p>}
      </div>
    </button>
  );
};

export default Button;