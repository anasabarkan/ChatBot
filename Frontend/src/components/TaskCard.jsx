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
        const response = await axios.get('https://chatbot-tu2h.onrender.com/api/tasks', {
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
        'https://chatbot-tu2h.onrender.com/api/tasks',
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
        `https://chatbot-tu2h.onrender.com/api/tasks/${taskId}`,
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
      await axios.delete(`https://chatbot-tu2h.onrender.com/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-6 items-center">
      {error && <div className="text-red-500">{error}</div>}

      {/* Add Task Form */}

      {/* Display Tasks */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`rounded-lg border py-2 px-2 w-full max-w-md hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out`}
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
              {/* <button
                onClick={() => handleUpdateTask(task._id, { status: 'completed' })}
                className={`bg-green-500 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-green-600 transition-all`}
              >
                Complete
              </button> */}

              {/* Delete button inside the card */}
              <button
                onClick={() => handleDeleteTask(task._id)}
                className={`bg-green-500 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-red-600 transition-all`}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
