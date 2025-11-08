import { Movie } from "@/lib/definitions";
import MovieWidget from "@/app/components/MovieWidget";

export default function MoviesGrid(props: { movies: Movie[] }) {
  return (
    <>
      <div className="pb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-10 lg:mx-14 ">
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