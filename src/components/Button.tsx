import './Button.css'

type ButtonProps = {
  onClick: any;
  tier: string;
  icon: any;
  text: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({onClick, tier, icon, text, type="button"}: ButtonProps) => {
  if (icon !== "") {
    return (
      <button
      className={tier}
      onClick={onClick}
      type={type}
      >
        <div className="btn-container">
          <img src={icon} alt={text}/>
          <p> {text} </p>
        </div>
      </button>
    );
  } else {
    return (
      <button
      className={tier}
      onClick={onClick}
      type={type}
      >
        <div className="btn-container">
          <p> {text} </p>
        </div>
      </button>
    );
  }
}

export default Button;