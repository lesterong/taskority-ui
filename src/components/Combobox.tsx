import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  
  ComboboxOption,  ComboboxOptionText } from "@reach/combobox";
import { useState } from 'react';
import './Combobox.css';

// make the results array disappear when no matches / say add new tag
// pass in a value for comboboxInput

// we handleChange
// if the first letter diff, empty array -- then we say Add new tag

const TagsInput = ({arr, value, onEvent}: any) => {
  // const [array, setArray] = useState<any[]>(arr);
  // array.filter(item => item.includes('input value');

  const onSelect = (item: any) => {
    onEvent(item.target.value);
  }

  const onChange = (event: any) => {
    onEvent(event.target.value);
  }

  return (
    <div>
      <p> Tags </p>
        <Combobox openOnFocus aria-labelledby="tags">
            <ComboboxInput 
              className="combobox-input" 
              placeholder="Select a tag"
              onSelect={onSelect}
              value={value}
              onChange={onChange}
            />
            <ComboboxPopover>
              <ComboboxList>
                {arr.map((item: string) => (
                  <ComboboxOption 
                    key={item} 
                    value={item}
                    onClick={() => onEvent(item)}
                  >
                  <ComboboxOptionText />
                  </ComboboxOption>
                ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
    </div>
  );
};

export default TagsInput;