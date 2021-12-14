import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../MlLogo.png'
import {Button} from './Button';
import './Navbar.css';
import '../App.css'


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };

    useEffect(() => {
      showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
      <>
        <nav className="navbar app-element">
          <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    MLomda
                    {/*Image for the logo in navbar */} 
                    <img src={logo} alt="Logo" width="40" height="40"/>
                </Link> 
                <div className='menu-icon' onClick={handleClick}>
                    {/*icons on clicking the menu*/} 
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  {/*Add components to the list by adding li header */}
                  <li className='nav-item'>
                    <Link to='/' 
                          className='nav-links'
                          onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/service'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                      Service
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <ScrollLink
                      to='cards_id'
                      className='nav-links'
                      onClick={closeMobileMenu}
                      spy={true} 
                      smooth={true}
                    >
                      Algorithms
                    </ScrollLink>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/sign-in'
                      className='nav-links'
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/sign-up'
                      className='nav-links-mobile'
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Link>
                  </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          </div>
        </nav>
      </>
  );   
}

export default Navbar;

