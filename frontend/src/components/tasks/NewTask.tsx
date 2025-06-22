import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  CREATE_NEW_TASK_ENDPOINT,
  DELETE_TASK_ENDPOINT,
  FETCH_TASKS_ENDPOINT,
} from "../../constants/EndpointsConstant";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
  expected_completion_date?: string | null;
  created_at?: string | null;
  completed_at?: string | null;
}
const NewTask = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const completed = false;
  const [expected_completion_date, setExpectedCompletionDate] =
    useState<Dayjs | null>(null);
  const populateTasks = (task: TaskData) => {
    if (!tasks) {
      setTasks([task]);
    } else {
      setTasks((prev) => [...(prev || []), task]);
    }
  };

  const handleAddTask = async (task: TaskData) => {
    const response = await fetch(CREATE_NEW_TASK_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      console.error("Failed to create task");
      return;
    }
    populateTasks(task);
  };
  const handleDeleteTask = async (taskId: string) => {
    const response = await fetch(`${DELETE_TASK_ENDPOINT}/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete task");
      return;
    }
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(FETCH_TASKS_ENDPOINT);
      if (!response.ok) {
        console.error("Failed to fetch tasks");
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("Invalid data format received");
      }
    };
    fetchTasks();
  }, [tasks]);

  return (
    <Container>
      <Box>
        <Box sx={{ paddingBottom: "10px", alignItems: "center" }}>
          <Box sx={{ paddingBottom: "10px", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                color: "primary.contrastText",
                backgroundColor: "primary.light",
              }}
            >
              Create a New Task
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Title"
            placeholder="Title"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            placeholder="Description"
            multiline
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Expected Completion Date"
              value={expected_completion_date}
              onChange={(newValue) => setExpectedCompletionDate(newValue)}
              slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
            />
          </LocalizationProvider>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                if (title.trim() === "") return;
                const newTask = {
                  title,
                  description,
                  completed,
                  expected_completion_date: expected_completion_date
                    ? expected_completion_date.toISOString()
                    : null,
                  completed_at: null,
                };
                handleAddTask(newTask);
                setTitle("");
                setDescription("");
                setExpectedCompletionDate(null);
              }}
            >
              Add Task
            </Button>
          </Box>
        </Box>
        <Box>
          {tasks.length === 0 ? (
            <Typography sx={{ mt: 2 }}>No tasks yet. Add one above!</Typography>
          ) : (
            <List>
              {tasks.map((task, index) => (
                <ListItem key={index}>
                  <ListItemText primary={task.title} />
                  <IconButton onClick={() => handleDeleteTask(task.id || "")}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default NewTask;
