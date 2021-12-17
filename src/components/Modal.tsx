import { Dialog } from "@reach/dialog";
import './Modal.css'
import Button from "./Button"

// show warning if there is already stuff keyed in

type modalProps = {
  closeModal: any;
  isOpenModal: boolean;
  title: string;
};

const Modal = ({closeModal, isOpenModal, title}: modalProps) => {  
  return (
    <div>
      <Dialog 
        className="modal" 
        isOpen={isOpenModal} 
        onDismiss={closeModal}
        aria-label="Task"
      >
        <h1> {title} </h1>
        <form onSubmit={closeModal}>
          <div>
          <input 
            type="text"
            placeholder="Add a title..."
            name="title"
          />
          </div>
          
          <label>
            Due
            <input type="datetime-local"/>
          </label>

          <label>
            Tags
            <select>
              <option> This </option>
              <option> That </option>
            </select>
          </label>
          <Button 
              onClick={() => console.log("testing")}
              tier="btn-primary"
              icon=""
              text='Save'
              type='submit'
          />
          <Button 
              onClick={() => console.log("testing")}
              tier="btn-secondary"
              icon=""
              text='Cancel'
          />
        </form>

      </Dialog>
    </div>
  );
}

export default Modal;