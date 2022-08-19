import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <section className='searchForm'>
      <form className='searchForm__form'>
        <input type='text' className='searchForm__input' placeholder='Фильм' required />
        <button className='searchForm__button'>Поиск</button>
      </form>
      <FilterCheckbox />
    </section>
  )
}
