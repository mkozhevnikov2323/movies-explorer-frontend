import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import * as auth from '../../utils/auth';
import * as api from '../../utils/MainApi';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [messageAuth, setMessageAuth] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  function handleRegistration(regData) {
    auth.register({
      name: regData.name,
      email: regData.email,
      password: regData.password
    })
      .then(() => {
        setMessageAuth('Вы успешно зарегистрировались.');
      })
      .then(() => {
        handleLogin(regData.email, regData.password);
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
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setMessageAuth('Вы успешно вошли.');
          setLoggedIn(true)
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

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setMessageAuth('');
    navigate('/');
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({
              name: res.name,
              email: res.email
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(userData) {
    api
      .updateUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClickSaveMovie = async (movie, status, id) => {
    if (status === 'delete') {
      onClickDeleteMovie(id);
      return;
    }
    const movieNew = {
      ...movie,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    };
    delete movieNew.id;
    delete movieNew.created_at;
    delete movieNew.updated_at;
    const response = await api.createMovie(movieNew);
    if (response._id) {
      setMoviesList((prev) => [...prev, response]);
    // } else if (response.message === BAD_REQUEST_STATUS) {
      // setMessageAcceptAuth(ERROR_MOVIES_VALID_DATA_MESSAGE);
      // setInfoTooltip(true);
    } else {
      // setMessageAcceptAuth(ERROR_SERVER_MESSAGE_SHORT);
      // setInfoTooltip(true);
    }
  }

  const onClickDeleteMovie = async (id) => {
    const response = await api.deleteMovie(id);
    console.log(response)
    // if (response.message === DELETE_MOVIE_MESSAGE) {
    //   moviesList((prev) => prev.filter((el) => el._id !== id));
    // } else {
    //   // setIsAccept(false);
    //   // setMessageAcceptAuth(ERROR_SERVER_MESSAGE_SHORT);
    // }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              loggedIn ? (
                <Movies loggedIn={loggedIn} onClickSaveMovie={onClickSaveMovie} moviesList={moviesList}/>
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/saved-movies"
            element={
              loggedIn ? (
                <SavedMovies loggedIn={loggedIn} />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              loggedIn ? (
                <Profile
                  loggedIn={loggedIn}
                  onSignOut={signOut}
                  onUpdateUser={handleUpdateUser}
                />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate replace to="/movies" />
              ) : (
                <Login
                  onLogin={handleLogin}
                  messageAuth={messageAuth}
                  loggedIn={loggedIn}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate replace to="/movies" />
              ) : (
                <Register
                  onRegister={handleRegistration}
                  messageAuth={messageAuth}
                  loggedIn={loggedIn}
                />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}
