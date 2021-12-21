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
      <div className="btn-container">
        {icon && <img src={icon} alt={text}/>}
        {text && <p> {text} </p>}
      </div>
    </button>
  );
};

export default Button;