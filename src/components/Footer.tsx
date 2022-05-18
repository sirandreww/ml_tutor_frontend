import React from 'react';
import { Box, Typography } from '@mui/material'
import { Copyright } from '@mui/icons-material';
import PrettyLine from 'components/PrettyLine';


function Footer() {
    return (
        <>
            <PrettyLine />
            <Box sx={{ bgcolor: 'white', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom color="black">
                    MLomda
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="black"
                    component="p"
                >
                    Made by Technion Students!
                </Typography>
                <Copyright />
            </Box>
        </>
    );
}

export default Footer;