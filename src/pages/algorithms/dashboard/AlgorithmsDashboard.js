import * as React from 'react';
import Container from '@mui/material/Container';
import Navbar from 'components/Navbar.js';
import Footer from 'components/Footer.js';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function AlgorithmsDashboard(props) {
  const [t] = useTranslation(['translation']);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {/* stepper at top */}
        {props.stepper}

        {/* actual content */}
        <Box sx={{ width: '100%' }}>
          <Container maxWidth="md">
            <Box height={50} />
            {props.component}
            <Box height={50} />
          </Container>
        </Box>

        {/* slide managing code */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Link to={props.previous} style={{ textDecoration: 'none', color: "black" }}>
            <Button
              color="inherit"
              disabled={props.isPreviousDisabled}
              sx={{ mr: 1 }}
            >
              {t("back")}
            </Button>
          </Link>
          <Box sx={{ flex: '1 1 auto' }} />
          <Link to={props.next} style={{ textDecoration: 'none', color: "black" }}>
            <Button >
              {props.isNextDisabled ? t("finish") : t("next")}
            </Button>
          </Link>
        </Box>
        <Box height={50} />

      </Container>
      <Footer />
    </div>
  );
}
