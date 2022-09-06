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
import { URL_MOVIES_DOMAIN } from '../../utils/consatnts';

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
      setTextErrorForSearch("Поле пустое");
      setShowPreloader(false);
    }
    getMoviesFromBeat()
      .then((res) => {
        const moviesAfterFilter = res.filter(({ nameRU }) =>
          nameRU.toLowerCase().includes(dataFromSearchForm.toLowerCase())
        );
        if (!moviesAfterFilter.length) {
          setErrorMessage("Ничего не найдено");
        }
        const moviesWithShort = moviesAfterFilter.filter(
          ({ duration }) => duration <= 40
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
        const newsavedMovied = await getMovies();
        setSavedMovies(newsavedMovied);
        setServerErrorMessage("");
      } catch (err) {
        console.log("Ошибка добавления фильма", err);
        setServerErrorMessage("Ошибка добавления выбраного фильма");
      }
    } else {
      try {
        await deleteMovie(movie._id);
        const savedMovies = await getMovies();
        setSavedMovies(savedMovies);
        setServerErrorMessage("");
      } catch (err) {
        console.log("Ошибка удаления фильма", err);
        setServerErrorMessage("Ошибка удаления фильма");
      }
    }
  }

  // Достаем сохранненые фильмы + сохраняем фильмы с локальное хранилище
  useEffect(() => {
    getMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setServerErrorMessage("");
      })
      .catch((err) => {
        console.log("Error", err);
        setServerErrorMessage("Ошибка получения сохранненых фильмов");
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
          <div className="movies__card-text">Ничего не найдено</div>
        )}
        {serverErrorMessage && (
          <div className="movies__card-text">{serverErrorMessage}</div>
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