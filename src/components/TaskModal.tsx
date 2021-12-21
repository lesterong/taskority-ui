import { Dialog } from "@reach/dialog";
import Button from "./Button";
import TagsInput from "./TagsInput";
import close from '../assets/close.svg';
import './Modal.css';

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
};

type handleAddTaskProps = {
  open: () => void;
  isOpen: boolean;
  taskTitle: string;
  handleTaskTitle: (event: Event) => void;
  taskDuedate: string;
  handleTaskDuedate: (event: Event) => void;
  taskTag: string;
  handleTaskTag: (value: string) => void;
  taskDescription: string;
  handleTaskDescription: (event: Event) => void;
  handleSubmit: (event: Event) => void;
  handleCancel: (event: Event) => void;
};

type handleUpdateTaskProps = {
  taskTitle: string;
  handleTaskTitle: any;
  taskDuedate: string;
  handleTaskDuedate: any;
  taskTag: string;
  handleTaskTag: any;
  taskDescription: string;
  handleTaskDescription: any;
  initValues: any;
  taskComplete: boolean;
  handleSubmit: any;
  handleCancel: any;
  handleDelete: any;
  handleCheckbox: any;
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

type TaskModalProps = {
  text: string;
  handleAddTask?: handleAddTaskProps;
  handleUpdateTask?: handleUpdateTaskProps;
  tagsArray: string[];
};

const TaskModal = ({text, handleAddTask, handleUpdateTask, tagsArray}: TaskModalProps) => {
  return (
    <div>
      <Dialog 
        isOpen={handleUpdateTask?.isOpen === true || handleAddTask?.isOpen === true}
        onDismiss={handleAddTask?.handleCancel || handleUpdateTask?.handleCancel}
        aria-label={text}
      > 
        <form onSubmit={handleAddTask?.handleSubmit || handleUpdateTask?.handleSubmit}>
          <div className="form-title">
            <h1> {text} </h1>
            <Button 
              onClick={handleAddTask?.handleCancel || handleUpdateTask?.handleCancel}
              variant="btn-secondary"
              icon={close}
            />
          </div>

          {handleUpdateTask &&
            <div className="input-container">
              <input 
                type="checkbox"
                checked={handleUpdateTask?.taskComplete}
                onChange={handleUpdateTask?.handleCheckbox}
                id="task-complete"
              />
              <label htmlFor="task-complete" className="flex items-center space-x-2">
                {handleUpdateTask?.taskComplete ? <p> Undo task? </p> : <p> Complete task? </p>}
              </label>
            </div>
          }

          <div>
            <label htmlFor="title"> Title </label>
            <input 
              className="font-display font-bold text-xl"
              placeholder="Add a title..."
              type="text" name="title" id="title"
              value={handleUpdateTask?.taskTitle || handleAddTask?.taskTitle || ""}
              onChange={handleAddTask?.handleTaskTitle || handleUpdateTask?.handleTaskTitle}
              required
            />
          </div>

          <div>
            <label htmlFor="due"> Due </label>
            <input 
              type="datetime-local" id="due"
              step="60"
              value={handleUpdateTask?.taskDuedate || handleAddTask?.taskDuedate}
              onChange={handleUpdateTask?.handleTaskDuedate || handleAddTask?.handleTaskDuedate}
              required
            />
          </div>

          <TagsInput 
            tagsArray={tagsArray}
            value={handleUpdateTask?.taskTag || handleAddTask?.taskTag || ""}
            onEvent={handleAddTask?.handleTaskTag || handleUpdateTask?.handleTaskTag} 
          />
          
          <div>
            <label htmlFor="description"> Description </label>
            <textarea 
              className="h-[120px]"
              id="description"
              value={handleUpdateTask?.taskDescription || handleAddTask?.taskDescription || ""}
              onChange={handleUpdateTask?.handleTaskDescription || handleAddTask?.handleTaskDescription}
              required
            />  
          </div>

          <div className="form-action">
            <Button variant="btn-primary" text='Save' type='submit' />
            <Button 
              onClick={handleAddTask?.handleCancel || handleUpdateTask?.handleDelete}
              variant="btn-secondary"
              text={text.includes("Add") ? "Cancel" : "Delete"}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default TaskModal;