import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Stack } from '@mui/material';
import Cards from 'components/Cards';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {useTranslation} from "react-i18next";

export default function Algorithms() {
    const [t] = useTranslation('translation');
    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    backgroundColor: "white",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    pt: 20,
                    pb: 6,
                    minHeight: 400,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="black"
                        gutterBottom
                        fontFamily={"Arial"}
                    >
                        {t("algorithms.get_started")}
                    </Typography>
                    <Typography variant="h5" fontFamily={"Arial"} align="center" color="black" paragraph>
                        {t("algorithms.choose_alg")}
                    </Typography>
                </Container>
                <Stack
                    sx={{ pt: 4 }}
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                >
                    <Cards />
                </Stack>
            </Box>
            <Footer />
        </div>
    );
}