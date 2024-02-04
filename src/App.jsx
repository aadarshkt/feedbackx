import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [feedback_info, setFeedback_info] = useState({
    session: "",
    semester: "",
    course: "",
    feedback: "",
  });
  const handleChange = (event) => {
    if (event.target.name === "session") {
      setFeedback_info({ ...feedback_info, session: event.target.value });
    } else if (event.target.name === "semester") {
      setFeedback_info({ ...feedback_info, semester: event.target.value });
    } else if (event.target.name === "course") {
      setFeedback_info({ ...feedback_info, course: event.target.value });
    } else if (event.target.name === "feedback") {
      setFeedback_info({ ...feedback_info, feedback: event.target.value });
    }
  };

  const handleSubmit = () => {
    console.log(feedback_info);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography variant="h3">FeedbackX</Typography>
        <Typography variant="h6">Account</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          margin: 2,
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 120,
            width: "25%",
            marginRight: 3,
          }}>
          <FormControl fullWidth>
            <InputLabel>Session</InputLabel>
            <Select name="session" label="Session" value={feedback_info.session} onChange={handleChange}>
              <MenuItem value={`2023-24`}>2023-24</MenuItem>
              <MenuItem value={`2022-23`}>2022-23</MenuItem>
              <MenuItem value={`2021-22`}>2021-22</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 120,
            width: "25%",
            marginRight: 3,
          }}>
          <FormControl>
            <InputLabel>Semester</InputLabel>
            <Select label="Semester" name="semester" value={feedback_info.semester} onChange={handleChange}>
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
            justifyContent: "center",
            width: "25%",
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: 3,
          }}>
          <TextField
            name="feedback"
            placeholder="Enter your review here"
            multiline
            rows={10}
            label="Review"
            onChange={handleChange}
            sx={{
              minWidth: 120,
              width: "40%",
            }}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
