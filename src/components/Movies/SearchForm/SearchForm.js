import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  handleSearchOfMovies,
  errorText,
  handleChangeTumbler,
  checkboxFilter,
  setCheckboxFilter,
  handleChangeCheckboxFilter,
}) {
  const [searchFormData, setSearchFormData] = useState("");
  const { pathname } = useLocation();

  const searchMovies = (e) => {
    e.preventDefault();
    handleSearchOfMovies(searchFormData);
  };

  const onChange = (e) => {
    setSearchFormData(e.target.value);
  };

  useEffect(() => {
    pathname !== "/saved-movies" &&
      setSearchFormData(localStorage.getItem("dataFromSearchForm"));
  }, []);

  return (
    <section className="searchForm">
      <form className="searchForm__form" noValidate onSubmit={searchMovies}>
        <input
          type="text"
          name="text"
          className="searchForm__input"
          placeholder="Фильм"
          required
          value={searchFormData}
          onChange={onChange}
        />
        <button type="submit" className="searchForm__button">
          Поиск
        </button>
      </form>
      <FilterCheckbox
        checkboxFilter={checkboxFilter}
        setCheckboxFilter={setCheckboxFilter}
        value={checkboxFilter}
        handleChangeTumbler={handleChangeTumbler}
        handleChangeCheckboxFilter={handleChangeCheckboxFilter}
      />
      {errorText && <span className="search-form-error">{errorText}</span>}
    </section>
  );
}
