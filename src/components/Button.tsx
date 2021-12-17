import './Button.css'
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import filter from '../assets/filter.svg';
import logout from '../assets/logout.svg';

type ButtonProps = {
  onClick?: any;
  tier: string;
  icon?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({onClick, tier, icon, text, type="button"}: ButtonProps) => {
  if (!tier.includes('dropdown')) {
    return (
      <button
        className={tier}
        onClick={onClick}
        type={type}
      >
        <div className="btn-container">
          {icon && <img src={icon} alt={text}/>}
          {text && <p> {text} </p>}
        </div>
      </button>
    );
  } else {
    return (
      <Menu>
        <MenuButton className={tier}>
          {icon && <img src={icon} alt={text}/>}
          {text && <p> {text} </p>}
        </MenuButton>
        <MenuList>
          <MenuItem onSelect={onClick}>
            <img src={filter} alt="Filters"/>
            <p>Filters</p>
          </MenuItem>
          <MenuItem onSelect={() => {}}>
            <img src={logout} alt="Log Out"/>
            <p>Log Out</p>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };
};

export default Button;