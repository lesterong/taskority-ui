import { Dialog } from "@reach/dialog";
import './Modal.css';
import './FilterModal.css';
import Button from "./Button";
import close from '../assets/close.svg';

type modalProps = {
  handleFilters: any;
  text: string;
};

const FilterModal = ({handleFilters, text}: modalProps) => {    
  const { tagsArray, closeModal, isOpen, filters, handleTagsCheckbox, handleTaskStatus, handleClear } = handleFilters;

  const checkAll = filters[0] === 'All Tasks' ? true : false;
  const checkActive = filters[0] === 'Active Tasks' ? true : false;
  const checkCompleted = filters[0] === 'Completed Tasks' ? true : false;

  const checkedTag = (tag: string) => filters.includes(tag);

  return (
    <div>
      <Dialog 
        isOpen={isOpen} 
        onDismiss={closeModal}
        aria-label={text}
      >

        <form className="filters-form" onSubmit={(event: any) => event.preventDefault()}>
          <div className="form-title">
            <h1> {text} </h1>
            <button onClick={closeModal}>
              <img src={close} alt="Close"/> 
            </button>
          </div>
          
          <fieldset onChange={handleTaskStatus}>
            <legend> <b>Task Status</b> </legend>
            <div className="input-container">
              <input 
                type="radio" name="Task Status" id="All Tasks" 
                value="All Tasks" defaultChecked={checkAll}
              />
              <label htmlFor="All Tasks"> All Tasks </label>
            </div>

            <div className="input-container">
              <input 
                type="radio" name="Task Status" id="Active Tasks"
                value="Active Tasks" defaultChecked={checkActive}
              />
              <label htmlFor="Active Tasks"> Active Tasks </label>
            </div>
          
            <div className="input-container">
              <input 
                type="radio" name="Task Status" id="Completed Tasks" 
                value="Completed Tasks" defaultChecked={checkCompleted}
              />
              <label htmlFor="Completed Tasks"> Completed Tasks </label>
            </div>
          </fieldset>

          <fieldset>
            <legend> <b>Select Tags</b> </legend>  
            {tagsArray.map((tag: any) => (
              <div key={tag} className="input-container">
                <input 
                  type="checkbox" name="tags" id={tag} value={tag} 
                  onChange={handleTagsCheckbox} defaultChecked={checkedTag(tag)}/>
                <label htmlFor={tag}> {tag} </label>
              </div>
            ))}
          </fieldset>
          
          <div className="form-action">
              <Button 
                onClick={closeModal}
                tier="btn-primary md:hidden"
                text='Apply'
              />
            <Button 
                onClick={() => {handleClear()}}
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