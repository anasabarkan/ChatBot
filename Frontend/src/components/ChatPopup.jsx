import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatPopup({ onTaskUpdate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAction) {
      toast.error("Please enter a message and select an action.");
      return;
    }

    const userMessage = `${selectedAction}: ${input}`;
    setMessages([...messages, { sender: "user", text: userMessage }]);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in. Please log in to continue.");
        return;
      }

      let response;

      if (selectedAction === "Create Task") {
        response = await axios.post(
          "https://chatbot-tu2h.onrender.com/api/tasks",
          { message: input },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (selectedAction === "Update Task") {
        const [taskId, updateInstruction] = input.split(":");

        if (!taskId || !updateInstruction) {
          toast.error("Invalid input format. Please provide 'Task ID: Update Instruction'.");
          return;
        }

        response = await axios.put(
          `https://chatbot-tu2h.onrender.com/api/tasks/${taskId.trim()}`,
          { updateInstruction: updateInstruction.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (selectedAction === "Delete Task") {
        response = await axios.delete(`https://chatbot-tu2h.onrender.com/api/tasks/${input.trim()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const botResponse = response.data.task || response.data.message;
      setMessages((prev) => [...prev, { sender: "bot", text: JSON.stringify(botResponse) }]);

      if (onTaskUpdate) onTaskUpdate();
      toast.success(`${selectedAction} completed successfully!`);
    } catch (error) {
      console.error("Error interacting with API:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to process the request.");
    }

    setInput("");
    setSelectedAction("");
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 ease-in-out"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 transform animate-fade-in">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 text-center font-extrabold rounded-t-xl">
            TaskBot Chat
          </div>

          <div className={`p-4 h-60 bg-gray-50 ${messages.length > 0 ? "overflow-y-auto" : "overflow-hidden"}`}>
            {messages.length === 0 ? (
              <p className="text-gray-400 text-sm text-center italic">
                No messages yet. Start a conversation...
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`px-4 py-2 text-sm rounded-lg shadow ${
                      msg.sender === "user"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full border rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-500 text-white px-3 py-3 rounded-full shadow-md hover:bg-purple-600 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>
              </button>
            </div>
          </div>

          <div className="flex justify-between px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-b-xl">
            {["Create Task", "Update Task", "Delete Task"].map((action) => (
              <button
                key={action}
                onClick={() => setSelectedAction(action)}
                className={`text-xs font-bold px-3 py-2 rounded-full transition-all duration-300 ${
                  selectedAction === action
                    ? "bg-purple-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
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