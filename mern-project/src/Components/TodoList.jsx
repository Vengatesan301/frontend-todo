import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice"; // Import logout action
import { getTodos, createTodo, deleteTodo, updateTodo } from "../services/todoService";
import "./Todo.css";
import dayjs from "dayjs";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loadTodos();
  }, [search, sortBy, page]);

  const loadTodos = async () => {
    try {
      const { todos, total } = await getTodos({ search, sortBy, page, limit });
      setTodos(todos);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const createdTodo = await createTodo({ title: newTodo, completed: false });
      setTodos((prev) => [...prev, createdTodo]);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      loadTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <h1 className="todo-title">Todo List</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <div className="todo-controls">
        <div className="todo-container">




          <input
            type="text"
            placeholder="Search Todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="sort-select">
            <option value="createdAt">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
          <div className="todo-input-group">
            <input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="todo-input"
            />
            <button onClick={handleAddTodo} className="add-button">Add</button>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : todos.length > 0 ? (
          <table className="todo-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo._id}>
                  <td>{index + 1}</td>
                  <td className={todo.completed ? "completed" : ""}>{todo.title}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo)}
                    />
                  </td>
                  <td>
                    <p>{dayjs(todo.createdAt).format("DD MMM YYYY, hh:mm A")}</p>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(todo._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-text">No todos available</p>
        )}

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="pagination-btn">Previous</button>
          <span> Page {page} of {totalPages} </span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="pagination-btn">Next</button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
