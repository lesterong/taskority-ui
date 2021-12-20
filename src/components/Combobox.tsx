import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  
  ComboboxOption,  ComboboxOptionText } from "@reach/combobox";
import './Combobox.css';

const TagsInput = ({arr, value, onEvent}: any) => {
  const arrayToShow = value === ''
    ? arr
    : arr.filter((elem: any) => elem.toLowerCase().includes(value.toLowerCase()))

  return (
    <div>
      <p> Tags </p>
        <Combobox openOnFocus aria-labelledby="tags">
            <ComboboxInput
              className="combobox-input" 
              placeholder="Select a tag"
              onSelect={(event: any) => onEvent(event.target.value)}
              value={value}
              onChange={(event: any) => onEvent(event.target.value)}
            />
            {arrayToShow && (
              <ComboboxPopover>
                { arrayToShow.length > 0
                ? <ComboboxList>
                  {arrayToShow.map((item: string) => (
                    <ComboboxOption
                      key={item} 
                      value={item}
                      onFocus={() => onEvent(item)}
                    >
                    </ComboboxOption>
                  ))}
                </ComboboxList>
                  : <div className="option"> <p> '{value}' will be created. </p> </div>
                }
              </ComboboxPopover> 
            )}
          </Combobox>
    </div>
  );
};

export default TagsInput;