import React from 'react';
import { Container, Box, LinearProgress  } from '@mui/material';


function LoadingScreen() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ minHeight: 300, }}></Box>
            <LinearProgress color="success" maxWidth="300px"/>
            {/* <Box sx={{ minHeight: 300, }}></Box> */}
        </Container>
    );
}

export default LoadingScreen;