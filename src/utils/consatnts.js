export const BASE_URL = 'https://api.movies.m23.nomoredomains.xyz';
export const BASE_URL_MOVIES = 'https://api.nomoreparties.co/beatfilm-movies';
export const URL_MOVIES_DOMAIN = 'https://api.nomoreparties.co';
export const SAVED_MOVIES_PATH = '/saved-movies';
export const SHORT_MOVIE_DURATION = 40;
export const REG_SUCCESS_MESSAGE = 'Вы успешно зарегистрировались.';
export const AUTH_SUCCESS_MESSAGE = 'Вы успешно вошли.';
export const ERROR_CONFLICT_STATUS = 'Ошибка: 409';
export const ERROR_VALIDATION_STATUS = 'Ошибка: 400';
export const ERROR_CONFLICT_MESSAGE = 'Пользователь с данным E-mail присутствует в базе.';
export const ERROR_VALIDATION_MESSAGE = 'Ошибка валидации.';
export const ERROR_SERVER_MESSAGE = 'Произошла ошибка на сервере.';
export const ERROR_SEARCH_EMPTY_MESSAGE = 'Введите данные в форму поиска';
export const ERROR_SAVE_MOVIES = 'Ошибка сохранения фильма';
export const ERROR_GET_MOVIES = 'Ошибка получения сохранненых фильмов';
export const ERROR_DELETE_MOVIES = 'Нельзя удалить чужой сохраненный фильм';
export const NOT_FOUND_SEARCH_MESSAGE = 'Ничего не найдено';
export const CHANGE_AUTH_PROCESS_MESSAGE = 'Уже сохранены текущие данные. Измените имя или email для обновления.';
export const CHANGE_AUTH_SUCCESS_MESSAGE = 'Данные пользователя успешно обновлены.';

export const headersAuthorization = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
}
