import { BASE_URL } from '../utils/consatnts'

function createFetch(url, options) {
  return fetch(url, options)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}

export const register = ({ name, email, password }) => {
  return createFetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
      })
  })
};

export const authorize = ( email, password ) => {
  return createFetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
};