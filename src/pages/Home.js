import React from 'react';
import Cards from 'components/Cards';
import HeroSection from 'components/HeroSection';
import Functionalities from 'components/Functionalities';

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