import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(formData.email),
      password: formData.password.length < 6,
    };
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    } else {
      // Handle successful login logic here
      console.log("Login successful:", formData);
      // Redirect or perform other actions after successful login
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        left: 0,
        top: 0,
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        justifyContent: "center",
        backgroundColor: "background.default",
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
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login to your account already!!!
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mb={3}
        >
          Continue Your Journey to Productivity
        </Typography>
        <form>
          <FormControl fullWidth>
            <TextField
              value={formData.email}
              type="email"
              onChange={handleChange}
              label="Email"
              fullWidth
              helperText={errors.email ? "Please enter the vaild email" : ""}
            />
            <TextField
              value={formData.password}
              type="password"
              onChange={handleChange}
              label="password"
              fullWidth
              helperText={errors.email ? "Please enter a valid password" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 2 }}
              onClick={handleOnSubmit}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Box>
  );
};
export default Login;
