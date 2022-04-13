import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { Calculator } from '../calculator/Calculator';
import BackgroundImage from '../static/pizza.webp';

export function Margherita() {
  return (
    <Box sx={styles.bodyProxy}>
      <Container sx={styles.container} maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          <Typography variant="h1">margherita</Typography>
          <Calculator />
        </Stack>
      </Container>
    </Box>
  );
}

const styles = {
  bodyProxy: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    marginTop: 1,
    marginBottom: 1,
  },
};
