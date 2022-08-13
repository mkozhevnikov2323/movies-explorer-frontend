import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__plans'>
        <div className='about-project__plan-title'>Дипломный проект включал 5 этапов</div>
        <div className='about-project__plan-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
        <div className='about-project__plan-title'>На выполнение диплома ушло 5 недель</div>
        <div className='about-project__plan-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
      </div>
      <div className='about-project__chart'>
        <div className='about-project__chart-title about-project__chart-title_color_green'>1 неделя</div>
        <div className='about-project__chart-description'>Back-end</div>
        <div className='about-project__chart-title about-project__chart-title_color_grey'>4 недели</div>
        <div className='about-project__chart-description'>Front-end</div>
      </div>
    </section>
  )
}
