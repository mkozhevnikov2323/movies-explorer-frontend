import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationMobile.css';
import accountIcon from '../../../images/account.svg'

export default function NavigationMobile({ isOpen, onCloseMenu }) {
  return (
    <div className={isOpen ? ('navigationMobile') : ('navigationMobile_hidden')}>
      <div className='navigationMobile__close-icon-wrapper'>
        <button className='navigationMobile__close-icon' onClick={onCloseMenu}></button>
      </div>
      <ul className='navigationMobile__list'>
        <li>
          <Link to='/' className='navigationMobile__link'>
            Главная
          </Link>
        </li>
        <li>
          <Link to='/movies' className='navigationMobile__link'>
            Фильмы
          </Link>
        </li>
        <li>
          <Link to='/saved-movies' className='navigationMobile__link'>
            Сохраненные фильмы
          </Link>
        </li>
        <li className='navigationMobile__profile-box'>
          <Link to='/profile' className='navigationMobile__profile'>
            Аккаунт
          </Link>
          <div className='navigationMobile__icon-box'>
            <img className='navigationMobile__icon' alt='Аккаунт' src={accountIcon}/>
          </div>
        </li>
      </ul>
    </div>
  )
}
