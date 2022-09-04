import { BASE_URL_MOVIES, createFetch } from './consatnts';

export const getMoviesFromBeat = () => {
  return createFetch(`${BASE_URL_MOVIES}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
}