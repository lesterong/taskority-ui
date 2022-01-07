import { Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList, ComboboxOption, ComboboxOptionText } from "@reach/combobox";
import './TagsInput.css';

type TagsInput = {
  tagsArray: string[];
  value: string;
  onEvent: (value: string) => void;
};

const TagsInput = ({tagsArray, value, onEvent}: any) => {
  const tagsToShow = value === ''
    ? tagsArray
    : tagsArray.filter((elem: string) => elem.toLowerCase().includes(value.toLowerCase()));

  return (
    <div>
      <p> Tags </p>
      <Combobox openOnFocus onSelect={(item) => onEvent(item)}>
        <ComboboxInput 
          className="combobox-input"
          value={value}
          placeholder="Select a tag"
          onChange={(event) => onEvent(event.target.value)}
        />
        <ComboboxPopover>
          <ComboboxList>
            {(value !=='' && tagsToShow.map((elem: string) => elem.toLowerCase()).indexOf(value.toLowerCase()) === -1) &&
              <ComboboxOption
                value={value}
                onMouseUp={() => onEvent(value)}
                onTouchEnd={() => onEvent(value)}
              >
                <span className="text-gray-400">Create '<ComboboxOptionText/>'</span>
              </ComboboxOption>
            }
            {tagsToShow
              .sort((tag1: string, tag2: string) => tag1 < tag2 ? -1 : 1)
              .map((item: string) => (
              <ComboboxOption 
                key={item}
                value={item}
                onMouseUp={() => onEvent(item)}
                onTouchEnd={() => onEvent(item)}
              />
            ))}
            
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default TagsInput;