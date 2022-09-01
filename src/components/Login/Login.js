import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import FormAuth from '../FormAuth/FormAuth';
import logo from '../../images/logo.svg';

export default function Login({ onLogin, messageAuth, loggedIn }) {
  return (
    <div className='register'>
      <div className='register__content'>
        <Link to='/' className='register__logo-link'>
          <img alt='Логотип' className='register__logo' src={logo}/>
        </Link>
        <h2 className='register__title'>Рады видеть!</h2>
        <FormAuth typeAuth='login' onLogin={onLogin} messageAuth={messageAuth} loggedIn={loggedIn}/>
        <p className="register__subtitle">
          Ещё не зарегистрированы?
          <Link to="/signup" className="register__subtitle_enter">
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  )
}
