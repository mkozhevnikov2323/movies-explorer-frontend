import React from 'react';
import './Promo.css';
import globe from '../../../images/text-globe.svg';

export default function Promo() {
  return (
    <section className='promo'>
      <img className='promo__image' src={globe} alt='Глобус'/>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <button className='promo__button'>Узнать больше</button>
    </section>
  )
}
