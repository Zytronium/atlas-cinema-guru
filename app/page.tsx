"use client";
import MovieWidget from "@/app/components/MovieWidget";
import PaginationButtons from "@/app/components/PaginationButtons";
import { SearchFilters } from "@/app/components/SearchFilters";
import { useState, useEffect, useCallback } from "react"
import { Movie, Filters } from "@/lib/definitions";

function MoviesGrid(props: { movies: Movie[] }) {
  return (
    <>
      <div className="pb-2 flex row flex-wrap gap-4 justify-between mx-4 md:mx-10">
        {props.movies.map((movie, i) => (
          <MovieWidget
            key={i}
            id={movie.id}
            title={movie.title}
            year={movie.released}
            description={movie.synopsis}
            image={movie.image}
            genre={movie.genre}
            favorited={movie.favorited}
            watchLater={movie.watchLater}
          />
        ))}
      </div>
    </>
  );
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    minYear: 1990,
    maxYear: 2025,
    genres: [],
    query: ""
  });
  const [loading, setLoading] = useState(false);

  const handleFiltersChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  }, []);

  async function fetchMovies() {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      minYear: filters.minYear.toString(),
      maxYear: filters.maxYear.toString(),
    });

    if (filters.genres.length > 0) {
      params.append('genres', filters.genres.join(","));
    }
    if (filters.query.trim()) {
      params.append('query', filters.query);
    }

    const response = await fetch(`/api/titles?${params}`);
    const data = await response.json();
    setMovies(data.title); // note: API returns array `title` instead of `titles`

    if (data.title.length < 6) {
      setTotalPages(page);
    } else {
      setTotalPages(page + 1);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMovies();
  }, [page, filters]);
  return (
    <div className="flex flex-col gap-4 py-6">
      <SearchFilters onFiltersChange={handleFiltersChange} />
      {loading ? <div>Loading...</div> : <MoviesGrid movies={movies}/>}
      <PaginationButtons
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
