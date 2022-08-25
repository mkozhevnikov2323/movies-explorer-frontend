import React from 'react';
import './FormAuth.css';

export default function FormAuth({ typeAuth }) {
  return (
    <form className='form'>
      {
        typeAuth === 'register' && (
          <label className='form__label'>
            Имя
            <input className='form__input' type='text' />
          </label>
        )
      }
      <label className='form__label'>
        E-mail
        <input className='form__input' type='email' />
      </label>
      <label className='form__label'>
        Пароль
        <input className='form__input' type='password' />
      </label>
      <span className="form__error">Что-то пошло не так...</span>
      {
        typeAuth === 'register' && (
          <button type='button' className="form__button">
            Зарегистрироваться
          </button>
        )
      }
      {
        typeAuth === 'login' && (
          <button type='button' className="form__button">
            Войти
          </button>
        )
      }
    </form>
  )
}
