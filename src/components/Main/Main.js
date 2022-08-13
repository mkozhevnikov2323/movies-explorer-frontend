import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import './Main.css';

export default function Main() {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Footer />
    </>
  )
}
