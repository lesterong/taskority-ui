import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import { useNavigate } from 'react-router-dom';
import { SettingsProps } from '../types/Settings';
import { ViewIcon } from '../assets/ViewIcon';
import { SettingsIcon } from '../assets/SettingsIcon';
import { LogoutIcon } from '../assets/LogoutIcon';
import { FilterIcon } from '../assets/FilterIcon';
import authService from '../services/auth';
import './Button.css';

const Settings = ({
  onClick,
  text,
  numOfFilters,
  viewportWidth,
  handleView,
  updateAuth,
}: SettingsProps) => {
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
        <SettingsIcon />
        {mobile && text && <p className='pl-1'> {text} </p>}
      </MenuButton>
      <MenuList>
        {mobile && (
          <MenuItem className='hidden' onSelect={onClick}>
            <FilterIcon />
            <p>Filters {num}</p>
          </MenuItem>
        )}
        <MenuItem onSelect={handleView.toggle}>
          <ViewIcon />
          <p>{handleView.isCompact ? 'Wide' : 'Compact'}</p>
        </MenuItem>
        <MenuItem onSelect={handleLogout}>
          <LogoutIcon />
          <p>Log Out</p>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Settings;
