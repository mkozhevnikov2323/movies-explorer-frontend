import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import FormAuth from '../FormAuth/FormAuth';

export default function Register({ onRegister, messageAuth, isAuthSuccess }) {

  return (
    <div className='register'>
      <div className='register__content'>
        <Link to='/' className='register__logo-link'>
          <img alt='Логотип' className='register__logo' src={logo}/>
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <FormAuth typeAuth='register' onRegister={onRegister} messageAuth={messageAuth} isAuthSuccess={isAuthSuccess}/>
        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link to="/signin" className="register__subtitle_enter">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
