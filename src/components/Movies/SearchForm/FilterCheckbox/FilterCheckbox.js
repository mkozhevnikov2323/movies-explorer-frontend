import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ setToggle, toggle, onChangeToggle }) {
  const { pathname } = useLocation();

  const onChangeTumbler = () => {
    setToggle(!toggle);
    pathname !== "/saved-movies" && onChangeToggle();
  };

  const localStorageToggle = localStorage.getItem("toggle");

  useEffect(() => {
    pathname !== "/saved-movies" && setToggle(localStorageToggle === "true");
  }, []);

  return (
    <div className="filterCheckbox">
      <input
        type="checkbox"
        value={toggle}
        onChange={onChangeTumbler}
        checked={toggle}
        id="switcher"
        className="filterCheckbox__input"
      />
      <label className="filterCheckbox__switcher" htmlFor="switcher"></label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </div>
  );
}
