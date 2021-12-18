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

type toggleSearchProps = {
  toggle: () => void;
};

type handleFiltersProps = {
  tagsArray: Array<[]>;
  open: () => void;
  closeModal: () => void;
  isOpen: boolean;
  filters: Array<[]>;
  handleTagsCheckbox: any;
  handleTaskStatus: any;
  handleClear: any;
};

type handleAddTaskProps = {
  open: () => void;
  isOpen: boolean;
  taskTitle: string;
  handleTaskTitle: (event: Event) => void;
  taskDuedate: string;
  handleTaskDuedate: (event: Event) => void;
  taskDescription: string;
  handleTaskDescription: (event: Event) => void;
  handleSubmit: (event: Event) => void;
  handleCancel: (event: Event) => void;
}

const Navbar = ({handleFilters, toggleSearch, handleAddTask}: 
  {handleFilters: handleFiltersProps, toggleSearch: toggleSearchProps, handleAddTask: handleAddTaskProps}) => {
    return (
      <div className='nav-container'>
        <nav>
        <div className="nav-logo">
          <img src={logo} alt="Taskority"/>
          <h1> Taskority </h1>
        </div>

        <div>
          <div className="nav-links">
              <Button 
                onClick={toggleSearch.toggle}
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
                onClick={handleAddTask.open}
                tier="btn-primary desktop-btn"
                icon={addTask}
                text="Add Task"
              />

              <Button 
                onClick={handleAddTask.open}
                tier="btn-primary mobile-btn"
                icon={addTask}
              />
          </div> 
        </div>
        </nav>

        <TaskModal 
          text="Add Task"
          handleAddTask={handleAddTask}
        />

        <FilterModal 
          handleFilters = {handleFilters}
          text="Filters"
        />
      </div>
    );
};

export default Navbar;