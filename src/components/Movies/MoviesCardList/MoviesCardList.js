import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  films,
  filmsShowed,
  onShowMore,
  handleAddFilm,
  filmsSaved,
  toggle,
  filmsShort,
}) {
  const { pathname } = useLocation();

  return (
    <>
      <section className="moviesCardList">
        {toggle
          ? filmsShort.map((film) => (
              <MoviesCard
                key={film.id || film.movieId}
                film={film}
                likeMovies={handleAddFilm}
                filmsSaved={filmsSaved}
                toggle={toggle}
              />
            ))
          : filmsShowed.map((film) => (
              <MoviesCard
                key={film.id || film.movieId}
                film={film}
                likeMovies={handleAddFilm}
                filmsSaved={filmsSaved}
                toggle={toggle}
              />
            ))}
      </section>
      {films.length > 0 && !toggle && pathname !== "/saved-movies" && (
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
