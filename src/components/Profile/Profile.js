import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export default function Profile({ loggedIn, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
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
                className="profile__input"
                defaultValue={currentUser.name}
                disabled={!editMode}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                type="text"
                className="profile__input"
                defaultValue={currentUser.email}
                disabled={!editMode}
              />
            </label>
            {editMode ? (
              <button type='button' className="profile__edit-btn">Сохранить</button>
            ) : (
              <button type='button' className="profile__edit-btn">Редактировать</button>
            )}
          </form>
          <Link to="/signin" className="profile__logout-btn" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </>
  );
}
