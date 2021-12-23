import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Stack, Fade } from '@mui/material';
import backgroundImage from 'assets/images/home_img_2.png';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        pt: 20,
        pb: 6,
        minHeight: 700,
      }}
    >
      <Container maxWidth="sm" >
        <Fade in={Boolean(true)} timeout={5000} >
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="white"
            fontFamily={"PT Sans"}
            gutterBottom
          >
            MLomda
          </Typography>
        </Fade>
        <Fade style={{ transitionDelay: '2000ms' }} in={Boolean(true)} timeout={5000}>
          <Typography variant="h4" align="center" color="#79B4B7" paragraph fontFamily={"PT Sans"}>
            Understand how Machine Learning works by using 3D animation and simple explanations.
          </Typography>
        </Fade>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" color="success">Sign up</Button>
          <Button variant="outlined" component={Link} to="/signin">sign in</Button>
        </Stack>
      </Container>
    </Box>
  );
}