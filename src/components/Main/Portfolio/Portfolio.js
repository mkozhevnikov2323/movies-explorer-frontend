import React from 'react';
import './Portfolio.css';
import link from '../../../images/arrow-link.svg';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://mkozhevnikov2323.github.io/how-to-learn/index.html"
            target='_blank'
            rel="noreferrer"
          >
            Статичный сайт
            <img className="portfolio__image-link" alt="Стрелка" src={link} />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://mkozhevnikov2323.github.io/russian-travel/index.html"
            target='_blank'
            rel="noreferrer"
          >
            Адаптивный сайт
            <img className="portfolio__image-link" alt="Стрелка" src={link} />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://mkozhevnikov2323.github.io/react-mesto-auth/index.html"
            target='_blank'
            rel="noreferrer"
          >
            Одностраничное приложение
            <img className="portfolio__image-link" alt="Стрелка" src={link} />
          </a>
        </li>
      </ul>
    </section>
  );
}
