// Расчет кол-ва карточек на экран + добавление карточек
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

