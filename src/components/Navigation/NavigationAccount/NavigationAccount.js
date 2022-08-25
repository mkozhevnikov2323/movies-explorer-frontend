import React, { useState } from 'react';
import './NavigationAccount.css';
import { Link } from 'react-router-dom';
import accountIcon from '../../../images/account.svg';
import NavigationMobile from '../NavigationMobile/NavigationMobile';

export default function NavigationAccount() {
  const [isNavigationMobileOpen, setIsNavigationMobileOpen] = useState(false);

  const openNavigationMobile = () => {
    setIsNavigationMobileOpen(true);
  }

  const closeNavigationMobile = () => {
    setIsNavigationMobileOpen(false);
  }

  return (
    <>
      <ul className='navigation navigation_type_account'>
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
      <button type='button' className='burger-menu' onClick={openNavigationMobile}></button>
      <NavigationMobile isOpen={isNavigationMobileOpen} onCloseMenu={closeNavigationMobile}/>
    </>
  )
}
