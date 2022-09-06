import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  movies,
  moviesShowed,
  onShowMore,
  handleAddMovieToSaved,
  savedMovies,
  checkboxFilter,
  moviesShort,
}) {
  const { pathname } = useLocation();

  return (
    <>
      <section className="moviesCardList">
        {checkboxFilter
          ? moviesShort.map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                likeMovies={handleAddMovieToSaved}
                savedMovies={savedMovies}
                checkboxFilter={checkboxFilter}
              />
            ))
          : moviesShowed.map((movie) => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                likeMovies={handleAddMovieToSaved}
                savedMovies={savedMovies}
                checkboxFilter={checkboxFilter}
              />
            ))}
      </section>
      {movies.length > 0 && !checkboxFilter && pathname !== "/saved-movies" && (
        <section className="movies__more">
          <button
            onClick={onShowMore}
            type="button"
            className="movies__more-btn"
          >
            Ещё
          </button>
        </section>
      )}
    </>
  );
}
