import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

export default function Movies({ loggedIn }) {
  return (
    <>
      <Header login={true} loggedIn={loggedIn}/>
      <main className='movies'>
        <SearchForm />
        <MoviesCardList savedMovie={false}/>
        <section className='movies__more'>
          <button type='button' className='movies__more-btn'>Ещё</button>
        </section>
      </main>
      <Footer />
    </>
  )
}
