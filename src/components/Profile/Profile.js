import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';

export default function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setCurrentUserData({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  const [editMode, setEditMode] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({ name: '', email: '' });

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  return (
    <>
      <Header login={true}/>
      <div className="profile">
        <div className="profile__content">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form className="profile__form" onSubmit={handleEdit}>
            <label className="profile__label">
              Имя
              <input
                type="text"
                className="profile__input"
                defaultValue={currentUserData.name}
                disabled={!editMode}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                type="text"
                className="profile__input"
                defaultValue={currentUserData.email}
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
