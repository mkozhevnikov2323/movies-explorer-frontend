import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { URL_MOVIES_DOMAIN, SAVED_MOVIES_PATH } from "../../../utils/consatnts";
import { convertToHoursAndMinutes } from "../../../utils/functions";

export default function MoviesCard({ movie, likeMovies, savedMovies, checkboxFilter }) {
  const [isLiked, setIsLiked] = useState(false);
  const { pathname } = useLocation();

  const handleAddLike = () => {
    const savedMovie = savedMovies.filter((obj) => {
      return obj.movieId === movie.id;
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
    if (pathname !== SAVED_MOVIES_PATH) {
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

  return (
    <div className="movieCard">
      <a href={movie.trailerLink} target='_blank' rel="noreferrer" className="movieCard__trailer-link">
        <img
          className="movieCard__image"
          src={
            pathname === SAVED_MOVIES_PATH
              ? `${movie.image}`
              : `${URL_MOVIES_DOMAIN}${movie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>
      <h2 className="movieCard__title">{movie.nameRU}</h2>
      {pathname === SAVED_MOVIES_PATH ? (
        <button type="button" className="movieCard__delete" onClick={handleDislike}></button>
      ) : (
        <button
          type="button"
          className={isLiked ? `movieCard__like movieCard__like_active` : `movieCard__like`}
          onClick={handleAddLike}
        ></button>
      )}
      <p className="movieCard__duration">
        {convertToHoursAndMinutes(movie.duration)}
      </p>
    </div>
  );
}
