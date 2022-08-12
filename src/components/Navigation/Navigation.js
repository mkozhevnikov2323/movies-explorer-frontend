import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className='Navigation'>
      <Link to='/signup'>
        Регистрация
      </Link>
      <Link to='/signin'>
        Войти
      </Link>
      <Link to='/movies'>
        Фильмы
      </Link>
      <Link to='/saved-movies'>
        Сохраненные фильмы
      </Link>
      <Link to='/profile'>
        Аккаунт
      </Link>
    </div>
  )
}
