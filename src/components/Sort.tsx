import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import { motion } from 'framer-motion';
import { HandleSorting } from '../types/Sort';
import './Button.css';

const Sort = ({ handleSort }: { handleSort: HandleSorting }) => {
  const { sortBy, onSelectSort, onChangeOrder } = handleSort;
  const variants = {
    Ascending: { rotate: 0 },
    Descending: { rotate: 180 },
  };

  return (
    <Menu>
      <MenuButton className='border-0 p-0 h-auto shrink-0 ml-2 outline-none flex'>
        <p>{`Sort: ${sortBy[0]}`}</p>
        <motion.div
          className='ml-1 -z-10'
          initial={sortBy[1]}
          animate={sortBy[1]}
          variants={variants}
        >
          ↑
        </motion.div>
      </MenuButton>
      <MenuList>
        <p className='pl-4 pt-3 text-sm text-gray-400'> Sort By </p>
        <MenuItem onSelect={onSelectSort('Date Created')}>
          Date Created
        </MenuItem>
        <MenuItem onSelect={onSelectSort('Due Date')}> Due Date </MenuItem>
        <MenuItem onSelect={onSelectSort('Alphabetical')}>
          Alphabetical
        </MenuItem>
        <div className='border-t border-gray-300'>
          <fieldset>
            <legend className='pl-4 pt-3 text-sm text-gray-400'> Order </legend>
            <div className='input-container hover:bg-sky-100'>
              <input
                className='ml-4'
                type='radio'
                id='Ascending'
                name='Order'
                value='Ascending'
                defaultChecked={sortBy[1] === 'Ascending'}
                onChange={onChangeOrder}
              />
              <label className='py-3 pr-6 cursor-pointer' htmlFor='Ascending'>
                Ascending
              </label>
            </div>
            <div className='input-container hover:bg-sky-200'>
              <input
                className='ml-4'
                type='radio'
                id='Descending'
                name='Order'
                value='Descending'
                defaultChecked={sortBy[1] === 'Descending'}
                onChange={onChangeOrder}
              />
              <label className='py-3 pr-6 cursor-pointer' htmlFor='Descending'>
                Descending
              </label>
            </div>
          </fieldset>
        </div>
      </MenuList>
    </Menu>
  );
};

export default Sort;
