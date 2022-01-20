import { Dialog } from '@reach/dialog';
import { AddingTaskModal } from '../types/TaskModal';
import Button from './Button';
import TagsInput from './TagsInput';
import close from '../assets/close.svg';
import './Modal.css';

const AddTaskModal = ({ handleAddTask, tagsArray }: AddingTaskModal) => {
  return (
    <div>
      <Dialog
        isOpen={handleAddTask.isOpen}
        onDismiss={handleAddTask.handleCancel}
        aria-label='Add Task'
      >
        <form className='space-y-3' onSubmit={handleAddTask.handleSubmit}>
          <div className='pb-3 flex justify-between items-center border-b border-gray-400'>
            <h1> Add Task </h1>
            <Button
              onClick={handleAddTask.handleCancel}
              variant='btn-secondary'
              alt='Cancel add task'
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
              value={handleAddTask.taskTitle}
              onChange={handleAddTask.handleTaskTitle}
              required
            />
          </div>

          <div>
            <label htmlFor='due'> Due </label>
            <input
              type='datetime-local'
              id='due'
              step='60'
              value={handleAddTask.taskDuedate}
              onChange={handleAddTask.handleTaskDuedate}
            />
          </div>

          <TagsInput
            tagsArray={tagsArray}
            value={handleAddTask.taskTag}
            onEvent={handleAddTask.handleTaskTag}
          />

          <div>
            <label htmlFor='description'> Description </label>
            <textarea
              className='h-[120px]'
              id='description'
              value={handleAddTask.taskDescription}
              onChange={handleAddTask.handleTaskDescription}
            />
          </div>

          <div className='w-full mt-2 flex space-x-2'>
            <Button
              variant='btn-primary flex-1'
              alt='Add task'
              text='Save'
              type='submit'
              loader={handleAddTask.isLoading}
            />
            <Button
              onClick={handleAddTask.handleCancel}
              variant='btn-secondary flex-1'
              alt='Cancel add task'
              text='Cancel'
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddTaskModal;
