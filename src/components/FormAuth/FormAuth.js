import React, { useState, useEffect } from "react";
import "./FormAuth.css";

export default function FormAuth({
  typeAuth,
  onRegister,
  onLogin,
  messageAuth,
  loggedIn,
}) {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [messageError, setMessageError] = useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    setMessageError((prev) => ({
      ...prev,
      [name]: e.target.validationMessage,
    }));
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  useEffect(() => {
    if (
      typeAuth === "register" &&
      (messageError.name !== "" ||
        messageError.email !== "" ||
        messageError.password !== "")
    ) {
      setIsValid(false);
    } else if (
      typeAuth === "login" &&
      (messageError.email !== "" || messageError.password !== "")
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [messageError, typeAuth]);

  return (
    <form
      className="form"
      onSubmit={
        typeAuth === "register" ? handleSubmitRegister : handleSubmitLogin
      }
    >
      {typeAuth === "register" && (
        <>
          <label className="form__label">
            Имя
            <input
              className="form__input"
              type="text"
              name="name"
              required
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              minLength={2}
              maxLength={30}
              onChange={handleChange}
            />
          </label>
          <span className="form__error">
            {loggedIn ? "" : messageError.name}
          </span>
        </>
      )}
      <label className="form__label">
        E-mail
        <input
          className="form__input"
          type="email"
          name="email"
          required
          pattern="^[^ ]+@[^ ]+\.[a-z]{2,3}$"
          onChange={handleChange}
        />
      </label>
      <span className="form__error">{loggedIn ? "" : messageError.email}</span>
      <label className="form__label">
        Пароль
        <input
          className="form__input"
          type="password"
          name="password"
          required
          minLength={8}
          onChange={handleChange}
        />
      </label>
      <span className="form__error">
        {loggedIn ? "" : messageError.password}
      </span>
      <span className="form__error">{loggedIn ? "" : messageAuth}</span>
      {typeAuth === "register" && (
        <button
          type="submit"
          className={
            isValid ? `form__button` : `form__button form__button_disabled`
          }
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      )}
      {typeAuth === "login" && (
        <button
          type="submit"
          className={
            isValid ? `form__button` : `form__button form__button_disabled`
          }
          disabled={!isValid}
        >
          Войти
        </button>
      )}
    </form>
  );
}
