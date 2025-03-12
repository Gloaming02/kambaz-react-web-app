import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    assignments: assignments,
  };

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, { payload: assignment }) => {
        const newAssignment: any = {
            _id: uuidv4(),
            lessons: [],
            title: assignment.title,
            course: assignment.course,
            module: assignment.module,
            available: assignment.available,
            due: assignment.due,
            points: assignment.points,
            description: assignment.description,
        };
        state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (m: any) => m._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignment._id ? assignment : m
            ) as any;
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignmentId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
assignmentsSlice.actions;
export default assignmentsSlice.reducer;