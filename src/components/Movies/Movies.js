import React, { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { getMoviesFromBeat } from '../../utils/movieApi';
import { getMovies, createMovie, deleteMovie } from '../../utils/MainApi';
import { getQuantityOfMovieCard } from '../../utils/functions';
import { URL_MOVIES_DOMAIN, NOT_FOUND_SEARCH_MESSAGE, SHORT_MOVIE_DURATION, ERROR_SEARCH_EMPTY_MESSAGE, ERROR_SAVE_MOVIES, ERROR_DELETE_MOVIES, ERROR_GET_MOVIES, ERROR_SERVER_MESSAGE } from '../../utils/consatnts';

export default function Movies({ loggedIn }) {
  const [movies, setMovies] = useState([]);
  const [quantityOfMovieCard, setQuantityOfMovieCard] = useState([]);
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [textErrorForSearch, setTextErrorForSearch] = useState("");
  const [showPreloader, setShowPreloader] = useState(false);
  const [checkboxFilter, setCheckboxFilter] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesShort, setMoviesShort] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [wasSearch, setWasSearch] = useState(false);

  useEffect(() => {
    setQuantityOfMovieCard(getQuantityOfMovieCard());
    const resizeWidth = () => setQuantityOfMovieCard(getQuantityOfMovieCard());
    window.addEventListener("resize", resizeWidth);
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  function handleSearchOfMovies(dataFromSearchForm) {
    setShowPreloader(true);
    setWasSearch(false);
    if (!dataFromSearchForm) {
      setTextErrorForSearch(ERROR_SEARCH_EMPTY_MESSAGE);
      setShowPreloader(false);
    } else {
      setTextErrorForSearch("");
    }
    getMoviesFromBeat()
      .then((res) => {
        const moviesAfterFilter = res.filter(({ nameRU }) =>
          nameRU.toLowerCase().includes(dataFromSearchForm.toLowerCase())
        );
        if (!moviesAfterFilter.length) {
          setErrorMessage(NOT_FOUND_SEARCH_MESSAGE);
        } else {
          setErrorMessage("");
        }
        const moviesWithShort = moviesAfterFilter.filter(
          ({ duration }) => duration <= SHORT_MOVIE_DURATION
        );
        setMovies(moviesAfterFilter);
        localStorage.setItem("movies", JSON.stringify(moviesAfterFilter));
        localStorage.setItem("checkboxFilter", checkboxFilter);
        localStorage.setItem("dataFromSearchForm", dataFromSearchForm);
        setMoviesShowed(moviesAfterFilter.splice(0, quantityOfMovieCard[0]));
        setMoviesShort([...moviesWithShort].splice(0, quantityOfMovieCard[0]));
        setServerErrorMessage('')
        setWasSearch(true);
      })
      .catch((err) => {
        setServerErrorMessage(ERROR_SERVER_MESSAGE);
        setShowPreloader(false);
        console.log(ERROR_SERVER_MESSAGE, err);
      })
  }

  const handleChangeCheckboxFilter = () => {
    localStorage.setItem("checkboxFilter", !checkboxFilter);
  };

  const handleShowMore = () => {
    const moviesMore = moviesShowed.concat(movies.splice(0, quantityOfMovieCard[1]));
    setMoviesShowed(moviesMore);
  };

  async function handleAddMovieToSaved(movie, isLiked) {
    if (isLiked) {
      const movieInfo = {
        country: movie.country || "Неизвестно",
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: URL_MOVIES_DOMAIN + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: URL_MOVIES_DOMAIN + movie.image.url,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || "Неизвестно" || null,
      };
      try {
        await createMovie(movieInfo);
        const newSavedMovie = await getMovies();
        setSavedMovies(newSavedMovie);
        setServerErrorMessage("");
      } catch (err) {
        console.log(ERROR_SAVE_MOVIES, err);
        setServerErrorMessage(ERROR_SAVE_MOVIES);
      }
    } else {
      try {
        await deleteMovie(movie._id);
        const savedMovies = await getMovies();
        setSavedMovies(savedMovies);
        setServerErrorMessage("");
      } catch (err) {
        console.log(ERROR_DELETE_MOVIES, err);
      }
    }
  }

  useEffect(() => {
    getMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setServerErrorMessage("");
      })
      .catch((err) => {
        console.log("Error", err);
        setServerErrorMessage(ERROR_GET_MOVIES);
      });

    const localMovies = localStorage.getItem("movies");

    if (localMovies) {
      const filterData = JSON.parse(localMovies);
      setMovies(filterData);
      setMoviesShort(filterData.filter(({ duration }) => duration <= 40));
      setMoviesShowed(filterData.splice(0, getQuantityOfMovieCard()[0]));
      setShowPreloader(false);
    }
  }, [wasSearch]);

  return (
    <>
      <Header login={true} loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          handleChangeCheckboxFilter={handleChangeCheckboxFilter}
          setCheckboxFilter={setCheckboxFilter}
          checkboxFilter={checkboxFilter}
          errorText={textErrorForSearch}
          handleSearchOfMovies={handleSearchOfMovies}
        />
        {showPreloader && <Preloader />}
        {errorMessage && (
          <div className="movies__error-message">{NOT_FOUND_SEARCH_MESSAGE}</div>
        )}
        {serverErrorMessage && (
          <div className="movies__error-message">{serverErrorMessage}</div>
        )}
        {!showPreloader && !textErrorForSearch && (
          <MoviesCardList
            handleAddMovieToSaved={handleAddMovieToSaved}
            onShowMore={handleShowMore}
            movies={movies}
            savedMovies={savedMovies}
            moviesShowed={moviesShowed}
            checkboxFilter={checkboxFilter}
            moviesShort={moviesShort}
          />
        )}
      </main>
      <Footer />
    </>
  );
}