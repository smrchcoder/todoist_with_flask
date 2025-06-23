import { Box, Paper } from "@mui/material";
// import Task from "../components/tasks/Task";
import NewTask from "../components/tasks/NewTask";

const Home = () => {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.secondary.main",
        }}
      >
        {/* <Task /> */}
        <NewTask />
      </Box>
    </Paper>
  );
};

export default Home;
