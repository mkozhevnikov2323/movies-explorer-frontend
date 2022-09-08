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
import { REG_SUCCESS_MESSAGE, ERROR_CONFLICT_MESSAGE, ERROR_CONFLICT_STATUS, ERROR_VALIDATION_STATUS, ERROR_VALIDATION_MESSAGE, ERROR_SERVER_MESSAGE, AUTH_SUCCESS_MESSAGE } from '../../utils/consatnts';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [messageAuth, setMessageAuth] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

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
        setMessageAuth(REG_SUCCESS_MESSAGE);
      })
      .then(() => {
        handleLogin(regData.email, regData.password);
      })
      .catch((err) => {
        console.log(err);
        if (err === ERROR_CONFLICT_STATUS) {
          setMessageAuth(ERROR_CONFLICT_MESSAGE);
        }
        else if (err === ERROR_VALIDATION_STATUS) {
          setMessageAuth(ERROR_VALIDATION_MESSAGE);
        }
        else {
          setMessageAuth(ERROR_SERVER_MESSAGE);
        }
      });
  }

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setMessageAuth(AUTH_SUCCESS_MESSAGE);
          setLoggedIn(true)
        }
      })
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setMessageAuth(ERROR_VALIDATION_MESSAGE)
      });
  }

  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('dataFromSearchForm');
    localStorage.removeItem('checkboxFilter');
    localStorage.removeItem('movies');
    localStorage.removeItem('userId');
    setLoggedIn(false);
    setMessageAuth('');
    setLoggedIn(false);
    navigate('/');
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            localStorage.setItem("userId", res._id)
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

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              loggedIn ? (
                <Movies loggedIn={loggedIn}/>
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
