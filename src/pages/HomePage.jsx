import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { baseURL } from "../../api/baseURL";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { courseData } from "../utils/courseData";

const HomePage = () => {
  const { user } = useAuth0();
  console.log(user);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const user_info = useSelector((state) => state.user_info?.first_name);
  const [open, setOpen] = useState(true);

  //   useEffect(() => {
  //     if (
  //       user_info.first_name &&
  //       user_info.last_name &&
  //       user_info.roll_no &&
  //       user_info.email &&
  //       user_info.session.length
  //     ) {
  //       setIsInfoAvailable(true);
  //     } else {
  //       console.log("hello");
  //     }
  //   }, [user_info]);
  const [feedback_info, setFeedback_info] = useState({
    session: "",
    semester: "",
    course: "",
    feedback: "",
  });
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const get_options = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const url = `${baseURL}/api/students?objectId=${accessToken}`;
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const result = await axios.get(url, config);
        const data = await result.data;
        setStudentDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    get_options();
  }, []);

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

  const handleAccountClick = () => {
    navigate("/user-account");
  };

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
      const accessToken = await getAccessTokenSilently();
      await axios.put(`${baseURL}/api/students`, new_feedback_info, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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

  //state for dailog box.
  const [newUserInfo, setNewUserInfo] = useState({
    first_name: user.given_name,
    last_name: user.family_name,
    roll_no: "",
    email: user.email,
    sessions: [
      {
        name: "",
        semesters: [
          {
            name: "",
            courses: [
              {
                name: "",
                feedback: "",
              },
            ],
          },
        ],
      },
    ],
    semesters: [],
    courses: [],
  });

  const handleNewUserInfoSubmit = () => {
    console.log(newUserInfo);
    // setOpen(false);
  };
  const handleNewUserData = (event) => {
    if (event.target.name === "choose_sessions") {
      setNewUserInfo({ ...newUserInfo, sessions: event.target.value });
    } else if (event.target.name === "choose_semesters") {
      const [sessionValue, semesterValue] = event.target.value.split("-");
      const oldArray = newUserInfo.sessions;
      const findSession = oldArray((obj) => obj.name === sessionValue);
      const index = oldArray.indexOf(findSession);
      const newArray = oldArray;
      newArray[index].semesters.values.push(semesterValue);
      setNewUserInfo({ ...newUserInfo, semesters: event.target.value });
    } else if (event.target.name === "choose_courses") {
      setNewUserInfo({ ...newUserInfo, courses: event.target.value });
    } else if (event.target.name === "roll_no") {
      setNewUserInfo({ ...newUserInfo, roll_no: event.target.value });
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
      <Fragment>
        <Dialog open={true}>
          <DialogTitle>Fill Details</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill additional details for providing feedback.</DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              name="first_name"
              value={newUserInfo.first_name}
              label="First Name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="last_name"
              value={newUserInfo.last_name}
              label="Last Name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="roll_no"
              value={newUserInfo.roll_no}
              onChange={handleNewUserData}
              label="Roll No"
              fullWidth
              variant="standard"
            />
            <TextField
              disabled={true}
              autoFocus
              required
              margin="dense"
              name="email"
              value={newUserInfo.email}
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel>Choose Sessions</InputLabel>
              <Select
                name="choose_sessions"
                label="Choose Sessions"
                value={newUserInfo.sessions}
                onChange={handleNewUserData}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}>
                {courseData &&
                  courseData?.map((session) => {
                    return <MenuItem key={`${session.id}`} value={`${session.name}`}>{`${session.name}`}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Choose Semesters</InputLabel>
              <Select
                name="choose_semesters"
                label="Choose Semesters"
                value={newUserInfo.semesters}
                onChange={handleNewUserData}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}>
                {courseData &&
                  courseData
                    .filter((session) => newUserInfo.sessions.includes(session.name))
                    .map((session) =>
                      session.semesters.map((semester) => {
                        return (
                          <MenuItem
                            key={`${semester.id}`}
                            value={`${semester.name}-${session.name}`}>{`${semester.name}`}</MenuItem>
                        );
                      })
                    )}
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Choose Courses</InputLabel>
              <Select
                name="choose_courses"
                label="Choose Courses"
                value={newUserInfo.courses}
                onChange={handleNewUserData}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}>
                {courseData &&
                  courseData
                    .filter((session) => newUserInfo.sessions.includes(session.name))
                    .map((session) =>
                      session.semesters
                        .filter((semester) => newUserInfo.semesters.includes(semester.name))
                        .map((semester, index) => {
                          return semester.courses.map((course) => {
                            return <MenuItem key={`${index}`} value={`${course}`}>{`${course}`}</MenuItem>;
                          });
                        })
                    )}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Button
              disabled={
                newUserInfo.first_name === "" ||
                newUserInfo.last_name === "" ||
                newUserInfo.roll_no === "" ||
                newUserInfo.sessions.length === 0 ||
                newUserInfo.semesters.length === 0 ||
                newUserInfo.courses.length === 0
              }
              variant="outlined"
              onClick={handleNewUserInfoSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography variant="h3">FeedbackX</Typography>
        <Avatar src={user.picture} alt="Profile Image" onClick={handleAccountClick} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 2,
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
};

export default HomePage;
