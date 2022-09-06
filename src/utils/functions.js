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