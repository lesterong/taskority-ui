import { Dialog } from "@reach/dialog";
import './Modal.css';
import './TaskModal.css';
import Button from "./Button";
import close from '../assets/close.svg';

// show warning if there is already stuff keyed in

type modalProps = {
  text: string;
  handleAddTask?: any;
  handleUpdateTask?: any;
  task?: {
    id: number;
    title: string;
    description: string;
    duedate: string;
    tag: string;
    completed: boolean;
  };
};

const TaskModal = ({text, handleAddTask, handleUpdateTask, task}: modalProps) => { 
  return (
    <div>
      <Dialog 
        isOpen={handleUpdateTask?.isOpen === true || handleAddTask?.isOpen === true}
        onDismiss={handleAddTask?.handleCancel || handleUpdateTask.handleCancel}
        aria-label={text}
      >
        
        <form className="task-form" onSubmit={handleAddTask?.handleSubmit || handleUpdateTask?.handleSubmit}>
          <div className="form-title">
            <h1> {text} </h1>
            <button onClick={handleAddTask?.handleCancel || handleUpdateTask?.handleCancel}>
              <img src={close} /> 
            </button>
          </div>

          {task && (task?.completed 
            ? <p> This task is completed. </p>
            : <p> This task is still active. </p>
          )}

          <input 
            type="text"
            placeholder="Add a title..."
            name="title"
            value={handleUpdateTask?.taskTitle || handleAddTask?.taskTitle}
            onChange={handleUpdateTask?.handleTaskTitle || handleAddTask?.handleTaskTitle}
            required
          />
          
          <label>
            Due
            <input 
              type="datetime-local"
              name="due"
              step="60"
              value={handleUpdateTask?.taskDuedate || handleAddTask?.taskDuedate}
              onChange={handleUpdateTask?.handleTaskDuedate || handleAddTask?.handleTaskDuedate}
              required
            />
          </label>

          <label>
            Tags
            <select required>
              <option> Tag 1 </option>
              <option> Tag 2 </option>
            </select>
          </label>

          <label>
            Description
            <textarea 
              required
              value={handleUpdateTask?.taskDescription || handleAddTask?.taskDescription}
              onChange={handleUpdateTask?.handleTaskDescription || handleAddTask?.handleTaskDescription}/>
          </label>

          <div className="form-action">
            <Button 
                tier="btn-primary"
                text='Save'
                type='submit'
            />
            <Button 
                onClick={handleAddTask?.handleCancel || handleUpdateTask?.handleCancel}
                tier="btn-secondary"
                text={text.includes("Add") ? "Cancel" : "Delete"}
            />
          </div>
        </form>

      </Dialog>
    </div>
  );
}

export default TaskModal;