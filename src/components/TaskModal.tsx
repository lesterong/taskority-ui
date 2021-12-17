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
  title: string;
  displayTask?: {
    id: number;
    title: string;
    description: string;
    duedate: string;
    duetime: string;
    tag: string;
    completed: boolean;
  };
};

const TaskModal = ({closeModal, isOpenModal, title, displayTask}: modalProps) => { 
  return (
    <div>
      <Dialog 
        isOpen={isOpenModal} 
        onDismiss={closeModal}
        aria-label={title}
      >
        <form className="task-form" onSubmit={closeModal}>
          <div className="form-title">
            <h1> {title} </h1>
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
              type="date"
              name="due"
              onChange={(event) => console.log(event.target.value)}
              value={displayTask?.duedate}
            />
            <input 
              type="time"
              name="due"
              onChange={(event) => console.log(event.target.value)}
              value={displayTask?.duetime}
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
                text={title.includes("Add") ? "Cancel" : "Delete"}
            />
          </div>
        </form>

      </Dialog>
    </div>
  );
}

export default TaskModal;