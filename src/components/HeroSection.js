import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container app-element'>
      <h1>MLomda</h1>
      <h3>Machine Learning Made Simple</h3>
      <p>
        It allows people with and without knowledge in computer science to learn and understand how Machine Learning works by using 3D animation and simple explanations.
      </p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          START LEARNING
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
