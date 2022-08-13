import React from 'react';
import './AboutMe.css';
import studentPhoto from '../../../images/student.jpg';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <img alt='Фото' src={studentPhoto} className='about-me__photo'/>
      <h3 className='about-me__subtitle'>Максим</h3>
      <h4 className='about-me__description'>Фронтенд-разработчик, 35 лет</h4>
      <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
      <a href='https://github.com/mkozhevnikov2323' target='_blank' rel="noreferrer" className='about-me__link'>Github</a>
    </section>
  )
}
