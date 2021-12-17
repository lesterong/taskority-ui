import { Dialog } from "@reach/dialog";
import './Modal.css';
import './FilterModal.css';
import Button from "./Button";
import close from '../assets/close.svg';

type modalProps = {
  closeModal: any;
  isOpenModal: boolean;
  title: string;
};

const FilterModal = ({closeModal, isOpenModal, title}: modalProps) => {  
  return (
    <div>
      <Dialog 
        className="modal" 
        isOpen={isOpenModal} 
        onDismiss={closeModal}
        aria-label={title}
      >

        <form className="filters-form">
          <div className="form-title">
            <h1> {title} </h1>
            <img className="cursor-pointer" src={close} onClick={closeModal}/> 
          </div>
          
          <fieldset>  
            <p> <b> Task Status </b></p>
            <label>
              <input type="radio" name="hello"/>
              <p> All Tasks </p>
            </label>
            <label>
              <input type="radio" name="hello"/>
              <p> Active Tasks </p>
            </label>
            <label>
              <input type="radio" name="hello"/>
              <p> Completed Tasks </p>
            </label>
          </fieldset>

          <fieldset>  
            <p> <b> Select Tags </b></p>
            <label>
              <input type="checkbox" name="tags"/>
              <p> Tag 1 </p>
            </label>

            <label>
              <input type="checkbox" name="tags"/>
              <p> Tag 2 </p>
            </label>
          </fieldset>
          
          <div className="form-action">
            <Button 
                onClick={() => console.log("testing")}
                tier="btn-primary"
                text='Apply'
                type='submit'
            />
            <Button 
                onClick={() => console.log("testing")}
                tier="btn-secondary"
                text='Clear'
                type='reset'
            />
          </div>
        </form>

      </Dialog>
    </div>
  );
}

export default FilterModal;