import React from 'react';
import './Promo.css';
import globe from '../../../images/text-globe.svg';

export default function Promo() {
  return (
    <section className='promo'>
      <img className='promo__image' src={globe} alt='Глобус'/>
      <h1 className='promo__title'>Учебный проект студента факультета <span className='promo__course'>Веб-разработки.</span></h1>
      <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <a href='#about' className='promo__button'>Узнать больше</a>
    </section>
  )
}
