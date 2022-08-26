import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className='filterCheckbox'>
      <input type='checkbox' value='short' id='switcher' className='filterCheckbox__input' />
      <label className='filterCheckbox__switcher' htmlFor='switcher'></label>
      <p className='filterCheckbox__text'>Короткометражки</p>
    </div>
  )
}
