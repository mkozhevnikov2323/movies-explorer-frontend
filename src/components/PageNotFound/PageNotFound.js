import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className='page-not-found'>
      <h2 className='page-not-found__title'>404</h2>
      <p className='page-not-found__subtitle'>Страница не найдена</p>
      <button onClick={() => navigate(-1)} className='page-not-found__link'>Назад</button>
    </div>
  )
}
