import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

export default function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
