import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, login }) {
  return (
    <header className={login ? ('header header_black') : ('header')}>
      <Link to='/'>
        <img className='logo' src={logo} alt='Логотип'/>
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}
