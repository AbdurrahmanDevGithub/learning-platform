import Navbar from "../components/Navbar";
import { TextField, Box } from "@mui/material";


export default function Dashboard() {
  return (
    <div style={{ background: 'linear-gradient(#87CEFA, #B0C4DE)', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "600px" }}
        />
      </Box>
    </div>
  );
}
