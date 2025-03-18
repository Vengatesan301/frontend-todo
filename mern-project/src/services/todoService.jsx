import axios from "axios";
const API_URL = "http://localhost:3000/api/todos";


export const getTodos = async ({ search = "", sortBy = "createdAt", page = 1, limit = 5 }) => {
  const response = await axios.get(API_URL, { params: { search, sortBy, page, limit } });
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
