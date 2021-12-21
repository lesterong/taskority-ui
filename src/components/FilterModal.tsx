import { Dialog } from "@reach/dialog";
import Button from "./Button";
import close from '../assets/close.svg';
import './Modal.css';

type handleFiltersProps = {
  tagsArray: string[];
  open: () => void;
  isOpen: boolean;
  close: () => void;
  filters: string[];
  handleTagsCheckbox: (event: any) => void;
  handleTaskStatus: (event: any) => void;
  handleClear: () => void;
};

const FilterModal = ({handleFilters, text}: {handleFilters: handleFiltersProps, text: string}) => {    
  const { tagsArray, isOpen, filters, handleTagsCheckbox, handleTaskStatus, handleClear } = handleFilters;

  const checkAll = filters[0] === 'All Tasks' ? true : false;
  const checkActive = filters[0] === 'Active Tasks' ? true : false;
  const checkCompleted = filters[0] === 'Completed Tasks' ? true : false;
  const checkTags = (tag: string) => filters.includes(tag);

  return (
    <div>
      <Dialog 
        isOpen={isOpen} 
        onDismiss={handleFilters.close}
        aria-label={text}
      >

        <form onSubmit={(event: any) => event.preventDefault()}>
          <div className="form-title">
            <h1> {text} </h1>
            <Button onClick={handleFilters.close} variant="btn-secondary" icon={close}/>
          </div>
          
          <fieldset onChange={handleTaskStatus}>
            <legend> <b>Task Status</b> </legend>
            <div className="input-container">
              <input 
                type="radio" name="Task Status" id="All Tasks" 
                value="All Tasks" defaultChecked={checkAll}
                onClick={handleTaskStatus}
              />
              <label htmlFor="All Tasks"> All Tasks </label>
            </div>

            <div className="input-container">
              <input 
                type="radio" name="Task Status" id="Active Tasks"
                value="Active Tasks" defaultChecked={checkActive}
                onClick={handleTaskStatus}
              />
              <label htmlFor="Active Tasks"> Active Tasks </label>
            </div>
          
            <div className="input-container">
              <input 
                type="radio" name="Task Status" id="Completed Tasks" 
                value="Completed Tasks" defaultChecked={checkCompleted}
                onClick={handleTaskStatus}
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
                  onClick={handleTagsCheckbox} defaultChecked={checkTags(tag)}/>
                <label htmlFor={tag}> {tag} </label>
              </div>
            ))}
          </fieldset>
          
          <div className="form-action">
            <Button 
              onClick={handleFilters.close}
              variant="btn-primary sm:hidden"
              text='Apply'
            />
            <Button 
              onClick={() => {handleClear()}}
              variant="btn-secondary"
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