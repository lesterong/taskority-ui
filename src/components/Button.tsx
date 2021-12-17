import './Button.css'

type ButtonProps = {
  onClick?: any;
  tier: string;
  icon?: any;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({onClick, tier, icon, text, type="button"}: ButtonProps) => {
  return (
    <button
      className={tier}
      onClick={onClick}
      type={type}
    >
      <div className="btn-container">
        {icon && <img src={icon} alt={text}/>}
        {text && <p> {text} </p> }
      </div>
    </button>
  );
};

export default Button;