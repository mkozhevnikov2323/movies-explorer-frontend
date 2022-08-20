import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const movies = [
  {
    image: 'https://ixbt.online/live/topics/preview/00/02/43/53/0e1be38918.jpg',
    duration: 107,
    nameRu: '33 слова о дизайне',
    save: true,
    _id: 1,
  },
  {
    image:
      'https://img.fredtvshow.com/img/movies/1473/watch-naomi-watts-jacob-tremblay-thrilling-first-trailer.jpg',
    duration: 63,
    nameRu: 'Киноальманах «100 лет дизайна»',
    save: false,
    _id: 2,
  },
  {
    image: 'https://aboutcinema.ru/wp-content/uploads/2022/02/1600422962528.jpg',
    duration: 102,
    nameRu: 'В погоне за Бенкси',
    save: false,
    _id: 3,
  },
  {
    image: 'https://ixbt.online/live/topics/preview/00/02/43/53/0e1be38918.jpg',
    duration: 107,
    nameRu: '33 слова о дизайне',
    save: true,
    _id: 4,
  },
  {
    image:
      'https://img.fredtvshow.com/img/movies/1473/watch-naomi-watts-jacob-tremblay-thrilling-first-trailer.jpg',
    duration: 63,
    nameRu: 'Киноальманах «100 лет дизайна»',
    save: false,
    _id: 5,
  },
  {
    image: 'https://aboutcinema.ru/wp-content/uploads/2022/02/1600422962528.jpg',
    duration: 102,
    nameRu: 'В погоне за Бенкси',
    save: false,
    _id: 6,
  },
  {
    image: 'https://ixbt.online/live/topics/preview/00/02/43/53/0e1be38918.jpg',
    duration: 107,
    nameRu: '33 слова о дизайне',
    save: true,
    _id: 7,
  },
  {
    image:
      'https://img.fredtvshow.com/img/movies/1473/watch-naomi-watts-jacob-tremblay-thrilling-first-trailer.jpg',
    duration: 63,
    nameRu: 'Киноальманах «100 лет дизайна»',
    save: false,
    _id: 8,
  },
  {
    image: 'https://aboutcinema.ru/wp-content/uploads/2022/02/1600422962528.jpg',
    duration: 102,
    nameRu: 'В погоне за Бенкси',
    save: false,
    _id: 9,
  },
  {
    image: 'https://ixbt.online/live/topics/preview/00/02/43/53/0e1be38918.jpg',
    duration: 107,
    nameRu: '33 слова о дизайне',
    save: true,
    _id: 10,
  },
  {
    image:
      'https://img.fredtvshow.com/img/movies/1473/watch-naomi-watts-jacob-tremblay-thrilling-first-trailer.jpg',
    duration: 63,
    nameRu: 'Киноальманах «100 лет дизайна»',
    save: false,
    _id: 11,
  },
  {
    image: 'https://aboutcinema.ru/wp-content/uploads/2022/02/1600422962528.jpg',
    duration: 102,
    nameRu: 'В погоне за Бенкси',
    save: false,
    _id: 12,
  },
];

export default function MoviesCardList() {
  return (
    <section className='moviesCardList'>
      {movies.map((movie) => <MoviesCard movie={movie} key={movie._id} />)}
    </section>
  )
}
