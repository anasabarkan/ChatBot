import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskCard() {
  const [tasks, setTasks] = useState([]); // Tasks from the backend
  const [error, setError] = useState(null); // Error handling
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  }); // Form data for new task
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data); // Update tasks state with fetched data
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
        console.error(err);
      }
    };
    fetchTasks();
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]); // Update tasks state with the new task
      setFormData({ title: '', description: '', dueDate: '', priority: 'medium' }); // Reset the form
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
    }
  };

  // Update a task
  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, ...response.data } : task))
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col gap-6 items-center">
      {error && <div className="text-red-500">{error}</div>}

      {/* Add Task Form */}
      <div className="h-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-4">Add a New Task</h3>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700 font-medium mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Display Tasks */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`rounded-lg border p-8 w-full max-w-md hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out`}
        >
          {/* Task Header */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-blue-700 truncate">{task.title}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>

          {/* Task Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>

          {/* Task Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateTask(task._id, { status: 'completed' })}
                className={`bg-green-500 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-green-600 transition-all`}
              >
                Complete
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className={`bg-red-500 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-red-600 transition-all`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
