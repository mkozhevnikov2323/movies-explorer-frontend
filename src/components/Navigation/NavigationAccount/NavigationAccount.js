import React from 'react';
import './NavigationAccount.css';
import { Link } from 'react-router-dom';

export default function NavigationAccount() {
  return (
    <ul className='navigation'>
      <li className='navigation__link'>
        <Link to='/movies'>
          Фильмы
        </Link>
      </li>
      <li className='navigation__link'>
        <Link to='/saved-movies'>
          Сохраненные фильмы
        </Link>
      </li>
      <li className='navigation__link'>
        <Link to='/profile'>
          Аккаунт
        </Link>
      </li>
    </ul>
  )
}
