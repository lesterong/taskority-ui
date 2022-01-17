import { Dialog } from '@reach/dialog';
import { HandleAddTaskProps } from '../types';
import Button from './Button';
import TagsInput from './TagsInput';
import close from '../assets/close.svg';
import './Modal.css';

type TaskModalProps = {
  text: string;
  handleAddTask: HandleAddTaskProps;
  tagsArray: string[];
};

const AddTaskModal = ({ text, handleAddTask, tagsArray }: TaskModalProps) => {
  return (
    <div>
      <Dialog
        isOpen={handleAddTask.isOpen}
        onDismiss={handleAddTask.handleCancel}
        aria-label={text}
      >
        <form className='space-y-3' onSubmit={handleAddTask.handleSubmit}>
          <div className='form-title'>
            <h1> {text} </h1>
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

          <div className='form-action'>
            <Button
              variant='btn-primary'
              alt='Add task'
              text='Save'
              type='submit'
              loader={handleAddTask.isLoading}
            />
            <Button
              onClick={handleAddTask.handleCancel}
              variant='btn-secondary'
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
