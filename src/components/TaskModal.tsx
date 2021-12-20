import { Dialog } from "@reach/dialog";
import './Modal.css';
import './TaskModal.css';
import Button from "./Button";
import close from '../assets/close.svg';
import Combobox from "./Combobox";

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
  tagsArray: any;
};

const TaskModal = ({text, handleAddTask, handleUpdateTask, task, tagsArray}: modalProps) => { 
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

          {task &&
            <div className="input-container">
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={handleUpdateTask.handleCheckbox}
                id="task-complete"
              />
              <label htmlFor="task-complete" className="flex items-center space-x-2">
                {task.completed ? <p> Undo task? </p> : <p> Complete task? </p>}
              </label>
            </div>
          }

          <div>
            <label htmlFor="title"> Title </label>
            <input 
              type="text"
              placeholder="Add a title..."
              name="title" id="title"
              value={handleUpdateTask?.taskTitle || handleAddTask?.taskTitle || ""}
              onChange={handleUpdateTask?.handleTaskTitle || handleAddTask?.handleTaskTitle}
              required
            />
          </div>

          <div>
            <label htmlFor="due"> Due </label>
            <input 
              type="datetime-local"
              name="due" id="due"
              step="60"
              value={handleUpdateTask?.taskDuedate || handleAddTask?.taskDuedate}
              onChange={handleUpdateTask?.handleTaskDuedate || handleAddTask?.handleTaskDuedate}
              required
            />
          </div>

          <Combobox 
            arr={tagsArray}
            value={handleUpdateTask?.taskTag || handleAddTask?.taskTag || ""}
            onEvent={handleAddTask?.handleTaskTag || handleUpdateTask.handleTaskTag } 
          />
          
          <div>
            <label htmlFor="description"> Description </label>
            <textarea 
              className="h-[120px]"
              id="description"
              required
              value={handleUpdateTask?.taskDescription || handleAddTask?.taskDescription || ""}
              onChange={handleUpdateTask?.handleTaskDescription || handleAddTask?.handleTaskDescription}/>
          </div>

          <div className="form-action">
            <Button 
                tier="btn-primary"
                text='Save'
                type='submit'
            />
            <Button 
                onClick={handleAddTask?.handleCancel || handleUpdateTask?.handleDelete}
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