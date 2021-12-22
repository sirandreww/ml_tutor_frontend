import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container, Stack } from '@mui/material';
import backgroundImage from 'assets/images/home_img_2.png';

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: `url(${backgroundImage})`,
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
          color="white"
          gutterBottom
        >
          MLomda
        </Typography>
        <Typography variant="h5" align="center" color="#79B4B7" paragraph>
          Understand how Machine Learning works by using 3D animation and simple explanations.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" color="success">Sign up</Button>
          <Button variant="outlined">sign in</Button>
        </Stack>
      </Container>
    </Box>
  );
}