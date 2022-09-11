import { BASE_URL_MOVIES } from './consatnts';
import { createFetch } from './functions';

export const getMoviesFromBeat = () => {
  return createFetch(`${BASE_URL_MOVIES}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
}