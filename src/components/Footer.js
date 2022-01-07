import React from 'react';
import { Box, Typography } from '@mui/material'
import { Copyright } from '@mui/icons-material';


function Footer() {
    return (
        <Box sx={{ bgcolor: '#333333', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom color="white">
                MLomda
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="white"
                component="p"
            >
                Made by Technion Students!
            </Typography>
            <Copyright />
        </Box>
    );
}

export default Footer;