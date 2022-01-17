import {
  HandleAddTaskProps,
  HandleFiltersProps,
  HandleSearchProps,
} from '../types';
import logo from '../assets/logo.svg';
import logoText from '../assets/logoText.svg';
import filter from '../assets/filter.svg';
import search from '../assets/search.svg';
import addTask from '../assets/addTask.svg';
import close from '../assets/close.svg';
import Button from './Button';
import ButtonSettings from './ButtonSettings';
import AddTaskModal from './AddTaskModal';
import FilterModal from './FilterModal';
import Search from './Search';
import './Navbar.css';

type handleViewProps = {
  isCompact: boolean;
  toggle: () => void;
};

type NavbarProps = {
  viewportWidth: number;
  handleView: handleViewProps;
  handleFilters: HandleFiltersProps;
  handleAddTask: HandleAddTaskProps;
  handleSearch: HandleSearchProps;
  updateAuth: (status: boolean) => void;
};

const Navbar = ({
  viewportWidth,
  handleView,
  handleFilters,
  handleAddTask,
  handleSearch,
  updateAuth,
}: NavbarProps) => {
  const numOfFilters: string =
    handleFilters.filters.length === 1
      ? ''
      : `${handleFilters.filters.length - 1}`;

  const hideLogo = viewportWidth >= 540 ? false : true;

  return (
    <div className='bg-white shadow-sm border-b border-gray-200'>
      <nav>
        {(!handleSearch.isOpen || !hideLogo) && (
          <div className='flex items-center shrink-0'>
            <img src={logo} alt='Taskority' className='h-12 pr-1' />
            <h1>
              <img
                className='xs:block hidden h-8'
                src={logoText}
                alt='Taskority'
              />
            </h1>
          </div>
        )}
        <div className='w-full'>
          {!handleSearch.isOpen ? (
            <div className='nav-links'>
              <Button
                onClick={handleSearch.open}
                variant='btn-secondary'
                alt='Open search'
                icon={search}
              />

              <Button
                onClick={handleFilters.open}
                variant='btn-secondary desktop-btn'
                alt='Open filters'
                icon={filter}
                text={numOfFilters}
              />

              <ButtonSettings
                onClick={handleFilters.open}
                variant='btn-secondary dropdown'
                text={numOfFilters}
                numOfFilters={numOfFilters}
                viewportWidth={viewportWidth}
                handleView={handleView}
                updateAuth={updateAuth}
              />

              <Button
                onClick={handleAddTask.open}
                variant='btn-primary desktop-btn'
                alt='Add Task'
                icon={addTask}
                text='Add Task'
              />

              <Button
                onClick={handleAddTask.open}
                variant='btn-primary mobile-btn'
                alt='Add Task'
                icon={addTask}
              />
            </div>
          ) : (
            <div className='nav-links'>
              <Button
                onClick={handleFilters.open}
                variant='btn-secondary shrink-0'
                alt='Open filters'
                icon={filter}
                text={numOfFilters}
              />
              <Search handleSearch={handleSearch} />
              <Button
                onClick={handleSearch.handleClose}
                variant='btn-secondary shrink-0'
                alt='Close search'
                icon={close}
              />
            </div>
          )}
        </div>
      </nav>
      <AddTaskModal
        text='Add Task'
        handleAddTask={handleAddTask}
        tagsArray={handleFilters.tagsArray}
      />
      <FilterModal text='Filters' handleFilters={handleFilters} />
    </div>
  );
};

export default Navbar;
