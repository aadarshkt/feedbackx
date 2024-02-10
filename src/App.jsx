import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../api/baseURL";

function App() {
  const [feedback_info, setFeedback_info] = useState({
    session: "",
    semester: "",
    course: "",
    feedback: "",
  });
  const [studentDetails, setStudentDetails] = useState(null);
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

  useEffect(() => {
    const get_options = async () => {
      try {
        // const objectId = "65c06e46aabe7c4f41385938";
        const objectId = "65c0d495c8dfd1dd15a205bb";
        const url = `${baseURL}/api/students?objectId=${objectId}`;
        const result = await axios.get(url);
        const data = await result.data;
        setStudentDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    get_options();
  }, []);

  //update feedback
  const handleSubmit = async () => {
    const new_feedback_info = {
      roll_no: studentDetails.roll_no,
      session: feedback_info.session,
      semester: feedback_info.semester,
      course: feedback_info.course,
      feedback: feedback_info.feedback,
    };
    try {
      await axios.put(`${baseURL}/api/students`, new_feedback_info);
      setFeedback_info({
        session: "",
        semester: "",
        course: "",
        feedback: "",
      });
    } catch (error) {
      console.error(error);
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
              {studentDetails &&
                studentDetails?.sessions.map((session) => {
                  return <MenuItem key={`${session._id}`} value={`${session.name}`}>{`${session.name}`}</MenuItem>;
                })}
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
          <FormControl disabled={feedback_info.session === ""}>
            <InputLabel>Semester</InputLabel>
            <Select label="Semester" name="semester" value={feedback_info.semester} onChange={handleChange}>
              {studentDetails &&
                studentDetails?.sessions
                  ?.filter((session) => session.name === feedback_info.session)
                  .map((session) =>
                    session.semesters.map((semester) => {
                      return (
                        <MenuItem key={`${semester._id}`} value={`${semester.name}`}>{`${semester.name}`}</MenuItem>
                      );
                    })
                  )}
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
          <FormControl disabled={feedback_info.semester === ""}>
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={feedback_info.course}
              label="Course"
              placeholder="Course"
              onChange={handleChange}>
              {studentDetails &&
                studentDetails?.sessions
                  ?.filter((session) => session.name === feedback_info.session)
                  .map((session) =>
                    session.semesters
                      .filter((semester) => semester.name === feedback_info.semester)
                      .map((semester) => {
                        return semester.courses.map((course) => {
                          return <MenuItem key={`${course._id}`} value={`${course.name}`}>{`${course.name}`}</MenuItem>;
                        });
                      })
                  )}
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
            disabled={feedback_info.course === ""}
            name="feedback"
            placeholder="Enter your review here"
            multiline
            rows={10}
            label="Review"
            value={feedback_info.feedback}
            onChange={handleChange}
            sx={{
              minWidth: 120,
              width: "40%",
            }}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              feedback_info.session === "" ||
              feedback_info.semester === "" ||
              feedback_info.course === "" ||
              feedback_info.feedback === ""
            }>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
