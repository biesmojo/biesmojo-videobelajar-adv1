import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../services/api/coursesService";

// ambil data
export const fetchCourses = createAsyncThunk("courses/fetch", async () => {
  return await getCourses();
});

// tambah course
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (newCourse) => {
    return await addCourse(newCourse);
  }
);

// update course
export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async ({ id, updatedCourse }) => {
    return await updateCourse(id, updatedCourse);
  }
);

// Hapus course
export const removeCourse = createAsyncThunk(
  "courses/removeCourse",
  async (id) => {
    return await deleteCourse(id);
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Tambah
      .addCase(createCourse.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update
      .addCase(editCourse.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Hapus
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
