import { Dialog } from "@reach/dialog";
import './Modal.css';
import './TaskModal.css';
import Button from "./Button";
import close from '../assets/close.svg';

// show warning if there is already stuff keyed in
// handleSubmit form

type modalProps = {
  closeModal: any;
  isOpenModal: boolean;
  title: string;
};

const TaskModal = ({closeModal, isOpenModal, title}: modalProps) => {  
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
          
          <input 
            type="text"
            placeholder="Add a title..."
            name="title"
          />
          
          <label>
            Due
            <input 
              type="datetime-local"
              name="due"
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
            <textarea>
              
            </textarea>
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
                text='Cancel'
            />
          </div>
        </form>

      </Dialog>
    </div>
  );
}

export default TaskModal;