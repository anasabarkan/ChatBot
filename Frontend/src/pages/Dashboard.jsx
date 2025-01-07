import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import ChatPopup from '../components/ChatPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Example Task', description: 'This is a task description', dueDate: '2024-12-25' },
  ]);

  const fetchUpdatedTasks = () => {
    console.log('Fetching updated tasks...');
  };

  return (
<div className="bg-gradient-to-r from-purple-200 via-blue-200 to-white min-h-screen">
<Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Chat Popup */}
      <ChatPopup onTaskUpdate={fetchUpdatedTasks} />

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
