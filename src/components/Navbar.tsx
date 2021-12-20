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
  taskTag: string;
  handleTaskTag: any;
  taskDescription: string;
  handleTaskDescription: (event: Event) => void;
  handleSubmit: (event: Event) => void;
  handleCancel: (event: Event) => void;
}

type toggleCompactViewProps = {
  toggle: () => void;
  isCompact: boolean;
}

const Navbar = ({viewportWidth, handleFilters, toggleSearch, toggleCompactView, handleAddTask}: 
  {viewportWidth: number, handleFilters: handleFiltersProps, toggleSearch: toggleSearchProps,
    toggleCompactView: toggleCompactViewProps, handleAddTask: handleAddTaskProps}) => {
    const numOfFilters: any = handleFilters.filters.length === 1
      ? ''
      : handleFilters.filters.length - 1;

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
                tier="btn-secondary desktop-btn"
                icon={filter}
                text={numOfFilters}
              />

              <Button 
                onClick={handleFilters.open}
                tier="btn-secondary dropdown"
                icon={settings}
                numOfFilters={numOfFilters}
                viewport={viewportWidth}
                toggleCompactView={toggleCompactView}
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
          tagsArray={handleFilters.tagsArray}
        />

        <FilterModal 
          handleFilters = {handleFilters}
          text="Filters"
        />
      </div>
    );
};

export default Navbar;