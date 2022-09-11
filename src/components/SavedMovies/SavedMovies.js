import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { deleteMovie, getMovies } from "../../utils/MainApi";
import { SHORT_MOVIE_DURATION, ERROR_GET_MOVIES, NOT_FOUND_SEARCH_MESSAGE, ERROR_SEARCH_EMPTY_MESSAGE, ERROR_DELETE_MOVIES } from "../../utils/consatnts";

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
        const userId = localStorage.getItem("userId");
        const data = await getMovies();
        const userMovies = data.filter(({ owner }) => owner === userId);
        setAllMovies(userMovies);
        setMoviesShowed(userMovies);
        setMoviesShort(userMovies.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION));
        setServerErrorMessage("");
      } catch (err) {
        console.log(ERROR_GET_MOVIES, err);
        setServerErrorMessage(ERROR_GET_MOVIES);
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
    const shortFilterData = filterData.filter(({ duration }) => duration <= SHORT_MOVIE_DURATION);
    filterData.length <= 0
      ? setErrorMessage(NOT_FOUND_SEARCH_MESSAGE)
      : setErrorMessage("");
    if (!dataFromSearchForm) {
      setErrorText(ERROR_SEARCH_EMPTY_MESSAGE);
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
        const userId = localStorage.getItem("userId");
        await deleteMovie(movie._id);
        const newMovies = await getMovies();
        const userMovies = newMovies.filter(({ owner }) => owner === userId);
        setMoviesShowed(userMovies);
        setMovies(userMovies);
        setServerErrorMessage("");
      } catch (err) {
        setServerErrorMessage(ERROR_DELETE_MOVIES);
        console.log(ERROR_DELETE_MOVIES, err);
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
          <div className="movies__error-message">{NOT_FOUND_SEARCH_MESSAGE}</div>
        )}
        {serverErrorMessage && (
          <div className="movies__error-message">{serverErrorMessage}</div>
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
