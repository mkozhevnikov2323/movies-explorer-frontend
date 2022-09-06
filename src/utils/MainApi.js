import { BASE_URL, headersAuthorization } from './consatnts';
import { createFetch } from './functions';

export const getUserInfo = () => {
  return createFetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: headersAuthorization
  })
}

export const updateUserInfo = (data) => {
  return createFetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: headersAuthorization,
    body: JSON.stringify(data)
  })
}

export const getMovies = () => {
  return createFetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: headersAuthorization
  })
}

export const createMovie = (data) => {
  return createFetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: headersAuthorization,
    body: JSON.stringify(data)
  })
}

export const deleteMovie = (movieId) => {
  return createFetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: headersAuthorization
  })
}