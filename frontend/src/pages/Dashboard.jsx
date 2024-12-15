import Navbar from "../components/Navbar";
import { TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return (
    <Typography sx={{backgroundColor:'aliceblue'}}>
      <Navbar />
      <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "600px" }}
        />
      </Box>
    </Typography>
  );
}
