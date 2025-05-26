import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
        backdropFilter: 'blur(5px)',
        position: 'relative',
        zIndex: 10,
        py: 8,
        mt: 31,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',

      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
         
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.745)" gutterBottom>
              EduLearn
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.745)">
              Empowering learners worldwide with personalized courses and tools for growth. Join us to explore your potential!
            </Typography>
          </Grid>

          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.745)" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/mycourses" color="rgba(255, 255, 255, 0.745)" underline="hover">
                Favorite
              </Link>
              <Link href="/courses" color="rgba(255, 255, 255, 0.745)" underline="hover">
                Courses
              </Link>
              <Link href="/viewbook" color="rgba(255, 255, 255, 0.745)" underline="hover">
                Get Books
              </Link>
              <Link href="/contact" color="rgba(255, 255, 255, 0.745)" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>

         
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.745)" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.745)">
              Email: mafas7647@gmail.com
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.745)">
              Phone: +94 76 1 200 230
            </Typography>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.745)">
              Address: Kurunegala, Sri Lanka
            </Typography>
          </Grid>
        </Grid>


        <Box
          mt={4}
          pt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid rgba(0, 0, 0, 0.1)"
        >
          <Typography variant="body2" color="rgba(255, 255, 255, 0.745)">
            &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
          </Typography>
          <Box>
            <IconButton href="https://web.facebook.com/mhdmafas.mhdmafas.3/" color="white">
              <Facebook />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/m-mafas/" color="white">
              <LinkedIn />
            </IconButton>
            <IconButton href="https://www.instagram.com/mafas_official_11/" color="white">
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
