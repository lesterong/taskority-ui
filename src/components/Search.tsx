import { HandleSearchProps } from '../types';

type SearchProps = {
  handleSearch: HandleSearchProps;
};

const Search = ({ handleSearch }: SearchProps) => {
  const { query, open, close, onChange } = handleSearch;
  return (
    <input
      className='h-[50px] sm:w-[220px] w-full'
      type='search'
      placeholder='Search'
      value={query}
      onChange={onChange}
      autoFocus
      onBlur={query === '' ? close : open}
    />
  );
};

export default Search;
