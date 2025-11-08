"use client";
import MoviesGrid from "@/app/components/MoviesGrid";
import PaginationButtons from "@/app/components/PaginationButtons";
import { SearchFilters } from "@/app/components/SearchFilters";
import { useState, useEffect, useCallback } from "react"
import { Movie, Filters } from "@/lib/definitions";

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

  const fetchMovies = useCallback(async () => {
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

    const response = await fetch(`/api/favorites?${params}`);
    const data = await response.json();
    setMovies(data.favorites);

    if (data.favorites.length < 6) {
      setTotalPages(page);
    } else {
      setTotalPages(page + 1);
    }

    setLoading(false);
  }, [page, filters]);

  useEffect(() => {
    const handleFavoriteChange = () => {
      fetchMovies();
    };

    window.addEventListener('favoriteChanged', handleFavoriteChange);
    return () => window.removeEventListener('favoriteChanged', handleFavoriteChange);
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
  }, [page, filters]);

  return (
    <div className="flex flex-col gap-4 py-6">
      <h1 className="text-5xl font-bold text-center py-2">Favorites</h1>
      {loading ? <div className="text-center">Loading...</div> : <MoviesGrid movies={movies} />}
      <PaginationButtons
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
