import React,{ useState } from 'react';
import './FormAuth.css';

export default function FormAuth({ typeAuth, onRegister, onLogin, messageAuth, loggedIn }) {
  const [values, setValues] = useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <form className='form' onSubmit={
      typeAuth === 'register' ? (
        handleSubmitRegister
      ) : (
        handleSubmitLogin
      )
    }>
      {
        typeAuth === 'register' && (
          <label className='form__label'>
            Имя
            <input className='form__input' type='text' name='name' required onChange={handleChange}/>
          </label>
        )
      }
      <label className='form__label'>
        E-mail
        <input className='form__input' type='email' name='email' required onChange={handleChange}/>
      </label>
      <label className='form__label'>
        Пароль
        <input className='form__input' type='password' name='password' required onChange={handleChange}/>
      </label>
      <span className="form__error">{loggedIn ? '' : messageAuth}</span>
      {
        typeAuth === 'register' && (
          <button type='submit' className="form__button">
            Зарегистрироваться
          </button>
        )
      }
      {
        typeAuth === 'login' && (
          <button type='submit' className="form__button">
            Войти
          </button>
        )
      }
    </form>
  )
}
