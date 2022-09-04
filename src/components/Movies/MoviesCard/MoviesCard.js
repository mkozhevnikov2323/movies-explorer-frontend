import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ film, likeMovies, filmsSaved, toggle }) {
  // Добавленная ли карточка
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  // Лайк карточке
  const handleAddLike = () => {
    const savedFilm = filmsSaved.filter((filmSaved) => {
      return filmSaved.movieId === film.id;
    });
    setIsLiked(!isLiked)
    likeMovies(
      { ...film, _id: savedFilm.length > 0 ? savedFilm[0]._id : null },
      !isLiked
    );
  };

  const handleDislike = () => {
    likeMovies(film, false);
  };

  useEffect(() => {
    if (pathname !== "/saved-movies") {
      const savedFilm = filmsSaved.filter((obj) => {
        return obj.movieId === film.id;
      });

      if (savedFilm.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [pathname, toggle, film.id, filmsSaved]);

  function convertToHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="movieCard">
      <a href={film.trailerLink} target='_blank' rel="noreferrer" className="movieCard__trailer-link">
        <img
          className="movieCard__image"
          src={
            pathname === "/saved-movies"
              ? `${film.image}`
              : `https://api.nomoreparties.co${film.image.url}`
          }
          alt={film.nameRU}
        />
      </a>
      <h2 className="movieCard__title">{film.nameRU}</h2>
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
        {convertToHoursAndMinutes(film.duration)}
      </p>
    </div>
  );
}
