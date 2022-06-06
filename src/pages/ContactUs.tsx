import React from 'react';
// import Functionalities from 'components/FunctionalitiesSection';
// import HeroSection from 'components/HeroSection';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { Typography, Container } from '@mui/material';
// import PrettyLine from 'components/PrettyLine';

function ContactUs() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Typography>
                    <br />
                    Who are we?<br />
                    <br />
                    {tab}We are thechnion students making this website as a part of a yearly project.<br />
                    {tab}Our names are: Andrew, Aseel, David, Eden and Ofik.<br />
                    <br />
                    <br />
                    What is this website?<br />
                    <br />
                    {tab}This website is made to help primarily high school students in understanding and visulaizing algorithms in machine learning.<br />
                    <br />
                    <br />
                    How can I report bugs or suggest features?<br />
                    <br />
                    {tab}You can do so by sending us an email at:<br />
                    {tab}mlomda@protonmail.com
                    <br />
                </Typography>
            </Container>
            {/* <HeroSection /> */}
            {/* <PrettyLine /> */}
            {/* <Functionalities /> */}
            {/* <PrettyLine /> */}
            <Footer />
        </>
    );
}

export default ContactUs;