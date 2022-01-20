import { HandleSearching } from '../types/Search';

const Search = ({ handleSearch }: { handleSearch: HandleSearching }) => {
  const { query, open, close, onChange } = handleSearch;
  return (
    <input
      className='sm:w-[220px] w-full'
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
