import { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Task = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        placeholder="Add a task"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            const value = (e.target as HTMLInputElement).value;
            if (value && value.trim()) {
              const newTask = value.trim();
              if (!tasks.includes(newTask)) {
                setTasks((prev) => [...prev, newTask]);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }
        }}
      />
      {tasks.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No tasks yet. Add one above!</Typography>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              <ListItemText primary={task} />
              <IconButton
                onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Task;
