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

export default function Movies({ loggedIn }) {
  const [films, setFilms] = useState([]);
  const [quantityOfMovieCard, setQuantityOfMovieCard] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [textErrorForSearch, setTextErrorForSearch] = useState("");
  const [showPreloader, setShowPreloader] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [filmsSave, setFilmsSave] = useState([]);
  const [filmsShort, setFilmsShort] = useState([]);
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

  // Поиск фильмов
  function handleSearchFilms(dataFromSearchForm) {
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
        const shortFilterData = moviesAfterFilter.filter(
          ({ duration }) => duration <= 40
        );
        const shortFilterDataCopy = [...shortFilterData];
        setFilms(moviesAfterFilter);
        localStorage.setItem("films", JSON.stringify(moviesAfterFilter));
        localStorage.setItem("toggle", toggle);
        localStorage.setItem("dataFromSearchForm", dataFromSearchForm);
        setFilmsShowed(moviesAfterFilter.splice(0, quantityOfMovieCard[0]));
        setFilmsShort(shortFilterDataCopy.splice(0, quantityOfMovieCard[0]));
        setServerErrorMessage('')
        setWasSearch(true);
      })
  }

  const onChangeToggle = () => {
    localStorage.setItem("toggle", !toggle);
  };

  // На кнопку ещё показываем больше фильмов
  const handleShowMore = () => {
    const filmsMore = filmsShowed.concat(films.splice(0, quantityOfMovieCard[1]));
    setFilmsShowed(filmsMore);
  };

  // Функция добавления фильмов
  async function handleAddFilm(film, isLiked) {
    if (isLiked) {
      const infoFilm = {
        country: film.country || "Неизвестно",
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: "https://api.nomoreparties.co" + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: "https://api.nomoreparties.co" + film.image.url,
        movieId: film.id.toString(),
        nameRU: film.nameRU,
        nameEN: film.nameEN || "Неизвестно" || null,
      };
      try {
        await createMovie(infoFilm);
        const newFilmsSaved = await getMovies();
        setFilmsSave(newFilmsSaved);
        setServerErrorMessage("");
      } catch (err) {
        console.log("Ошибка добавления фильма", err);
        setServerErrorMessage("Ошибка добавления выбраного фильма");
      }
    } else {
      try {
        await deleteMovie(film._id);
        const newFilmsSaved = await getMovies();
        setFilmsSave(newFilmsSaved);
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
      .then((data) => {
        setFilmsSave(data);
        setServerErrorMessage("");
      })
      .catch((err) => {
        console.log("Error", err);
        setServerErrorMessage("Ошибка получения сохранненых фильмов");
      });

    const localStorageFilms = localStorage.getItem("films");

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setFilms(filterData);
      setFilmsShort(filterData.filter(({ duration }) => duration <= 40));
      setFilmsShowed(filterData.splice(0, getQuantityOfMovieCard()[0]));
      setShowPreloader(false);
    }
  }, [wasSearch]);

  return (
    <>
      <Header login={true} loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onChangeToggle={onChangeToggle}
          setToggle={setToggle}
          toggle={toggle}
          errorText={textErrorForSearch}
          onSearchFilms={handleSearchFilms}
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
            handleAddFilm={handleAddFilm}
            onShowMore={handleShowMore}
            films={films}
            filmsSaved={filmsSave}
            filmsShowed={filmsShowed}
            toggle={toggle}
            filmsShort={filmsShort}
          />
        )}
      </main>
      <Footer />
    </>
  );
}