import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Stack } from '@mui/material';
import Cards from 'components/Cards.js';

export default function Algorithms() {
  return (
    <Box
      sx={{
        backgroundColor: "#FBFBFB",
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
          fontFamily={"Playfair Display"}
        >
          How to Get started?
        </Typography>
        <Typography variant="h5" fontFamily={"Dosis"} align="center" color="#79B4B7" paragraph>
          Simply choose one of the following algorithms and start learning!
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
  );
}