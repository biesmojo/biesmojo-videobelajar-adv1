import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../../src/features/courses/courseSlice";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
  },
});
