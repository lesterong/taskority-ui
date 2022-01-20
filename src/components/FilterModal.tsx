import { Dialog } from '@reach/dialog';
import Button from './Button';
import close from '../assets/close.svg';
import './Modal.css';
import { HandleFiltering } from '../types/Filters';

const FilterModal = ({
  handleFilters,
  text,
}: {
  handleFilters: HandleFiltering;
  text: string;
}) => {
  const {
    tagsArray,
    isOpen,
    filters,
    handleTagsCheckbox,
    handleTaskStatus,
    handleClear,
  } = handleFilters;

  const checkAll = filters[0] === 'All Tasks' ? true : false;
  const checkActive = filters[0] === 'Active Tasks' ? true : false;
  const checkCompleted = filters[0] === 'Completed Tasks' ? true : false;
  const checkTags = (tag: string) => filters.includes(tag);

  return (
    <div>
      <Dialog isOpen={isOpen} onDismiss={handleFilters.close} aria-label={text}>
        <form
          className='space-y-3'
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
          }}
        >
          <div className='form-title'>
            <h1> {text} </h1>
            <Button
              onClick={handleFilters.close}
              variant='btn-secondary'
              alt='Close filters'
              icon={close}
            />
          </div>

          <fieldset>
            <legend>
              <b>{'Task Status'}</b>
            </legend>
            <div className='input-container'>
              <input
                type='radio'
                name='Task Status'
                id='All Tasks'
                value='All Tasks'
                defaultChecked={checkAll}
                onChange={handleTaskStatus}
              />
              <label htmlFor='All Tasks'> All Tasks </label>
            </div>

            <div className='input-container'>
              <input
                type='radio'
                name='Task Status'
                id='Active Tasks'
                value='Active Tasks'
                defaultChecked={checkActive}
                onChange={handleTaskStatus}
              />
              <label htmlFor='Active Tasks'> Active Tasks </label>
            </div>

            <div className='input-container'>
              <input
                type='radio'
                name='Task Status'
                id='Completed Tasks'
                value='Completed Tasks'
                defaultChecked={checkCompleted}
                onChange={handleTaskStatus}
              />
              <label htmlFor='Completed Tasks'> Completed Tasks </label>
            </div>
          </fieldset>

          {tagsArray.length > 0 && (
            <fieldset>
              <legend>
                <b>Select Tags</b>
              </legend>
              {tagsArray.map((tag: string) => (
                <div key={tag} className='input-container'>
                  <input
                    type='checkbox'
                    name='tags'
                    id={tag || 'un-tagged'}
                    value={tag}
                    onChange={handleTagsCheckbox}
                    defaultChecked={checkTags(tag)}
                  />
                  <label htmlFor={tag || 'un-tagged'}>
                    {tag || 'Untagged'}
                  </label>
                </div>
              ))}
            </fieldset>
          )}

          <div className='w-full mt-2 flex sm:space-x-0 space-x-2'>
            <Button
              onClick={handleFilters.close}
              variant='btn-primary sm:hidden flex-1'
              alt='Apply Filters'
              text='Apply'
            />
            <Button
              onClick={() => handleClear()}
              variant='btn-secondary flex-1'
              alt='Clear Filters'
              text='Clear'
              type='reset'
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default FilterModal;
