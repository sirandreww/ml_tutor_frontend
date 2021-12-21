import React from 'react';
import Functionalities from './utils/Functionalities.js';
import HeroSection from './utils/HeroSection.js';
import Algorithms from './utils/Algorithms.js';

function Home() {
  return (
    <>
      <HeroSection />
      <Functionalities />
      <Algorithms />
    </>
  );
}

export default Home;