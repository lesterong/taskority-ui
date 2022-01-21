import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EditingTaskModal } from '../types/TaskModal';
import { CloseIcon } from '../assets/CloseIcon';
import { DeleteIcon } from '../assets/DeleteIcon';
import Button from './Button';
import TagsInput from './TagsInput';

const EditTaskModal = ({ handleUpdateTask, tagsArray }: EditingTaskModal) => {
  const {
    isOpen,
    handleCancel,
    handleDelete,
    handleSubmit,
    taskTitle,
    handleTaskTitle,
    taskDuedate,
    handleTaskDuedate,
    taskTag,
    handleTaskTag,
    taskDescription,
    handleTaskDescription,
    taskComplete,
    handleComplete,
    isLoading,
  } = handleUpdateTask;

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
      close: { opacity: 0 },
    };
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          aria-modal={true}
          aria-hidden={!isOpen}
          className='modal-bg'
          key='edit-modal-bg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleCancel}
        >
          <motion.div
            className='modal-content'
            key='edit-modal-content'
            initial='close'
            animate='open'
            exit='close'
            variants={variants}
            onClick={(event) => event.stopPropagation()}
            transition={{ type: 'spring', bounce: 0, duration: 0.4, repeat: 0 }}
          >
            <form className='space-y-3' onSubmit={handleSubmit}>
              <div className='pb-3 flex justify-between items-center border-b border-gray-400'>
                <h1> Edit Task </h1>
                <Button
                  onClick={handleCancel}
                  variant='btn-secondary'
                  alt='Close task'
                  icon={<CloseIcon />}
                />
              </div>

              <div>
                <label htmlFor='title'> Title* </label>
                <input
                  placeholder='Add a title...'
                  type='text'
                  name='title'
                  id='title'
                  value={taskTitle}
                  onChange={handleTaskTitle}
                  required
                />
              </div>

              <div>
                <label htmlFor='due'> Due </label>
                <input
                  type='datetime-local'
                  id='due'
                  step='60'
                  value={taskDuedate}
                  onChange={handleTaskDuedate}
                />
              </div>

              <TagsInput
                tagsArray={tagsArray}
                value={taskTag}
                onEvent={handleTaskTag}
              />

              <div>
                <label htmlFor='description'> Description </label>
                <textarea
                  className='h-[120px]'
                  id='description'
                  value={taskDescription}
                  onChange={handleTaskDescription}
                />
              </div>

              <div className='w-full mt-2 flex space-x-2'>
                <Button
                  variant='btn-primary flex-1'
                  alt='Save task'
                  text='Save'
                  type='submit'
                  loader={isLoading}
                />
                <Button
                  onClick={handleComplete}
                  variant='btn-secondary flex-1'
                  alt={taskComplete ? 'Undo task' : 'Complete task'}
                  text={taskComplete ? 'Undo' : 'Complete'}
                  loader={isLoading}
                />
                <Button
                  onClick={handleDelete}
                  variant='btn-secondary flex-none'
                  alt='Delete task'
                  icon={<DeleteIcon />}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditTaskModal;
