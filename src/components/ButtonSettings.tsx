import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import { useNavigate } from 'react-router-dom';
import { HandleViewing } from '../types/View';
import filter from '../assets/filter.svg';
import logout from '../assets/logout.svg';
import view from '../assets/view.svg';
import settings from '../assets/settings.svg';
import authService from '../services/auth';
import './Button.css';

type ButtonSettingsProps = {
  onClick: () => void;
  text: string;
  numOfFilters: string;
  viewportWidth: number;
  handleView: HandleViewing;
  updateAuth: (status: boolean) => void;
};

const ButtonSettings = ({
  onClick,
  text,
  numOfFilters,
  viewportWidth,
  handleView,
  updateAuth,
}: ButtonSettingsProps) => {
  const num = numOfFilters ? `(${numOfFilters})` : '';
  const mobile = viewportWidth < 540;

  let navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    localStorage.clear();
    updateAuth(false);
    navigate('/login');
  };

  return (
    <Menu>
      <MenuButton className={`btn-secondary flex justify-center`}>
        <img className='mx-auto' src={settings} alt='Settings' />
        {mobile && text && <p className='pl-1'> {text} </p>}
      </MenuButton>
      <MenuList>
        {mobile && (
          <MenuItem className='hidden' onSelect={onClick}>
            <img src={filter} alt='Filters' />
            <p>Filters {num}</p>
          </MenuItem>
        )}
        <MenuItem onSelect={handleView.toggle}>
          <img src={view} alt='View' />
          <p>{handleView.isCompact ? 'Wide' : 'Compact'}</p>
        </MenuItem>
        <MenuItem onSelect={handleLogout}>
          <img src={logout} alt='Log Out' />
          <p>Log Out</p>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ButtonSettings;
