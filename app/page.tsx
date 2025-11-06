"use client";
import MovieWidget from "@/app/components/MovieWidget";
import Placeholder from "@/assets/placeholder.svg";
import PaginationButtons from "@/app/components/PaginationButtons";
import { SearchFilters } from "@/app/components/SearchFilters";
import { useState, useEffect } from "react"

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  released: number;
  genre:
    'Romance' | 'Horror'   | 'Drama'   | 'Action' | 'Mystery'  |
    'Fantasy' | 'Thriller' | 'Western' | 'Sci-Fi' | 'Adventure';
  favorited: boolean;
  watchLater: boolean;
  image: string;
}

interface Filters {
  minYear: number;
  maxYear: number;
  genres: string[];
  query: string;
}

function MoviesGrid(props: { movies: Movie[] }) {
  return (
    <>
      <div className="pb-2 flex row flex-wrap gap-4 justify-between mx-10">
        {props.movies.map((movie, i) => (
          <MovieWidget
            key={i}
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

  async function fetchMovies() {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      minYear: filters.minYear.toString(),
      maxYear: filters.maxYear.toString()
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
    <div className="flex flex-col gap-4 p-6">
      <SearchFilters />
      {loading ? <div>Loading...</div> : <MoviesGrid movies={movies}/>}
      <PaginationButtons
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
