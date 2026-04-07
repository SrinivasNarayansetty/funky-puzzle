import { useState } from 'react';

const UsernameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length >= 2) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-purple-200 animate-scale-in">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Welcome!
          </h2>
          <p className="text-gray-500 mt-2">Enter your name to track your scores</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              autoFocus
              maxLength={20}
              className="w-full px-5 py-4 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
            />
            {name.trim().length > 0 && name.trim().length < 2 && (
              <p className="text-red-400 text-sm mt-2 ml-1">Name must be at least 2 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            Let's Play!
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
