import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { deleteMovie, getMovies } from "../../utils/MainApi";

export default function SavedMovies({ loggedIn }) {
  const [showPreloader, setShowPreloader] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [checkboxFilter, setCheckboxFilter] = useState(false);
  const [moviesShort, setMoviesShort] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  useEffect(() => {
    const getMoviesSave = async () => {
      setShowPreloader(true);
      try {
        const data = await getMovies();
        setAllMovies(data);
        setMoviesShowed(data);
        setMoviesShort(data.filter(({ duration }) => duration <= 40));
        setServerErrorMessage("");
      } catch (err) {
        console.log("Error", err);
        setServerErrorMessage("Ошибка получения сохраненных фильмов!");
      } finally {
        setShowPreloader(false);
      }
    };
    getMoviesSave();
  }, []);

  const handleSearchOfMovies = (dataFromSearchForm) => {
    const filterData = allMovies.filter(({ nameRU }) =>
      nameRU.toLowerCase().includes(dataFromSearchForm.toLowerCase())
    );
    const shortFilterData = filterData.filter(({ duration }) => duration <= 40);
    filterData.length <= 0
      ? setErrorMessage("Ничего не найдено")
      : setErrorMessage("");
    if (!dataFromSearchForm) {
      setErrorText("Поле пустое");
      setShowPreloader(false);
    } else {
      setErrorText("");
    }
    setMoviesShowed(filterData);
    setMoviesShort(shortFilterData);
  };

  async function handleAddMovieToSaved(movie, isLiked) {
    if (!isLiked) {
      try {
        await deleteMovie(movie._id);
        const newMovies = await getMovies();
        setMoviesShowed(newMovies);
        setMovies(newMovies);
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
          handleSearchOfMovies={handleSearchOfMovies}
          checkboxFilter={checkboxFilter}
          setCheckboxFilter={setCheckboxFilter}
          errorText={errorText}
        />
        {showPreloader && <Preloader />}
        {errorMessage && (
          <div className="movies__card-text">Ничего не найдено</div>
        )}
        {serverErrorMessage && (
          <div className="movies__card-text">{serverErrorMessage}</div>
        )}
        {!showPreloader && !errorText && (
          <MoviesCardList
            movies={allMovies}
            moviesShowed={moviesShowed}
            moviesRemain={movies}
            savedMovies={allMovies}
            handleAddMovieToSaved={handleAddMovieToSaved}
            moviesShort={moviesShort}
            checkboxFilter={checkboxFilter}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
