import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";
import { SAVED_MOVIES_PATH } from "../../../../utils/consatnts";

export default function FilterCheckbox({ setCheckboxFilter, checkboxFilter, handleChangeCheckboxFilter }) {
  const { pathname } = useLocation();

  const onChangeTumbler = () => {
    setCheckboxFilter(!checkboxFilter);
    pathname !== SAVED_MOVIES_PATH && handleChangeCheckboxFilter();
  };

  const localCheckboxData = localStorage.getItem("checkboxFilter");

  useEffect(() => {
    pathname !== SAVED_MOVIES_PATH && setCheckboxFilter(localCheckboxData === "true");
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
