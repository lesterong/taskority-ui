import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import filter from '../assets/filter.svg';
import logout from '../assets/logout.svg';
import view from '../assets/view.svg';
import { Link } from "react-router-dom";
import authService from '../services/auth';
import './Button.css'

type handleViewProps = {
  isCompact: boolean;
  toggle: () => void;
};

type ButtonProps = {
  onClick: () => void;
  variant: string;
  icon: string;
  text: string;
  numOfFilters: string;
  viewportWidth: number;
  handleView: handleViewProps;
};

const ButtonSettings = ({onClick, variant, icon, text, numOfFilters, viewportWidth, handleView}: ButtonProps) => {
  const num = numOfFilters === '' ? '' : '(' + numOfFilters + ')';
  const mobile = viewportWidth >= 540 ? false : true;

  const handleLogout = () => {
    authService
      .logout()
  }

  return (
    <Menu>
      <MenuButton className={variant + ' flex justify-center'}>
        {icon && <img className="mx-auto" src={icon} alt={text}/>}
        {mobile && text && <p className='pl-1'> {text} </p>}
      </MenuButton>
      <MenuList>
        { mobile && 
        <MenuItem className='hidden' onSelect={onClick}>
          <img src={filter} alt="Filters"/>
          <p>Filters {num} </p>
        </MenuItem> 
        }
        <MenuItem onSelect={handleView.toggle}>
          <img src={view} alt="View"/>
          <p>{handleView.isCompact ? "Wide" : "Compact" }</p>
        </MenuItem>
        <Link to="/login">
          <MenuItem onSelect={handleLogout}>
          <img src={logout} alt="Log Out"/>
          <p>Log Out</p>
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default ButtonSettings;