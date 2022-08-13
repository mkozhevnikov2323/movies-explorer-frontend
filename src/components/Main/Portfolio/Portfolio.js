import React from 'react';
import './Portfolio.css';
import link from '../../../images/arrow-link.svg';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <p className="portfolio__example">
            Статичный сайт
            <a
              className="portfolio__link"
              href="https://mkozhevnikov2323.github.io/how-to-learn/index.html"
              target='_blank'
              rel="noreferrer"
            >
              <img className="portfolio__image-link" alt="Стрелка" src={link} />
            </a>
          </p>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__example">
            Адаптивный сайт
            <a
              className="portfolio__link"
              href="https://mkozhevnikov2323.github.io/russian-travel/index.html"
              target='_blank'
              rel="noreferrer"
            >
              <img className="portfolio__image-link" alt="Стрелка" src={link} />
            </a>
          </p>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__example">
            Одностраничное приложение
            <a
              className="portfolio__link"
              href="https://mkozhevnikov2323.github.io/react-mesto-auth/index.html"
              target='_blank'
              rel="noreferrer"
            >
              <img className="portfolio__image-link" alt="Стрелка" src={link} />
            </a>
          </p>
        </li>
      </ul>
    </section>
  );
}
