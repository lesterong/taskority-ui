import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';
import { TagsInputProps } from '../types/TagsInput';
import './TagsInput.css';

const TagsInput = ({ tagsArray, value, onEvent }: TagsInputProps) => {
  const tagsToShow = !value
    ? tagsArray.filter((elem: string) => elem !== '')
    : tagsArray
        .filter((elem: string) => elem !== '')
        .filter((elem: string) =>
          elem.toLowerCase().includes(value.toLowerCase()),
        );

  return (
    <div>
      <p> Tags </p>
      <Combobox openOnFocus onSelect={(item) => onEvent(item)}>
        <ComboboxInput
          value={value}
          placeholder='Select a tag'
          onChange={(event) => onEvent(event.target.value)}
        />
        <ComboboxPopover>
          <ComboboxList>
            {value &&
              tagsToShow
                .map((elem: string) => elem.toLowerCase())
                .indexOf(value.toLowerCase()) === -1 && (
                <ComboboxOption
                  value={value}
                  onMouseUp={() => onEvent(value)}
                  onTouchEnd={() => onEvent(value)}
                >
                  <span className='text-gray-400'>
                    Create &apos;
                    <ComboboxOptionText />
                    &apos;
                  </span>
                </ComboboxOption>
              )}
            {tagsToShow
              .sort((tag1: string, tag2: string) => (tag1 < tag2 ? -1 : 1))
              .map((item: string) => (
                <ComboboxOption
                  key={item}
                  value={item}
                  onMouseUp={() => onEvent(item)}
                  onTouchEnd={() => onEvent(item)}
                />
              ))}
            {tagsToShow.length === 0 && !value && (
              <p className='text-gray-400 p-2'> Create a new tag! </p>
            )}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default TagsInput;
