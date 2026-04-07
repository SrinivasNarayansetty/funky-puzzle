const WelcomeScreen = ({ username, onStart }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center z-50 animate-gradient">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-bounce-slow">
          🧩 Funky Puzzle
        </h1>

        {username && (
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-semibold">
            Hey {username}! Ready to play?
          </p>
        )}

        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
          Test your memory and IQ power! Find all matching card positions by flipping them.
          Complete the puzzle as fast as you can to get the best score!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">24 Cards</h3>
            <p className="text-white/80 text-sm">Find 12 matching pairs in a 6x4 grid</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
            <div className="text-5xl mb-3">⏱️</div>
            <h3 className="text-lg font-bold text-white mb-2">Race Time</h3>
            <p className="text-white/80 text-sm">Beat the clock and improve your score</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border-2 border-white/30">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-lg font-bold text-white mb-2">Track Progress</h3>
            <p className="text-white/80 text-sm">See your best, average, and worst times</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-4 bg-white text-purple-600 font-bold text-2xl px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-300"
        >
          <span>Start Game</span>
          <svg
            className="w-8 h-8 transform group-hover:translate-x-2 transition-transform"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
        </button>

        <div className="mt-12">
          <a
            href="https://github.com/SrinivasNarayansetty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
