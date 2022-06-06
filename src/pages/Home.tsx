import React from 'react';
import Functionalities from 'components/FunctionalitiesSection';
import HeroSection from 'components/HeroSection';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import PrettyLine from 'components/PrettyLine';

function Home() {
  return (
    <>
      <Navbar
        appBarParameters={{ position: "fixed" }}
        scrollToColorParameters={{ transparentBackgroundColor: "transparent", nonTransparentBoxShadow: ""}}
      />
      <HeroSection />
      <PrettyLine />
      <Functionalities />
      {/* <PrettyLine /> */}
      <Footer />
    </>
  );
}

export default Home;