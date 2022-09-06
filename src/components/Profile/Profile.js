import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { CHANGE_AUTH_PROCESS_MESSAGE, CHANGE_AUTH_SUCCESS_MESSAGE } from '../../utils/consatnts';

export default function Profile({ loggedIn, onSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (editMode && name === currentUser.name) {
      setMessage(CHANGE_AUTH_PROCESS_MESSAGE)
    } else if (editMode && name !== currentUser.name) {
      setMessage('')
    }
  }, [currentUser.name, editMode, name]);

  useEffect(() => {
    if (editMode && email === currentUser.email) {
      setMessage(CHANGE_AUTH_PROCESS_MESSAGE)
    } else if (editMode && email !== currentUser.email) {
      setMessage('')
    }
  }, [currentUser.email, editMode, email]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleEdit(e) {
    e.preventDefault();
    setEditMode(!editMode);
    if (editMode) {
      onUpdateUser({
        name: name,
        email: email,
    });
    }
  }

  function updateSaveMessage() {
    setMessage(CHANGE_AUTH_SUCCESS_MESSAGE);
    setTimeout(() => {
      setMessage('');
    }, 2000)
  }

  return (
    <>
      <Header loggedIn={loggedIn} login={true}/>
      <div className="profile">
        <div className="profile__content">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form className="profile__form" onSubmit={handleEdit}>
            <label className="profile__label">
              Имя
              <input
                type="text"
                name="name"
                className="profile__input"
                defaultValue={currentUser.name}
                disabled={!editMode}
                onChange={handleNameChange}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                type="text"
                name="email"
                className="profile__input"
                defaultValue={currentUser.email}
                disabled={!editMode}
                onChange={handleEmailChange}
              />
            </label>
            <span className={editMode ? ('profile__message') : ('profile__message profile__message_success')}>{ message }</span>
            {editMode ? (
              <button type='submit' disabled={name === currentUser.name} className="profile__edit-btn" onClick={updateSaveMessage}>Сохранить</button>
            ) : (
              <button type='submit' className="profile__edit-btn">Редактировать</button>
            )}
          </form>
          <Link to="/" className="profile__logout-btn" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </>
  );
}
