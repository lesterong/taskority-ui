import './Button.css'
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import filter from '../assets/filter.svg';
import logout from '../assets/logout.svg';
import view from '../assets/view.svg';
// import darkMode from '../assets/darkMode.svg';
// import lightMode from '../assets/lightMode.svg';

type ButtonProps = {
  onClick?: any;
  tier: string;
  icon?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  numOfFilters?: string | number;
  viewport?: any;
  toggleCompactView?: any;
};

const Button = ({onClick, tier, icon, text, type="button", numOfFilters, viewport, toggleCompactView}: ButtonProps) => {
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
    const num = numOfFilters === '' ? '' : '(' + numOfFilters + ')'

    const mobile = viewport >= 640
      ? false
      : true;

    return (
      <Menu>
        <MenuButton className={tier}>
          {icon && <img src={icon} alt={text}/>}
          {text && <p> {text} </p>}
        </MenuButton>
        <MenuList>
          { mobile && 
          <MenuItem className='hidden' onSelect={onClick}>
            <img src={filter} alt="Filters"/>
            <p>Filters {num} </p>
          </MenuItem> 
          }
          <MenuItem onSelect={toggleCompactView.toggle}>
            <img src={view} alt="View"/>
            <p>{toggleCompactView.isCompact ? "Wide" : "Compact" }</p>
          </MenuItem>
          {/* <MenuItem onSelect={() => {}}>
            <img src={darkMode} alt="Dark Mode"/>
            <p>Dark Mode</p>
          </MenuItem> */}
          { mobile && 
          <MenuItem onSelect={() => {}}>
            <img src={logout} alt="Log Out"/>
            <p>Log Out</p>
          </MenuItem>
          }
        </MenuList>
      </Menu>
    );
  };
};

export default Button;