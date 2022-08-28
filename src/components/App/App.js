import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import * as auth from '../../utils/auth';

export default function App() {
  const navigate = useNavigate();
  const [messageAuth, setMessageAuth] = useState('');
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);

  function handleRegistration(regData) {
    setMessageAuth('');

    auth.register({
      name: regData.name,
      email: regData.email,
      password: regData.password
    })
      .then(() => {
        setIsAuthSuccess(true);
        setMessageAuth('Вы успешно зарегистрировались.')
      })
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 409') {
          setMessageAuth('Пользователь с данным E-mail присутствует в базе.');
        }
        else if (err === 'Ошибка: 400') {
          setMessageAuth('Ошибка валидации.');
        }
        else {
          setMessageAuth('Произошла ошибка на сервере.');
        }
      });
  }

  function handleLogin(email, password) {
    setMessageAuth('');

    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsAuthSuccess(true);
          setMessageAuth('Вы успешно вошли.')
          // setUserEmail(email);
          // setLoggedIn(true);
        }
      })
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setMessageAuth('Ошибка валидации.')
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/signin"
          element={
            <Login
              onLogin={handleLogin}
              messageAuth={messageAuth}
              isAuthSuccess={isAuthSuccess}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              onRegister={handleRegistration}
              messageAuth={messageAuth}
              isAuthSuccess={isAuthSuccess}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
