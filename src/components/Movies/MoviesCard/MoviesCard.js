import React from 'react';
import './MoviesCard.css';

export default function MoviesCard({ movie }) {
  const { nameRu, duration, image, save } = movie;

  function convertToHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className='movieCard'>
      <img className='movieCard__image' src={image} alt={nameRu} />
      <h2 className='movieCard__title'>{nameRu}</h2>
      {
        save ? (
          <button type='button' className='movieCard__like movieCard__like_active'></button>
        ) : (
          <button type='button' className='movieCard__like'></button>
        )
      }
      <p className='movieCard__duration'>{convertToHoursAndMinutes(duration)}</p>
    </div>
  )
}
