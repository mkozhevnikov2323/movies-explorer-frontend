import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation'

export default function Header() {
  return (
    <header>
      <Link to='/'>
        <img className='logo' src={logo} alt='Логотип'/>
      </Link>
      <Navigation />
    </header>
  )
}
