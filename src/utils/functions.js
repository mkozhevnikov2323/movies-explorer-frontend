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

export const filterMovies = () => {
  const allMovies = JSON.parse(localStorage.getItem('allMovies'));
  const dataFromSearchForm = localStorage.getItem('dataFromSearchForm');
  const checkboxFilter = localStorage.getItem('checkboxFilter');

  const moviesAfterFilter = allMovies.filter(
    (movie) => movie.nameRU.toLowerCase().indexOf(dataFromSearchForm) >= 0
  );
  if (checkboxFilter === 'on') {
    const moviesAfterCheckboxFilter = moviesAfterFilter.filter(
      (movie) => movie.duration < 40
    );
    return moviesAfterCheckboxFilter;
  } else return moviesAfterFilter;
};

export const filterSavedMovies = (movies, dataFromSearchForm, checkboxFilter) => {
  const moviesAfterFilter = movies.filter(
    (movie) => movie.nameRU.indexOf(dataFromSearchForm) >= 0
  );
  if (checkboxFilter === 'on') {
    const moviesAfterCheckboxFilter = moviesAfterFilter.filter(
      (movie) => movie.duration < 40
    );
    return moviesAfterCheckboxFilter;
  } else return moviesAfterFilter;
};