import Navbar from "../components/Navbar";
import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import BGImage from '../assets/smoke-376543.jpg';
import Footer from "../components/Footer";

export default function Dashboard() {
  const [search, setSearch] = useState("");

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

        }}
      >

        <Box sx={{ padding: "160px", display: "flex", justifyContent: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", maxWidth: "600px" }}
          >
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    borderWidth: "2px",
                    fontWeight: "bold"
                  },
                  "&:hover fieldset": {
                    borderColor: "#0202a1",
                    fontWeight: "bold"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0202a1",
                    fontWeight: "bold"
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                  fontWeight: "bold"
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#0202a1",
                  fontWeight: "bold"
                },
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              // onClick={handleSearch}
              variant="contained"
              sx={{
                marginLeft: "10px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0202a1",
                  color: "white",
                  fontWeight: "bold"
                },
              }}
            >
              Search
            </Button>
          </motion.div>
        </Box>
        <Footer />
      </div>


    </>
  );
}
