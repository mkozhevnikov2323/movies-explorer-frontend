export const BASE_URL = 'https://api.movies.m23.nomoredomains.xyz';
export const BASE_URL_MOVIES = 'https://api.nomoreparties.co/beatfilm-movies';

export const headersAuthorization = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
}

export function createFetch(url, options) {
  return fetch(url, options)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}