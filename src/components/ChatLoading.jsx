import React from 'react'

const ChatLoading = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center animate-fade-in">
    
      <div className="bg-gray-100 rounded-2xl px-6 py-4 shadow-md">
        <p className="text-gray-600 text-base">
          Please wait! Chat is loading...
        </p>
        <div className="flex justify-center mt-2 space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        If it doesn't load, select the chat from the sidebar.
      </p>
    </div>
  );
};

export default ChatLoading;
