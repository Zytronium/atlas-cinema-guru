"use client";

import { useEffect, useState } from "react";

export function SearchBar() {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        placeholder="Search Movies..."
        className="rounded-full p-2 min-w-96 bg-blue border-teal border-2"
        type="text"
        name="search"
      />
    </div>
  );
}

export function YearFilters() {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="minYear">Min Year</label>
        <input
          id="minYear"
          className="rounded-full p-2 bg-blue border-teal border-2"
          type="number"
          defaultValue="1990"
          name="minYear"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="maxYear">Max Year</label>
        <input
          id="maxYear"
          className="rounded-full p-2 bg-blue border-teal border-2"
          type="number"
          defaultValue="2025"
          name="maxYear"
        />
      </div>
    </div>
  );
}

export function GenreFilter() {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch('/api/genres');
      const data = await response.json();
      setGenres(data.genres);
    }

    fetchGenres();
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <label>Genres</label>
      <div className="flex flex-wrap max-w-md">
        {genres.map((genre) => (
          <button
            key={genre}
            className="border-teal bg-dark-blue border-2 rounded-full p-2 m-1"
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SearchFilters() {
  return (
    <div className="flex text-lg items-center justify-between h-full px-16 pr-24">
      <div className="flex flex-col items-start space-y-4">
        <SearchBar />
        <YearFilters />
      </div>
      <GenreFilter />
    </div>
  );
}