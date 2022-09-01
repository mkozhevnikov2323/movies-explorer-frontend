import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

export default function SavedMovies({ loggedIn }) {
  return (
    <>
      <Header login={true} loggedIn={loggedIn}/>
      <main className='savedMovies'>
        <SearchForm />
        <MoviesCardList savedMovie={true}/>
      </main>
      <Footer />
    </>
  )
}
