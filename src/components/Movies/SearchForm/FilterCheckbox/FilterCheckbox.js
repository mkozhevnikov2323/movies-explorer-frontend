import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className='filterCheckbox__label'>
      <input type='checkbox' value='short' className='filterCheckbox__swither' />
      Короткометражки
    </label>
  )
}
