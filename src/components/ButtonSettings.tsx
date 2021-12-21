import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import filter from '../assets/filter.svg';
import logout from '../assets/logout.svg';
import view from '../assets/view.svg';
// import darkMode from '../assets/darkMode.svg';
// import lightMode from '../assets/lightMode.svg';
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
  viewport: number;
  handleView: handleViewProps;
};

const ButtonSettings = ({onClick, variant, icon, text, numOfFilters, viewport, handleView}: ButtonProps) => {
  const num = numOfFilters === '' ? '' : '(' + numOfFilters + ')';
  const mobile = viewport >= 640 ? false : true;

  return (
    <Menu>
      <MenuButton className={variant + ' btn-container'}>
        {icon && <img src={icon} alt={text}/>}
        {mobile && text && <p> {text} </p>}
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
        {/* <MenuItem onSelect={() => {}}>
          <img src={darkMode} alt="Dark Mode"/>
          <p>Dark Mode</p>
        </MenuItem> */}
        <MenuItem onSelect={() => {}}>
          <img src={logout} alt="Log Out"/>
          <p>Log Out</p>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ButtonSettings;