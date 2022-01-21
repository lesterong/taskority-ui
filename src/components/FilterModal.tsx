import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HandleFiltering } from '../types/Filters';
import { CloseIcon } from '../assets/CloseIcon';
import Button from './Button';

const FilterModal = ({ handleFilters }: { handleFilters: HandleFiltering }) => {
  const {
    tagsArray,
    isOpen,
    filters,
    handleTagsCheckbox,
    handleTaskStatus,
    handleClear,
  } = handleFilters;

  const checkStatus = (taskStatus: string) => filters[0].includes(taskStatus);
  const checkTags = (tag: string) => filters.includes(tag);

  const shouldReduceMotion = useReducedMotion();
  let variants;
  if (!shouldReduceMotion) {
    variants = {
      open: { x: 0 },
      close: { x: 500 },
    };
  } else {
    variants = {
      open: { opacity: 1 },
      close: { opacity: 1 },
    };
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          aria-modal={true}
          aria-hidden={!isOpen}
          className='modal-bg'
          key='filter-modal-bg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleFilters.close}
        >
          <motion.div
            className='modal-content'
            key='filter-modal-content'
            initial='close'
            animate='open'
            exit='close'
            variants={variants}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: 'spring', bounce: 0, duration: 0.4, repeat: 0 }}
          >
            <form
              className='space-y-3'
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
              }}
            >
              <div className='pb-3 flex justify-between items-center border-b border-gray-400'>
                <h1> Filters </h1>
                <Button
                  onClick={handleFilters.close}
                  variant='btn-secondary'
                  alt='Close filters'
                  icon={<CloseIcon />}
                />
              </div>

              <fieldset>
                <legend>
                  <b>Task Status</b>
                </legend>
                <div className='input-container'>
                  <input
                    type='radio'
                    name='Task Status'
                    id='All Tasks'
                    value='All Tasks'
                    defaultChecked={checkStatus('All Tasks')}
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
                    defaultChecked={checkStatus('Active Tasks')}
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
                    defaultChecked={checkStatus('Completed Tasks')}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
