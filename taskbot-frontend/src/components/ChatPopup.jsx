import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChatPopup({ onTaskUpdate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedAction, setSelectedAction] = useState(''); // Track selected action
  const [isOpen, setIsOpen] = useState(false);

  // Handle sending a message to the chatbot API
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAction) {
      toast.error('Please enter a message and select an action.');
      return;
    }

    // Add user message to the chat
    const newMessage = { sender: 'user', text: `${selectedAction}: ${input}` };
    setMessages([...messages, newMessage]);

    try {
      // Send action and message to the backend
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        action: selectedAction.toLowerCase(),
        message: input,
      });

      // Show the bot response
      const botResponse = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botResponse]);

      // If a task is created/updated/deleted, notify the user
      if (response.data.taskUpdated || response.data.createdTask) {
        onTaskUpdate(); // Trigger parent task update
        toast.success(`Task ${selectedAction.toLowerCase()}ed successfully!`);
      }
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      toast.error('Failed to process the request.');
    }

    setInput('');
    setSelectedAction('');
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 ease-in-out"
      >
        💬
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 transform animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center font-extrabold rounded-t-xl">
            TaskBot Chat
          </div>

          {/* Chat Body */}
          <div className="p-4 h-60 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center italic">No messages yet. Start a conversation...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <span
                    className={`px-4 py-2 text-sm rounded-lg shadow ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Input Field */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full border rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
              >
                Send
              </button>
            </div>
          </div>

          {/* Task Action Buttons */}
          <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-b-xl">
            {['Create Task', 'Update Task', 'Delete Task', 'Finish Task'].map((action) => (
              <button
                key={action}
                onClick={() => setSelectedAction(action)}
                className={`text-xs font-bold px-3 py-2 rounded-full transition-all duration-300 ${
                  selectedAction === action
                    ? 'bg-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
