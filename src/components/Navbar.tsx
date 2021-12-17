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

type NavbarProps = {
  handleAddTask: any;
  handleCloseModal: any;
  isOpenModal: boolean;
};

type handleProps = {
  open: any;
  close: any;
  isOpen: boolean;
}

const Navbar = ({handleTasks, handleFilters}: {handleTasks: handleProps, handleFilters: handleProps}) => {
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
              onClick={() => console.log("testing")}
              tier="btn-secondary"
              icon={search}
            />

            <Button 
              onClick={() => console.log("testing")}
              tier="btn-secondary mobile-btn"
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
      </div>
      </nav>
    </div>
  );
};

export default Navbar;