import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: !validateEmail(formData.email),
      password: formData.password.length < 6,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      // Handle successful login logic here
      console.log("Login successful:", formData);
      navigate("/"); // Example redirect
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        height: "100vh",
        left: 0,
        top: 0,
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login to your account
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mb={3}
        >
          Continue Your Journey to Productivity
        </Typography>

        <form onSubmit={handleOnSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email ? "Please enter a valid email" : ""}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={
                errors.password ? "Password must be at least 6 characters" : ""
              }
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mb: 2 }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link href="/register" underline="hover">
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
