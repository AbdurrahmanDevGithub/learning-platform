import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { TextField, Box, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import BGImage from '../assets/smoke-376543.jpg';
import Footer from '../components/Footer';

const ViewBooks = () => {
  const [data, setData] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    try {
      const response = await axios(`https://openlibrary.org/search.json?title=${encodeURIComponent(data)}`);
      setResponseData(response.data.docs);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  const handleViewMore = (bookKey) => {
    const url = `https://openlibrary.org${bookKey}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${BGImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
        }}
      >
        <Box sx={{ padding: '160px', display: 'flex', justifyContent: 'center', color: "white" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '600px' }}
          >
            <TextField
              label="Search for Books"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: 'white',
                    borderWidth: '2px',
                    fontWeight: 'bold',
                  },
                  "&:hover fieldset": {
                    borderColor: '#0202a1',
                    fontWeight: 'bold',
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: '#0202a1',
                    fontWeight: 'bold',
                  },
                  "& input": {
                    color: 'white',
                  }
                },
                "& .MuiInputLabel-root": {
                  color: 'white',
                  fontWeight: 'bold',
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: '#0202a1',
                  fontWeight: 'bold',
                },
              }}
              value={data}
              onChange={handleChange}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                marginLeft: '10px',
                background: "linear-gradient(135deg, white, #a69090)",
                color: "navy",
                fontWeight: 'bold',
                '&:hover': {
                  background: "linear-gradient(135deg, navy, #0505f1)",
                  color: "white",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                  fontWeight: 'bold',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Search"}
            </Button>
          </motion.div>
        </Box>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '40px',
            marginTop: '-70px',
            padding: '2rem 12rem'
          }}
        >
          {responseData.map((book) => (
            <div
              key={book.key}
              style={{
                width: '200px',
                background: ' rgba(255, 255, 255, 0.3)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '250px',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>
                Author: {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
              </p>
              <p>First Published: {book.first_publish_year || 'Unknown Year'}</p>
              {/* <p>Language: {book.language ? book.language.join(', ') : 'Unknown Language'}</p> */}
              <Button
                onClick={() => handleViewMore(book.key)}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, white, #a69090)",
                  color: "navy",
                  fontWeight: 'bold',
                  padding: "0.2rem",
                  marginTop: "15px",
                  '&:hover': {
                    background: "linear-gradient(135deg, navy, #0505f1)",
                    color: "white",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                View More About
              </Button>
            </div>
          ))}
        </div>
        <Footer />
      </div >

    </>
  );
};

export default ViewBooks;
