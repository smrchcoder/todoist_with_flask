import { Toolbar, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { StyledAppBar } from "./NavbarStyles";

const Navbar = () => {
  const navbarElements = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        {navbarElements.map((element) => (
          <Button
            key={element.name}
            color="inherit"
            component={NavLink}
            to={element.path}
            sx={{
              "&.active": { borderBottom: "2px solid white" },
              "&:hover": { color: "black", textDecoration: "underline" },
              mx: 1,
            }}
            // end={element.path === "/"}
          >
            {element.name}
          </Button>
        ))}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
