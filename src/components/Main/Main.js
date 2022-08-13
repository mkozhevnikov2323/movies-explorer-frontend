import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';

export default function Main() {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  )
}
