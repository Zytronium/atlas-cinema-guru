"use client";

import { useCallback, useEffect, useState } from "react";
import { Filters } from "@/lib/definitions";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface YearFiltersProps {
  onYearChange: (minYear: number, maxYear: number) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        placeholder="Search Movies..."
        className="rounded-full p-2 w-full md:min-w-96 bg-blue border-teal border-2"
        type="text"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export function YearFilters({ onYearChange }: YearFiltersProps) {
  const [minYear, setMinYear] = useState(1990);
  const [maxYear, setMaxYear] = useState(2025);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onYearChange(minYear, maxYear);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [minYear, maxYear, onYearChange]);

  return (
    <div className="flex space-x-4 w-full">
      <div className="flex flex-col space-y-2 flex-1">
        <label htmlFor="minYear">Min Year</label>
        <input
          id="minYear"
          className="rounded-full p-2 w-full bg-blue border-teal border-2"
          type="number"
          value={minYear}
          onChange={(e) => setMinYear(Number(e.target.value))}
          name="minYear"
        />
      </div>
      <div className="flex flex-col space-y-2 flex-1">
        <label htmlFor="maxYear">Max Year</label>
        <input
          id="maxYear"
          className="rounded-full p-2 w-full bg-blue border-teal border-2"
          type="number"
          value={maxYear}
          onChange={(e) => setMaxYear(Number(e.target.value))}
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
    <div className="flex flex-col space-y-2 w-full md:w-auto">
      <label>Genres</label>
      <div className="flex flex-wrap w-full md:max-w-md">
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

export function SearchFilters({ onFiltersChange }: {
  onFiltersChange: (filters: Partial<Filters>) => void
}) {
  const handleSearch = useCallback((query: string) => {
    onFiltersChange({ query });
  }, [onFiltersChange]);

  const handleYearChange = useCallback((minYear: number, maxYear: number) => {
    onFiltersChange({ minYear, maxYear });
  }, [onFiltersChange]);

  return (
    <div
      className="flex flex-col text-lg items-start gap-6 px-4 md:px-16 md:pr-24 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-start space-y-4 w-full md:w-auto">
        <SearchBar onSearch={handleSearch} />
        <YearFilters onYearChange={handleYearChange} />
      </div>
      <GenreFilter />
    </div>
  );
}