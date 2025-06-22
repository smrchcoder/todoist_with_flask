import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  mb: theme.spacing(2),
}));
