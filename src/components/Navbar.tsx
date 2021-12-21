import logo from '../assets/logo.svg';
import filter from '../assets/filter.svg';
import search from '../assets/search.svg';
import addTask from '../assets/addTask.svg';
import logout from '../assets/logout.svg';
import settings from '../assets/settings.svg';
import Button from './Button';
import ButtonSettings from './ButtonSettings';
import TaskModal from './TaskModal';
import FilterModal from './FilterModal';
import './Navbar.css';

type handleFiltersProps = {
  tagsArray: string[];
  open: () => void;
  isOpen: boolean;
  close: () => void;
  filters: string[];
  handleTagsCheckbox: (event: React.FormEvent<HTMLInputElement>) => void;
  handleTaskStatus: (event: React.FormEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};

type handleAddTaskProps = {
  open: () => void;
  isOpen: boolean;
  taskTitle: string;
  handleTaskTitle: (event: Event) => void;
  taskDuedate: string;
  handleTaskDuedate: (event: Event) => void;
  taskTag: string;
  handleTaskTag: (value: string) => void;
  taskDescription: string;
  handleTaskDescription: (event: Event) => void;
  handleSubmit: (event: Event) => void;
  handleCancel: (event: Event) => void;
};

type handleViewProps = {
  isCompact: boolean;
  toggle: () => void;
};

const Navbar = ({viewportWidth, handleView, toggleSearch, handleFilters, handleAddTask}: 
  {viewportWidth: number, handleFilters: handleFiltersProps, toggleSearch: () => void,
    handleView: handleViewProps, handleAddTask: handleAddTaskProps}) => {
    
  const numOfFilters: any = handleFilters.filters.length === 1
    ? ''
    : handleFilters.filters.length - 1;

  return (
    <div className='bg-white w-full'>
      <nav>
        <div className="flex items-center">
          <img src={logo} alt="Taskority" className="h-12 pr-1"/>
          <h1 className="xs:block hidden"> Taskority </h1>
        </div>

        <div>
          <div className="nav-links">
            <Button 
              onClick={toggleSearch}
              variant="btn-secondary"
              icon={search}
            />

            <Button 
              onClick={handleFilters.open}
              variant="btn-secondary desktop-btn"
              icon={filter}
              text={numOfFilters}
            />

            <ButtonSettings 
              onClick={handleFilters.open}
              variant="btn-secondary dropdown"
              icon={settings}
              text={numOfFilters}
              numOfFilters={numOfFilters}
              viewport={viewportWidth}
              handleView={handleView}
            />

            <Button 
              onClick={handleAddTask.open}
              variant="btn-primary desktop-btn"
              icon={addTask}
              text="Add Task"
            />

            <Button 
              onClick={handleAddTask.open}
              variant="btn-primary mobile-btn"
              icon={addTask}
            />
          </div> 
        </div>
      </nav>
        <TaskModal text="Add Task" handleAddTask={handleAddTask} tagsArray={handleFilters.tagsArray}/>
        <FilterModal text="Filters" handleFilters={handleFilters} />
    </div>
  );
};

export default Navbar;