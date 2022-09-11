import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {
  CHANGE_AUTH_PROCESS_MESSAGE,
  CHANGE_AUTH_SUCCESS_MESSAGE,
  ERROR_CONFLICT_MESSAGE
} from "../../utils/consatnts";

export default function Profile({ loggedIn, onSignOut, onUpdateUser, messageAuth }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (editMode && name === currentUser.name) {
      setMessage(CHANGE_AUTH_PROCESS_MESSAGE);
      setIsValid(false)
    }
    if (editMode && name !== currentUser.name) {
      setMessage("");
      setIsValid(true)
    }
  }, [currentUser.name, editMode, name]);

  useEffect(() => {
    setMessage("");
    if (messageAuth === ERROR_CONFLICT_MESSAGE) {
      setMessage(ERROR_CONFLICT_MESSAGE);
      setEmail(currentUser.email);
      setIsValid(false)
    }
    if (messageAuth === CHANGE_AUTH_SUCCESS_MESSAGE) {
      setMessage(CHANGE_AUTH_SUCCESS_MESSAGE);
      setIsValid(true)
    }
    if (editMode && email === currentUser.email) {
      setMessage(CHANGE_AUTH_PROCESS_MESSAGE);
      setIsValid(false)
    }
    if (editMode && email !== currentUser.email) {
      setMessage("");
      setIsValid(true)
    }
  }, [currentUser.email, editMode, email, messageAuth]);

  function updateSaveMessage() {
    if (messageAuth === "") {
      setTimeout(() => {
        // setMessage(CHANGE_AUTH_SUCCESS_MESSAGE);
      }, 1000);
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

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



  return (
    <>
      <Header loggedIn={loggedIn} login={true} />
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
                minLength={2}
                maxLength={30}
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
                pattern="^[^ ]+@[^ ]+\.[a-z]{2,3}$"
                defaultValue={currentUser.email}
                value={email}
                disabled={!editMode}
                onChange={handleEmailChange}
              />
            </label>
            <span
              className={"profile__message"}
            >
              {message}
            </span>
            {editMode ? (
              <button
                type="submit"
                disabled={!isValid}
                className="profile__edit-btn"
                onClick={updateSaveMessage}
              >
                Сохранить
              </button>
            ) : (
              <button type="submit" className="profile__edit-btn">
                Редактировать
              </button>
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
