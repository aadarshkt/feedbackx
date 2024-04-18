import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_info",
  initialState: {
    first_name: "",
    last_name: "",
    roll_no: "",
    email: "",
    session: [
      {
        name: "",
        semesters: [
          {
            name: "",
            courses: [
              {
                name: "",
              },
            ],
          },
        ],
      },
    ],
  },
  reducers: {
    updateDetails: (state, studentDetails) => {
      state.first_name = studentDetails.first_name;
    },
  },
});

export const { updateDetails } = userSlice.actions;

export default userSlice.reducer;
