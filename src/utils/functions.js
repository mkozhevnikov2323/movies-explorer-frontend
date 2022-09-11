import { SHORT_MOVIE_DURATION } from './consatnts';

export function createFetch(url, options) {
  return fetch(url, options)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}

export const getQuantityOfMovieCard = () => {
  let quantityOfMovieCard;
  const clientWidth = document.documentElement.clientWidth;

  if (clientWidth >= 1024) {
    quantityOfMovieCard = [12, 3];
  } else if (clientWidth < 1024 && clientWidth >= 768) {
    quantityOfMovieCard = [8, 2];
  } else {
    quantityOfMovieCard = [5, 2];
  }

  return quantityOfMovieCard;
};

export const convertToHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}ч ${minutes}м`;
}

export const filterMovies = () => {
  const allMovies = JSON.parse(localStorage.getItem('movies'));
  const dataFromSearchForm = localStorage.getItem('dataFromSearchForm');
  const checkboxFilter = localStorage.getItem('checkboxFilter');

  const moviesAfterFilter = allMovies?.filter(({ nameRU }) =>
    nameRU.toLowerCase().includes(dataFromSearchForm.toLowerCase())
  );

  if (checkboxFilter === 'true') {
    const moviesWithShort = moviesAfterFilter?.filter(
      ({ duration }) => duration <= SHORT_MOVIE_DURATION
    );
    return moviesWithShort;
  } else {
    return moviesAfterFilter;
  }
}