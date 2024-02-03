import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [feedback_info, setFeedback_info] = useState({
    session: "",
    semester: "",
    course: "",
  });
  const handleChange = (event) => {
    if (event.target.name === "session") {
      setFeedback_info({ ...feedback_info, session: event.target.value });
    } else if (event.target.name === "semester") {
      setFeedback_info({ ...feedback_info, semester: event.target.value });
    } else if (event.target.name === "course") {
      setFeedback_info({ ...feedback_info, course: event.target.value });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}>
      <Typography variant="h3">FeedbackX</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 120,
        }}>
        <FormControl fullWidth>
          <InputLabel>Session</InputLabel>
          <Select name="session" label="Session" value={feedback_info.session} onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 120,
        }}>
        <FormControl>
          <InputLabel>Semester</InputLabel>
          <Select label="Semester" name="semester" value={feedback_info.semester} label="hge" onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 120,
          color: "black",
          textEmphasisColor: "black",
        }}>
        <FormControl>
          <InputLabel>Course</InputLabel>
          <Select
            name="course"
            value={feedback_info.course}
            label="Course"
            placeholder="Course"
            onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextareaAutosize placeholder="Enter your review" minRows={5} />
      </Box>
      <Box>
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  );
}

export default App;
