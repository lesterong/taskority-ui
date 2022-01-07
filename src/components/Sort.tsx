import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import './Button.css';

type handleSortProps = {
  sortBy: string[];
  onSelectSort: any;
};

const Sort = ({handleSort}: any) => {
  const {sortBy, onSelectSort, onChangeOrder} = handleSort;
  return (
    <Menu>
      <MenuButton className="border-0 p-0 h-auto shrink-0 ml-2 outline-none">
        <p> Sort: {sortBy[0]} {sortBy[1] === 'Ascending' ? ' ↑' : ' ↓'}</p>
      </MenuButton>
      <MenuList>
        <p className="dropdown-header"> Sort By </p>
        <MenuItem onSelect={onSelectSort('Date Created')}> Date Created </MenuItem>
        <MenuItem onSelect={onSelectSort('Due Date')}> Due Date </MenuItem>
        <MenuItem onSelect={onSelectSort('Alphabetical')}> Alphabetical </MenuItem>
        <div className="border-t border-gray-300">
          <fieldset>
            <legend className="dropdown-header"> Order </legend>
            <div className="input-container hover:bg-sky-100">
              <input 
                className="ml-4" type="radio" 
                id="Ascending" name="Order" value="Ascending"
                defaultChecked={sortBy[1] === 'Ascending'}
                onChange={onChangeOrder}
              />
              <label className="py-3 pr-6" htmlFor="Ascending"> Ascending </label>
            </div>
            <div className="input-container hover:bg-sky-200">
              <input 
                className="ml-4" type="radio"
                id="Descending" name="Order" value="Descending"
                defaultChecked={sortBy[1] === 'Descending'}
                onChange={onChangeOrder}
              />
              <label className="py-3 pr-6" htmlFor="Descending"> Descending </label>
            </div>
          </fieldset>
        </div>
      </MenuList>
    </Menu>
  );
};

export default Sort;