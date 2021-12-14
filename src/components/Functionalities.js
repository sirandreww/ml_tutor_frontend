import React from 'react';
import '../App.css';
import './Functionalities.css';
import HisI from '../images/historyIcon.jpg'
import GrI from '../images/graphIcon.png'
import SBSI from '../images/StepByStepIcon.jpg'
import LI from '../images/LenseIcon.png'
import FunI from '../images/MachineLearning.png'

function Functionalities() {
  return (
    <div className='functionalities-container app-element'>
      <h1>Functionalities</h1>
      <p>
          MLomda lets students learn about machine learning and deep algorithms in easy, interactive and visual way.
          It also lets the teachers to achive their maximum potential by providing helping features and easy tools for teaching their pupils. 
      </p>
      <div className='functionalities-content'>
            <ul className='functionalities-list'>
                <li className='functionalities-item'>
                    <img src={GrI} />
                    <h3>2D/3D visual representation</h3>
                </li>
                <li className='functionalities-item'>
                    <img src={SBSI} />
                    <h3>Step by Step demonstrations</h3>
                </li>
                <li className='functionalities-item'>
                    <img src={HisI} />
                    <h3>History of achievements</h3>
                </li>
                
                <li className='functionalities-item'>
                    <img src={LI} />
                    <h3>Easy to understand explanations and examples</h3>
                </li>
            </ul>
            <div className='functionalities-img'>
                <img src={FunI} />
            </div>
      </div>
    </div>
  );
}

export default Functionalities;