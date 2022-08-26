import React from 'react';
import './NavigationAuthorization.css';
import { Link } from 'react-router-dom';

export default function NavigationAuthorization() {
  return (
    <ul className='navigation'>
      <li className='navigation__link'>
         <Link to='/signup' className='navigation__signup'>
           Регистрация
         </Link>
       </li>
       <li className='navigation__link'>
         <Link to='/signin' className='navigation__signin'>
           Войти
         </Link>
       </li>
     </ul>
  )
}
