type handleSearchProps = {
  query: string;
  open: () => void;
  isOpen: boolean;
  close: () => void;
  onChange: (event: any) => void;
  handleClose: () => void;
}

type SearchProps = {
  handleSearch: handleSearchProps;
};

const Search = ({handleSearch}: SearchProps) => {
  const {query, open, close, onChange} = handleSearch;
  return (
    <input
      className="h-[50px] sm:w-[220px] w-full"
      type="search"
      placeholder="Search"
      value={query}
      onChange={onChange}
      autoFocus
      onBlur={query === '' ? close : open}
    />
  );
};

export default Search;