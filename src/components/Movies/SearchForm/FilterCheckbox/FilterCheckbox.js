import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ setCheckboxFilter, checkboxFilter, handleChangeCheckboxFilter }) {
  const { pathname } = useLocation();

  const onChangeTumbler = () => {
    setCheckboxFilter(!checkboxFilter);
    pathname !== "/saved-movies" && handleChangeCheckboxFilter();
  };

  const localStorageToggle = localStorage.getItem("checkboxFilter");

  useEffect(() => {
    pathname !== "/saved-movies" && setCheckboxFilter(localStorageToggle === "true");
  }, []);

  return (
    <div className="filterCheckbox">
      <input
        type="checkbox"
        value={checkboxFilter}
        onChange={onChangeTumbler}
        checked={checkboxFilter}
        id="switcher"
        className="filterCheckbox__input"
      />
      <label className="filterCheckbox__switcher" htmlFor="switcher"></label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </div>
  );
}
