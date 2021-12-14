import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Functionalities from '../Functionalities';

function Home() {
  return (
    <>
      <HeroSection />
      <Functionalities />
      <Cards />
    </>
  );
}

export default Home;