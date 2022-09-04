import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { deleteMovie, getMovies } from "../../utils/MainApi";

export default function SavedMovies({ loggedIn }) {
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [films, setFilms] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [filmsShort, setFilmsShort] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  useEffect(() => {
    const getMoviesSave = async () => {
      setPreloader(true);
      try {
        const data = await getMovies();
        setAllFilms(data);
        setFilmsShowed(data);
        setFilmsShort(data.filter(({ duration }) => duration <= 40));
        setServerErrorMessage("");
      } catch (err) {
        console.log("Error", err);
        setServerErrorMessage("Ошибка получения сохраненных фильмов!");
      } finally {
        setPreloader(false);
      }
    };
    getMoviesSave();
  }, []);

  const handleSearchFilms = (input) => {
    const filterData = allFilms.filter(({ nameRU }) =>
      nameRU.toLowerCase().includes(input.toLowerCase())
    );
    const shortFilterData = filterData.filter(({ duration }) => duration <= 40);
    filterData.length <= 0
      ? setErrorMessage("Ничего не найдено")
      : setErrorMessage("");
    if (!input) {
      setErrorText("Поле пустое");
      setPreloader(false);
    } else {
      setErrorText("");
    }
    setFilmsShowed(filterData);
    setFilmsShort(shortFilterData);
  };

  async function handleAddFilm(film, favorite) {
    if (!favorite) {
      try {
        await deleteMovie(film._id);
        const newFilms = await getMovies();
        setFilmsShowed(newFilms);
        setFilms(newFilms);
        setServerErrorMessage("");
      } catch (err) {
        setServerErrorMessage("Ошибка удаления фильма!");
        console.log(`Ошибка удаления фильма`, err);
      }
    }
  }
  return (
    <>
      <Header login={true} loggedIn={loggedIn} />
      <main className="savedMovies">
        <SearchForm
          onSearchFilms={handleSearchFilms}
          toggle={toggle}
          setToggle={setToggle}
          errorText={errorText}
        />
        {preloader && <Preloader />}
        {errorMessage && (
          <div className="movies__card-text">Ничего не найдено</div>
        )}
        {serverErrorMessage && (
          <div className="movies__card-text">{serverErrorMessage}</div>
        )}
        {!preloader && !errorText && (
          <MoviesCardList
            films={allFilms}
            filmsShowed={filmsShowed}
            filmsRemain={films}
            filmsSaved={allFilms}
            handleAddFilm={handleAddFilm}
            filmsShort={filmsShort}
            toggle={toggle}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
