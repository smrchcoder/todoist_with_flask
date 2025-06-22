import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7", // Deep purple
      light: "#9a67ea", // Optional lighter shade
      dark: "#320b86", // Optional darker shade
    },
    secondary: {
      main: "#ff5722", // Complementary color (e.g., orange)
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Custom font (optional)
  },
});

export default theme;
