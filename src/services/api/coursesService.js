import axios from "axios";

// baseURL dari .env
const API_URL = import.meta.env.VITE_API_URL + "/video";

/// GET all
export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// CREATE
export const addCourse = async (newCourse) => {
  const response = await axios.post(API_URL, newCourse);
  return response.data.id
    ? response.data
    : { ...newCourse, id: Date.now() }; // pastikan ada id
};

// UPDATE
export const updateCourse = async (id, updatedCourse) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedCourse);
  return response.data.id
    ? response.data
    : { ...updatedCourse, id }; // pastikan return object
};

// DELETE
export const deleteCourse = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // harus return id
};