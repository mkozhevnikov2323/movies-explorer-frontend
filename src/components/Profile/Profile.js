import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

export default function Profile() {
  const user = {
    name: 'Максим',
    email: 'test@test.ru'
  }

  const [editMode, setEditMode] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  return (
    <>
      <Header login={true}/>
      <div className="profile">
        <div className="profile__content">
          <h2 className="profile__title">Привет, {user.name}!</h2>
          <form className="profile__form" onSubmit={handleEdit}>
            <label className="profile__label">
              Имя
              <input
                type="text"
                className="profile__input"
                defaultValue={user.name}
                disabled={!editMode}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                type="text"
                className="profile__input"
                defaultValue={user.email}
                disabled={!editMode}
              />
            </label>
            {editMode ? (
              <button className="profile__edit-btn">Сохранить</button>
            ) : (
              <button className="profile__edit-btn">Редактировать</button>
            )}
          </form>
          <Link to="/signin" className="profile__logout-btn">
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </>
  );
}
