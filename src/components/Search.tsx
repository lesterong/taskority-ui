type handleSearchProps = {
  onChange: any;
  query: string;
};

const Search = ({handleSearch}: {handleSearch: handleSearchProps}) => {
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