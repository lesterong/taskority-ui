import { Dialog } from "@reach/dialog";
import './Modal.css';
import './TaskModal.css';
import Button from "./Button";
import close from '../assets/close.svg';

// show warning if there is already stuff keyed in

type modalProps = {
  closeModal?: any;
  isOpenModal?: boolean;
  text: string;
  handleAddTask?: any;
  displayTask?: {
    id: number;
    title: string;
    description: string;
    duedate: string;
    tag: string;
    completed: boolean;
  };
};

const TaskModal = ({closeModal, isOpenModal, text, handleAddTask, displayTask}: modalProps) => { 
  return (
    <div>
      <Dialog 
        isOpen={isOpenModal} 
        onDismiss={handleAddTask?.handleCancel || closeModal}
        aria-label={text}
      >
        
        <form className="task-form" onSubmit={handleAddTask?.handleSubmit || closeModal}>
          <div className="form-title">
            <h1> {text} </h1>
            <button onClick={closeModal}>
              <img src={close} onClick={handleAddTask?.handleCancel || closeModal}/> 
            </button>
          </div>

          {displayTask && (displayTask?.completed 
            ? <p> This task is completed. </p>
            : <p> This task is still active. </p>
          )}

          <input 
            type="text"
            placeholder="Add a title..."
            name="title"
            // value={displayTask?.title}
            value={displayTask?.title || handleAddTask?.taskTitle}
            onChange={handleAddTask?.handleTaskTitle || closeModal}
            required
          />
          
          <label>
            Due
            <input 
              type="datetime-local"
              name="due"
              step="60"
              value={displayTask?.duedate || handleAddTask?.taskDuedate}
              onChange={handleAddTask?.handleTaskDuedate || closeModal}
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
              value={displayTask?.description || handleAddTask?.taskDescription}
              onChange={handleAddTask?.handleTaskDescription || closeModal}/>
          </label>

          <div className="form-action">
            <Button 
                tier="btn-primary"
                text='Save'
                type='submit'
            />
            <Button 
                onClick={handleAddTask?.handleCancel || closeModal}
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