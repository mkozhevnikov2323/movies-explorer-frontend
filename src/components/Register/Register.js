import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';
import FormAuth from '../FormAuth/FormAuth';

export default function Register() {
  return (
    <div className='register'>
      <div className='register__content'>
        <img alt='Логотип' className='register__logo' src={logo}/>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <FormAuth typeAuth='register'/>
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
