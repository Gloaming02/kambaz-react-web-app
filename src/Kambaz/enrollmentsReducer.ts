import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { enrollments } from "./Database"; 
const initialState = {
  enrollments: enrollments, 
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { user, course } }) => {
      const newEnrollment = {
        _id: uuidv4(), 
        user,
        course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },

    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course)
      );
    },

    updateEnrollment: (state, { payload: updatedEnrollment }) => {
      state.enrollments = state.enrollments.map((e: any) =>
        e._id === updatedEnrollment._id ? updatedEnrollment : e
      );
    },

    editEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.map((e: any) =>
        e._id === enrollmentId ? { ...e, editing: true } : e
      );
    },
  },
});

export const { enroll, unenroll, updateEnrollment, editEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
