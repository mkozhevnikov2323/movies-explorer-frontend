import React from 'react';
import './AboutMe.css';
import studentPhoto from '../../../images/mkozhevnikov.jpg';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <img alt='Фото' src={studentPhoto} className='about-me__photo'/>
      <h3 className='about-me__subtitle'>Максим</h3>
      <h4 className='about-me__description'>Фронтенд-разработчик, 35 лет</h4>
      <p className='about-me__text'>Я родился и живу в Ижевске, закончил факультет менеджмента и маркетинга ИжГТУ. Люблю слушать музыку, а ещё увлекаюсь автопутешествиями. Недавно начал кодить. Работал в автобизнесе и банковском секторе с 2010 года. После того, как прошёл курс по веб-разработке, устроился в компанию IconiCompany.</p>
      <a href='https://github.com/mkozhevnikov2323' target='_blank' rel="noreferrer" className='about-me__link'>Github</a>
    </section>
  )
}
