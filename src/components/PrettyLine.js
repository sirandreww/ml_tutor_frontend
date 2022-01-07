import React from 'react';
import { Container, Divider, Box } from '@mui/material'


function PrettyLine() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ minHeight: 50, }}></Box>
            <Divider />
            <Box sx={{ minHeight: 50, }}></Box>
        </Container>
    );
}

export default PrettyLine;