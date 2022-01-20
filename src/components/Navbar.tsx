import { NavbarProps } from '../types/Navbar';
import logo from '../assets/logo.svg';
import logoText from '../assets/logoText.svg';
import filter from '../assets/filter.svg';
import search from '../assets/search.svg';
import addTask from '../assets/addTask.svg';
import close from '../assets/close.svg';
import Button from './Button';
import Settings from './Settings';
import AddTaskModal from './AddTaskModal';
import FilterModal from './FilterModal';
import Search from './Search';

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

  const hideLogo = viewportWidth < 540;

  return (
    <div className='bg-white shadow-sm border-b border-gray-200'>
      <nav className='flex mx-auto py-2 px-4 max-w-4xl justify-between'>
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
            <div className='flex justify-end space-x-2'>
              <Button
                onClick={handleSearch.open}
                variant='btn-secondary'
                alt='Open search'
                icon={search}
              />

              <Button
                onClick={handleFilters.open}
                variant='btn-secondary hidden sm:block'
                alt='Open filters'
                icon={filter}
                text={numOfFilters}
              />

              <Settings
                onClick={handleFilters.open}
                text={numOfFilters}
                numOfFilters={numOfFilters}
                viewportWidth={viewportWidth}
                handleView={handleView}
                updateAuth={updateAuth}
              />

              <Button
                onClick={handleAddTask.open}
                variant='btn-primary hidden sm:block'
                alt='Add Task'
                icon={addTask}
                text='Add Task'
              />

              <Button
                onClick={handleAddTask.open}
                variant='btn-primary sm:hidden'
                alt='Add Task'
                icon={addTask}
              />
            </div>
          ) : (
            <div className='flex justify-end space-x-2'>
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
        handleAddTask={handleAddTask}
        tagsArray={handleFilters.tagsArray}
      />
      <FilterModal text='Filters' handleFilters={handleFilters} />
    </div>
  );
};

export default Navbar;
