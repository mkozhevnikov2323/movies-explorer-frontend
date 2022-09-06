import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { SAVED_MOVIES_PATH } from "../../../utils/consatnts";

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

  function renderCard(movieList) {
    return movieList.map((movie) => (
      <MoviesCard
        key={movie.id || movie.movieId}
        movie={movie}
        likeMovies={handleAddMovieToSaved}
        savedMovies={savedMovies}
        checkboxFilter={checkboxFilter}
      />
    ))
  }

  return (
    <>
      <section className="moviesCardList">
        {checkboxFilter
          ? renderCard(moviesShort)
          : renderCard(moviesShowed)}
      </section>
      {movies.length > 0 && !checkboxFilter && pathname !== SAVED_MOVIES_PATH && (
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
