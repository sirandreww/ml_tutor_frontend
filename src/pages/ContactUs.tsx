import React from 'react';
// import Functionalities from 'components/FunctionalitiesSection';
// import HeroSection from 'components/HeroSection';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { Typography, Container } from '@mui/material';
import {useTranslation} from "react-i18next";
// import PrettyLine from 'components/PrettyLine';

function ContactUs() {
    const tab = <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    const [t] = useTranslation('translation');
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Typography>
                    <br />
                    {t("contact_us_page.intro")}<br />
                    <br />
                    {tab}{t("contact_us_page.first_row")}<br />
                    {tab}{t("contact_us_page.second_row")}<br />
                    <br />
                    <br />
                    {t("contact_us_page.third_row")}<br />
                    <br />
                    {tab}{t("contact_us_page.fourth_row")}<br />
                    <br />
                    <br />
                    {t("contact_us_page.fifth_row")}<br />
                    <br />
                    {tab}{t("contact_us_page.sixth_row")}<br />
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