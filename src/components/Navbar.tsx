import logo from '../assets/logo.svg';
import Button from '../components/Button'
import filter from '../assets/filter.svg';
import search from '../assets/search.svg';
import addTask from '../assets/addTask.svg';
import logout from '../assets/logout.svg';
import settings from '../assets/settings.svg';
import TaskModal from './TaskModal';
import FilterModal from './FilterModal';
import './Navbar.css';

type handleProps = {
  open: any;
  close: any;
  isOpen: boolean;
}

const Navbar = ({handleTasks, handleFilters, handleSearch}: 
  {handleTasks: handleProps, handleFilters: handleProps, handleSearch: any}) => {
    return (
      <div className='nav-container'>
        <nav>
        <div className="nav-logo">
          <img src={logo} />
          Logo
        </div>

        <div>
          <div className="nav-links">
              <Button 
                onClick={handleSearch.toggle}
                tier="btn-secondary"
                icon={search}
              />

              <Button 
                onClick={handleFilters.open}
                tier="btn-secondary mobile-btn dropdown"
                icon={settings}
              />

              <Button 
                onClick={handleFilters.open}
                tier="btn-secondary desktop-btn"
                icon={filter}
                text=""
              />

              <Button 
                onClick={() => console.log("testing")}
                tier="btn-secondary desktop-btn"
                icon={logout}
              />

              <Button 
                onClick={handleTasks.open}
                tier="btn-primary desktop-btn"
                icon={addTask}
                text="Add Task"
              />

              <Button 
                onClick={handleTasks.open}
                tier="btn-primary mobile-btn"
                icon={addTask}
              />
          </div> 
        </div>
        </nav>

        <TaskModal 
          closeModal={handleTasks.close}
          isOpenModal={handleTasks.isOpen}
          title="Add Task"
        />

        <FilterModal 
          closeModal={handleFilters.close}
          isOpenModal={handleFilters.isOpen}
          title="Filters"
        />
      </div>
    );
};

export default Navbar;