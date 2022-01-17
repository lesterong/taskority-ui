import { Dialog } from '@reach/dialog';
import { TaskProps } from '../types';
import Button from './Button';
import TagsInput from './TagsInput';
import close from '../assets/close.svg';
import './Modal.css';

type HandleUpdateTaskProps = {
  taskTitle: string;
  handleTaskTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taskDuedate: string;
  handleTaskDuedate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taskTag: string;
  handleTaskTag: (value: string) => void;
  taskDescription: string;
  handleTaskDescription: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  initValues: (task: TaskProps) => void;
  taskComplete: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  handleDelete: () => void;
  handleCheckbox: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
  isLoading: boolean;
};

type TaskModalProps = {
  text: string;
  handleUpdateTask: HandleUpdateTaskProps;
  tagsArray: string[];
};

const EditTaskModal = ({
  text,
  handleUpdateTask,
  tagsArray,
}: TaskModalProps) => {
  return (
    <div>
      <Dialog
        isOpen={handleUpdateTask.isOpen}
        onDismiss={handleUpdateTask.handleCancel}
        aria-label={text}
      >
        <form className='space-y-3' onSubmit={handleUpdateTask.handleSubmit}>
          <div className='form-title'>
            <h1> {text} </h1>
            <Button
              onClick={handleUpdateTask.handleCancel}
              variant='btn-secondary'
              alt='Close task'
              icon={close}
            />
          </div>

          <div className='input-container'>
            <input
              type='checkbox'
              checked={handleUpdateTask.taskComplete}
              onChange={handleUpdateTask.handleCheckbox}
              id='task-complete'
            />
            <label
              htmlFor='task-complete'
              className='flex items-center space-x-2'
            >
              {handleUpdateTask.taskComplete ? (
                <p> Undo task? </p>
              ) : (
                <p> Complete task? </p>
              )}
            </label>
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

          <div className='form-action'>
            <Button
              variant='btn-primary'
              alt='Save task'
              text='Save'
              type='submit'
              loader={handleUpdateTask.isLoading}
            />
            <Button
              onClick={handleUpdateTask.handleDelete}
              variant='btn-secondary'
              alt='Delete task'
              text='Delete'
              loader={handleUpdateTask.isLoading}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default EditTaskModal;
