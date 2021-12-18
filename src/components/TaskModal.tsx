import { Dialog } from "@reach/dialog";
import './Modal.css';
import './TaskModal.css';
import Button from "./Button";
import close from '../assets/close.svg';

// show warning if there is already stuff keyed in
// handleSubmit form

type modalProps = {
  closeModal: () => void;
  isOpenModal: boolean;
  text: string;
  displayTask?: {
    id: number;
    title: string;
    description: string;
    duedate: string;
    tag: string;
    completed: boolean;
  };
};

const TaskModal = ({closeModal, isOpenModal, text, displayTask}: modalProps) => { 
  return (
    <div>
      <Dialog 
        isOpen={isOpenModal} 
        onDismiss={closeModal}
        aria-label={text}
      >
        <form className="task-form" onSubmit={closeModal}>
          <div className="form-title">
            <h1> {text} </h1>
            <button onClick={closeModal}>
              <img src={close} onClick={closeModal}/> 
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
            value={displayTask?.title}
            onChange={(event) => console.log(event.target.value)}
          />
          
          <label>
            Due
            <input 
              type="datetime-local"
              name="due"
              step="60"
              onChange={(event) => console.log(event.target.value)}
              value={displayTask?.duedate}
            />
          </label>

          <label>
            Tags
            <select>
              <option> This </option>
              <option> That </option>
            </select>
          </label>

          <label>
            Description
            <textarea value={displayTask?.description} onChange={(event) => console.log(event.target)}/>
          </label>

          <div className="form-action">
            <Button 
                onClick={() => console.log("testing")}
                tier="btn-primary"
                text='Save'
                type='submit'
            />
            <Button 
                onClick={() => console.log("testing")}
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