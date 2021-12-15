


import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../MlLogo.png'
import {Button} from './Button';
import './Footer.css';
import '../App.css'


function Footer() {
    // const [click, setClick] = useState(false);
    // const [button, setButton] = useState(true);

    // const handleClick = () => setClick(!click);
    // const closeMobileMenu = () => setClick(false);

    // const showButton = () => {
    // if (window.innerWidth <= 960) {
    //     setButton(false);
    // } else {
    //     setButton(true);
    // }
    // };

    // useEffect(() => {
    // showButton();
    // }, []);

    // window.addEventListener('resize', showButton);

    return (
        <>
            <footer className="footer">
                <div className="footer_div">
                    <div className="footer_top">
                        <div className="footer_logo">
                            <a href="/" class="router-link-exact-active router-link-active b-sprite-landing-brilliant-logo-white">
                                MLTutor
                            </a>
                        </div>
                        <div class="footer_ul_team">
                        <h4>Team</h4>
                        <ul class="unstyled">
                            <li>
                                <a href="/about/">About Us</a>
                            </li>
                            <li><a href="/principles/">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="link-list product">
                        <h4>Product</h4>
                        <ul class="unstyled">
                            <li><a href="/courses/">Algorithms</a></li>
                        </ul> 
                    </div>
                </div>
                <div class="bottom">
                    <ul class="unstyled info-links">
                        <li><a href="/help/">Help</a></li>
                        <li><a href="/terms-of-use/" rel="nofollow">Terms of Service</a></li>
                        <li><a href="/privacy/" rel="nofollow">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
        </>
    );   
}

export default Footer;