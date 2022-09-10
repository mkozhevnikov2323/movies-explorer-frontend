import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { getMoviesFromBeat } from "../../utils/movieApi";
import { getMovies, createMovie, deleteMovie } from "../../utils/MainApi";
import { getQuantityOfMovieCard, filterMovies } from "../../utils/functions";
import {
  URL_MOVIES_DOMAIN,
  NOT_FOUND_SEARCH_MESSAGE,
  ERROR_SEARCH_EMPTY_MESSAGE,
  ERROR_SAVE_MOVIES,
  ERROR_DELETE_MOVIES,
  ERROR_SERVER_MESSAGE,
} from "../../utils/consatnts";

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
  const [wasRender, setWasRender] = useState(false);

  useEffect(() => {
    setQuantityOfMovieCard(getQuantityOfMovieCard());
    const resizeWidth = () => setQuantityOfMovieCard(getQuantityOfMovieCard());
    window.addEventListener("resize", resizeWidth);
    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  function handleSearchAllMovies(dataFromSearchForm) {
    setShowPreloader(true);
    setErrorMessage("");
    if (!dataFromSearchForm) {
      setTextErrorForSearch(ERROR_SEARCH_EMPTY_MESSAGE);
      setShowPreloader(false);
    } else {
      setTextErrorForSearch("");
    }
    const allMoviesLocal = localStorage.getItem("movies");
    if (!allMoviesLocal) {
      getMoviesFromBeat()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          setServerErrorMessage("");
          renderMovies();
        })
        .catch((err) => {
          setServerErrorMessage(ERROR_SERVER_MESSAGE);
          setShowPreloader(false);
          console.log(ERROR_SERVER_MESSAGE, err);
        });
    }
    localStorage.setItem("checkboxFilter", checkboxFilter);
    localStorage.setItem("dataFromSearchForm", dataFromSearchForm);
    renderMovies();
  }

  useEffect(() => {
    renderMovies();
  }, [wasRender, checkboxFilter, savedMovies]);

  function renderMovies() {
    const checkboxFilter = localStorage.getItem("checkboxFilter");
    const dataFromSearchForm = localStorage.getItem("dataFromSearchForm");
    const moviesAfterFilter = filterMovies();
    setMovies(moviesAfterFilter);
    if (moviesAfterFilter?.length === 0 && dataFromSearchForm !== "null") {
      setErrorMessage(NOT_FOUND_SEARCH_MESSAGE);
    } else if (
      moviesAfterFilter?.length === 0 &&
      (dataFromSearchForm === "null" || dataFromSearchForm === "")
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("");
    }

    if (checkboxFilter === "true") {
      setMoviesShort(moviesAfterFilter?.splice(0, quantityOfMovieCard[0]));
    } else {
      setMoviesShowed(moviesAfterFilter?.splice(0, quantityOfMovieCard[0]));
    }
    setShowPreloader(false);
    setWasRender(true);
  }

  const handleChangeCheckboxFilter = () => {
    localStorage.setItem("checkboxFilter", !checkboxFilter);
  };

  const handleShowMore = () => {
    const moviesMore = moviesShowed.concat(
      movies.splice(0, quantityOfMovieCard[1])
    );
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
        const sawedMoviesOnlyThisUser = newSavedMovie.filter((movie) => {
          return movie.owner === localStorage.getItem("userId");
        });
        setSavedMovies(sawedMoviesOnlyThisUser);
        setServerErrorMessage("");
      } catch (err) {
        console.log(ERROR_SAVE_MOVIES, err);
        setServerErrorMessage(ERROR_SAVE_MOVIES);
      }
    } else {
      try {
        await deleteMovie(movie._id);
        const newSavedMovie = await getMovies();
        const sawedMoviesOnlyThisUser = newSavedMovie.filter((movie) => {
          return movie.owner === localStorage.getItem("userId");
        });
        setSavedMovies(sawedMoviesOnlyThisUser);
        setServerErrorMessage("");
      } catch (err) {
        console.log(ERROR_DELETE_MOVIES, err);
      }
    }
  }

  useEffect(() => {
    const getMoviesSave = async () => {
      setShowPreloader(true);
      try {
        const userId = localStorage.getItem("userId");
        const data = await getMovies();
        const userMovies = data.filter(({ owner }) => owner === userId);
        setSavedMovies(userMovies);
        setServerErrorMessage("");
      } catch (err) {
      } finally {
        setShowPreloader(false);
      }
    };
    getMoviesSave();
  }, []);

  return (
    <>
      <Header login={true} loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          handleChangeCheckboxFilter={handleChangeCheckboxFilter}
          setCheckboxFilter={setCheckboxFilter}
          checkboxFilter={checkboxFilter}
          errorText={textErrorForSearch}
          handleSearchOfMovies={handleSearchAllMovies}
        />
        {showPreloader && <Preloader />}
        {errorMessage && (
          <div className="movies__error-message">
            {NOT_FOUND_SEARCH_MESSAGE}
          </div>
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
