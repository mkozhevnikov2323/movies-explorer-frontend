import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

export default function Register() {
  return (
    <div className='register'>
      <div className='register__content'>
        <img alt='Логотип' className='register__logo' src={logo}/>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='form'>
          <label className='form__label'>
            Имя
            <input className='form__input' type='text' />
          </label>
          <label className='form__label'>
            E-mail
            <input className='form__input' type='email' />
          </label>
          <label className='form__label'>
            Пароль
            <input className='form__input' type='password' />
          </label>
          <span className="form__error">Что-то пошло не так...</span>
          <button type="submit" className="form__button">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__subtitle">
          Уже зарегистрированы?
          <Link to="/login" className="register__subtitle_enter">
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}
