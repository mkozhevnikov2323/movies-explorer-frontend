import React from 'react';
import './NavigationAccount.css';
import { Link } from 'react-router-dom';
import accountIcon from '../../../images/account.svg'

export default function NavigationAccount() {
  return (
    <ul className='navigation'>
      <li className='navigation__link'>
        <Link to='/movies' className='navigation__movies'>
          Фильмы
        </Link>
      </li>
      <li className='navigation__link'>
        <Link to='/saved-movies' className='navigation__saved-movies'>
          Сохраненные фильмы
        </Link>
      </li>
      <li className='navigation__link navigation__profile-box'>
        <Link to='/profile' className='navigation__profile'>
          Аккаунт
        </Link>
        <div className='navigation__icon-box'>
          <img className='navigation__icon' alt='Аккаунт' src={accountIcon}/>
        </div>
      </li>
    </ul>
  )
}
