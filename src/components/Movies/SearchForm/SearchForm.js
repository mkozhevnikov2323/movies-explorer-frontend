import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  onSearchFilms,
  errorText,
  handleChangeTumbler,
  toggle,
  setToggle,
  onChangeToggle,
}) {
  const [searchInput, setSearchInput] = useState("");
  const { pathname } = useLocation();

  const searchFilms = (e) => {
    e.preventDefault();
    onSearchFilms(searchInput);
  };

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    pathname !== "/saved-movies" &&
      setSearchInput(localStorage.getItem("input"));
  }, []);

  return (
    <section className="searchForm">
      <form className="searchForm__form" noValidate onSubmit={searchFilms}>
        <input
          type="text"
          name="text"
          className="searchForm__input"
          placeholder="Фильм"
          required
          value={searchInput}
          onChange={onChange}
        />
        <button type="submit" className="searchForm__button">
          Поиск
        </button>
      </form>
      <FilterCheckbox
        toggle={toggle}
        setToggle={setToggle}
        value={toggle}
        handleChangeTumbler={handleChangeTumbler}
        onChangeToggle={onChangeToggle}
      />
      {errorText && <span className="search-form-error">{errorText}</span>}
    </section>
  );
}
