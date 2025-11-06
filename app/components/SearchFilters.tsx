function SearchBar() {
  return <div>
    Search
  </div>;
}

function YearFilters() {
  return <div className="flex items-center justify-center h-full">
    <div>Min Year</div>
    <div className="px-8"></div>
    <div>Max Year</div>
  </div>;
}

function GenreFilter() {
  return <div>Genre</div>;
}

export function SearchFilters() {
  return (
    <div className="flex text-lg items-center justify-between h-full px-16 pr-24">
      <div>
        <SearchBar />
        <YearFilters />
      </div>
      <GenreFilter />
    </div>
  );
}