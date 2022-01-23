import * as React from 'react';
import Container from '@mui/material/Container';
import Navbar from 'components/Navbar.js';
import Footer from 'components/Footer.js';
import { Box } from '@mui/material';

export default function AlgorithmsDashboard(props) {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {/* stepper at top */}
        {props.stepper}

        {/* actual content */}
        <Box sx={{ width: '100%' }}>
          <React.Fragment>
            <Container maxWidth="md">
              {props.component}
            </Container>
          </React.Fragment>
        </Box>      
      </Container>
      <Footer />
    </div>
  );
}
