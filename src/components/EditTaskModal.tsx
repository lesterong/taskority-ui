import { Dialog } from '@reach/dialog';
import { EditingTaskModal } from '../types/TaskModal';
import Button from './Button';
import TagsInput from './TagsInput';
import close from '../assets/close.svg';
import remove from '../assets/remove.svg';
import './Modal.css';

const EditTaskModal = ({ handleUpdateTask, tagsArray }: EditingTaskModal) => {
  return (
    <div>
      <Dialog
        isOpen={handleUpdateTask.isOpen}
        onDismiss={handleUpdateTask.handleCancel}
        aria-label='Edit Task'
      >
        <form className='space-y-3' onSubmit={handleUpdateTask.handleSubmit}>
          <div className='pb-3 flex justify-between items-center border-b border-gray-400'>
            <h1> Edit Task </h1>
            <Button
              onClick={handleUpdateTask.handleCancel}
              variant='btn-secondary'
              alt='Close task'
              icon={close}
            />
          </div>

          <div>
            <label htmlFor='title'> Title* </label>
            <input
              placeholder='Add a title...'
              type='text'
              name='title'
              id='title'
              value={handleUpdateTask.taskTitle}
              onChange={handleUpdateTask.handleTaskTitle}
              required
            />
          </div>

          <div>
            <label htmlFor='due'> Due </label>
            <input
              type='datetime-local'
              id='due'
              step='60'
              value={handleUpdateTask.taskDuedate}
              onChange={handleUpdateTask.handleTaskDuedate}
            />
          </div>

          <TagsInput
            tagsArray={tagsArray}
            value={handleUpdateTask.taskTag}
            onEvent={handleUpdateTask.handleTaskTag}
          />

          <div>
            <label htmlFor='description'> Description </label>
            <textarea
              className='h-[120px]'
              id='description'
              value={handleUpdateTask.taskDescription}
              onChange={handleUpdateTask.handleTaskDescription}
            />
          </div>

          <div className='w-full mt-2 flex space-x-2'>
            <Button
              variant='btn-primary flex-1'
              alt='Save task'
              text='Save'
              type='submit'
              loader={handleUpdateTask.isLoading}
            />
            <Button
              onClick={handleUpdateTask.handleComplete}
              variant='btn-secondary flex-1'
              alt={
                handleUpdateTask.taskComplete ? 'Undo task' : 'Complete task'
              }
              text={handleUpdateTask.taskComplete ? 'Undo' : 'Complete'}
              loader={handleUpdateTask.isLoading}
            />
            <Button
              onClick={handleUpdateTask.handleDelete}
              variant='btn-secondary flex-none'
              alt='Delete task'
              icon={remove}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default EditTaskModal;
