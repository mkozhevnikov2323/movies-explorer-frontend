import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ movie, likeMovies, savedMovies, checkboxFilter }) {
  // Добавленная ли карточка
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  // Лайк карточке
  const handleAddLike = () => {
    const savedMovie = savedMovies.filter((movie) => {
      return movie.movieId === movie.id;
    });
    setIsLiked(!isLiked)
    likeMovies(
      { ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null },
      !isLiked
    );
  };

  const handleDislike = () => {
    likeMovies(movie, false);
  };

  useEffect(() => {
    if (pathname !== "/saved-movies") {
      const savedMovie = savedMovies.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedMovie.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [pathname, checkboxFilter, movie.id, savedMovies]);

  function convertToHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="movieCard">
      <a href={movie.trailerLink} target='_blank' rel="noreferrer" className="movieCard__trailer-link">
        <img
          className="movieCard__image"
          src={
            pathname === "/saved-movies"
              ? `${movie.image}`
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>
      <h2 className="movieCard__title">{movie.nameRU}</h2>
      {pathname !== "/saved-movies" ? (
        <button
          type="button"
          className={isLiked ? `movieCard__like movieCard__like_active` : `movieCard__like`}
          onClick={handleAddLike}
        ></button>
      ) : (
        <button type="button" className="movieCard__delete" onClick={handleDislike}></button>
      )}
      <p className="movieCard__duration">
        {convertToHoursAndMinutes(movie.duration)}
      </p>
    </div>
  );
}
