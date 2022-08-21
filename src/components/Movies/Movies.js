import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <>
      <Header login={true}/>
      <main className='movies'>
        <SearchForm />
        <MoviesCardList />
        <section className='movies__more'>
          <button className='movies__more-btn'>Ещё</button>
        </section>
      </main>
      <Footer />
    </>
  )
}
