import { Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList, ComboboxOption } from "@reach/combobox";
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
        <Combobox openOnFocus aria-labelledby="tags">
            <ComboboxInput
              className="combobox-input" 
              placeholder="Select a tag"
              onSelect={(event: any) => onEvent(event.target.value)}
              value={value}
              onChange={(event: any) => onEvent(event.target.value)}
            />
            {tagsToShow && (
              <ComboboxPopover>
                {tagsToShow.length > 0
                  ? <ComboboxList>
                    {tagsToShow.map((item: string) => (
                      <ComboboxOption
                        key={item} 
                        value={item}
                        onMouseDown={() => onEvent(item)}
                        onTouchStart={() => onEvent(item)}
                      >
                      </ComboboxOption>
                    ))}
                  </ComboboxList>
                  : <div className="px-2 py-2 text-gray-400"> <p> '{value}' will be created. </p> </div>
                }
              </ComboboxPopover> 
            )}
          </Combobox>
    </div>
  );
};

export default TagsInput;