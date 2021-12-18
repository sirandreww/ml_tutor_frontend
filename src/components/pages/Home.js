import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Functionalities from '../Functionalities';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Functionalities />
      <Cards />
      <Footer/>
    </>
  );
}

export default Home;