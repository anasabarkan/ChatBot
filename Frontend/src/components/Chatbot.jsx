import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate chatbot response
    setTimeout(() => {
      const botReply = { sender: 'bot', text: `You said: ${input}` };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <>
      <div className="chatbot-container">
        <div className="chatbox">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                <span className={`message-text ${msg.sender === 'user' ? 'user-text' : 'bot-text'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-box"
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        /* Background for the entire page */
        body {
          background: linear-gradient(135deg, #6e7dff, #48c6ef);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Chatbot container */
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Chatbox styling */
        .chatbox {
          display: flex;
          flex-direction: column;
          height: 400px;
          justify-content: space-between;
        }

        /* Messages area */
        .messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          max-height: 300px;
        }

        /* Message styling */
        .message {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 15px;
          padding: 5px 10px;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-text {
          display: inline-block;
          padding: 10px;
          border-radius: 12px;
          max-width: 75%;
        }

        .message .user-text {
          background-color: #4CAF50;
          color: white;
          border-radius: 12px 12px 0 12px;
        }

        .message .bot-text {
          background-color: #f1f1f1;
          color: #333;
          border-radius: 12px 12px 12px 0;
        }

        /* Input and button styling */
        .input-area {
          display: flex;
          padding: 10px;
          background-color: #f7f7f7;
        }

        .input-box {
          flex-grow: 1;
          padding: 8px 12px;
          border-radius: 18px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        .send-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 18px;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 14px;
          margin-left: 8px;
        }

        .send-button:hover {
          background-color: #45a049;
        }

        .send-button:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
