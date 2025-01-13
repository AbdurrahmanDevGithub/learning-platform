import Navbar from "../components/Navbar";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/recommend?title=${search}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(#87CEFA, #B0C4DE)', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "600px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch} variant="contained" sx={{ marginLeft: "10px" }}>
          Search
        </Button>
      </Box>
      <Box sx={{ padding: "20px" }}>
        {recommendations.length > 0 && (
          <Typography variant="h6">Recommendations:</Typography>
        )}
        {recommendations.map((rec, index) => (
          <Typography key={index} variant="body1">{rec}</Typography>
        ))}
      </Box>
    </div>
  );
}
