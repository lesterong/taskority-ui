type handleSearchProps = {
  onChange: any;
  query: string;
};

type SearchProps = {
  handleSearch: handleSearchProps;
};

const Search = ({handleSearch}: SearchProps) => {
  return (
    <input
      type="search"
      placeholder="Search"
      value={handleSearch.query}
      onChange={handleSearch.onChange}
    />
  );
};

export default Search;