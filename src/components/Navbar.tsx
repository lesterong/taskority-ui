import logo from '../assets/logo.svg';
import filter from '../assets/filter.svg';
import search from '../assets/search.svg';
import addTask from '../assets/addTask.svg';
import settings from '../assets/settings.svg';
import close from '../assets/close.svg';
import Button from './Button';
import ButtonSettings from './ButtonSettings';
import TaskModal from './TaskModal';
import FilterModal from './FilterModal';
import Search from './Search';
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

type handleSearchProps = {
  query: string;
  open: () => void;
  isOpen: boolean;
  close: () => void;
  onChange: (event: any) => void;
  handleClose: () => void;
};

type NavbarProps = {
  viewportWidth: number;
  handleView: handleViewProps;
  handleFilters: handleFiltersProps;
  handleAddTask: handleAddTaskProps;
  handleSearch: handleSearchProps;
};

const Navbar = ({viewportWidth, handleView, handleFilters, handleAddTask, handleSearch}: NavbarProps) => {
  const numOfFilters: any = handleFilters.filters.length === 1
    ? ''
    : handleFilters.filters.length - 1;

  const hideLogo = viewportWidth >= 540 ? false : true;

  return (
    <div className='bg-white'>
      <nav>
        {(!handleSearch.isOpen || !hideLogo) &&
        <div className="flex items-center shrink-0">
          <img src={logo} alt="Taskority" className="h-12 pr-1"/>
          <h1 className="xs:block hidden"> Taskority </h1>
        </div>
        }
        <div className="w-full">
        {!handleSearch.isOpen
          ? <div className="nav-links">
            <Button 
              onClick={handleSearch.open}
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
              viewportWidth={viewportWidth}
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

          : 
          <div className='nav-links'> 
            <Button
              onClick={handleFilters.open}
              variant="btn-secondary shrink-0"
              icon={filter}
              text={numOfFilters}
            />
            <Search handleSearch={handleSearch}/>
            <Button 
              onClick={handleSearch.handleClose}
              variant="btn-secondary shrink-0"
              icon={close}
            />
          </div>
        }
        </div> 
      </nav> 
      <TaskModal text="Add Task" handleAddTask={handleAddTask} tagsArray={handleFilters.tagsArray}/>
      <FilterModal text="Filters" handleFilters={handleFilters} />
    </div>
  );
};

export default Navbar;