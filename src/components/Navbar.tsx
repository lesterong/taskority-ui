import { NavbarProps } from '../types/Navbar';
import { Logo } from '../assets/Logo';
import { SearchIcon } from '../assets/SearchIcon';
import { AddIcon } from '../assets/AddIcon';
import { CloseIcon } from '../assets/CloseIcon';
import { FilterIcon } from '../assets/FilterIcon';
import { LogoText } from '../assets/LogoText';
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
            <Logo style='h-12 pr-1' />
            <h1>
              <LogoText style='h-8 xs:block hidden' />
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
                icon={<SearchIcon />}
              />

              <Button
                onClick={handleFilters.open}
                variant='btn-secondary hidden sm:block'
                alt='Open filters'
                icon={<FilterIcon />}
                text={numOfFilters}
              />

              <Settings
                onClick={handleFilters.open}
                numOfFilters={numOfFilters}
                viewportWidth={viewportWidth}
                handleView={handleView}
                updateAuth={updateAuth}
              />

              <Button
                onClick={handleAddTask.open}
                variant='btn-primary hidden sm:block'
                alt='Add Task'
                icon={<AddIcon />}
                text='Add Task'
              />

              <Button
                onClick={handleAddTask.open}
                variant='btn-primary sm:hidden'
                alt='Add Task'
                icon={<AddIcon />}
              />
            </div>
          ) : (
            <div className='flex justify-end space-x-2'>
              <Button
                onClick={handleFilters.open}
                variant='btn-secondary shrink-0'
                alt='Open filters'
                icon={<FilterIcon />}
                text={numOfFilters}
              />
              <Search handleSearch={handleSearch} />
              <Button
                onClick={handleSearch.handleClose}
                variant='btn-secondary shrink-0'
                alt='Close search'
                icon={<CloseIcon />}
              />
            </div>
          )}
        </div>
      </nav>
      <AddTaskModal
        handleAddTask={handleAddTask}
        tagsArray={handleFilters.tagsArray}
      />
      <FilterModal handleFilters={handleFilters} />
    </div>
  );
};

export default Navbar;
