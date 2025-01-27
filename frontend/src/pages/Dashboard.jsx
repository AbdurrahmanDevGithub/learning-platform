import Navbar from "../components/Navbar";
import { Box, Button, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import BGImage from "../assets/smoke-376543.jpg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Animated Text Component
const AnimatedText = () => {
  const text = "Empower Your Learning with AI";

  const textVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div variants={textVariant} initial="hidden" animate="visible">
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          mb: 5,
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          letterSpacing: "0.5rem",
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariant}>
            {char}
          </motion.span>
        ))}
      </Typography>
    </motion.div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${BGImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            padding: "160px 20px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <AnimatedText />
            {/* <Typography variant="h6" sx={{ maxWidth: "700px", mb: 5, paddingLeft: "140px" }}>
              Discover tailored courses, expert mentors, and cutting-edge resources to accelerate your career.
            </Typography> */}
          </motion.div>
        </Box>

        {/* Features Section */}
        <Box sx={{ padding: "1px 160px 100px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                      Personalized Learning
                    </Typography>
                    <Typography>
                      Get course recommendations based on your learning preferences and goals.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                      Expert Mentors
                    </Typography>
                    <Typography>
                      Learn from industry leaders and professionals with years of experience.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                      AI-Powered Insights
                    </Typography>
                    <Typography>
                      Track your progress and receive insights to optimize your learning journey.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>

          {/* Additional Section */}
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "80px 80px",
              borderRadius: 4,
              mt: 6,
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "white" }}>
                Ready to Transform Your Career?
              </Typography>
              <Typography
                sx={{
                  maxWidth: "700px",
                  margin: "0 auto",
                  mb: 4,
                  color: "white",
                }}
              >
                Join our platform today and unlock access to top-tier courses, expert
                mentors, and personalized AI-driven learning experiences.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0202a1",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#0202a1",
                  },
                }}
                onClick={() => navigate("/allcourses")}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </Box>
        <Footer />
      </div>
    </>
  );
}
