const ScoreBoard = ({ scores, onClearScores }) => {
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateStats = () => {
    if (scores.length === 0) return { avg: 0, best: 0, worst: 0 };

    const total = scores.reduce((sum, score) => sum + score, 0);
    const avg = Math.round(total / scores.length);
    const best = Math.min(...scores);
    const worst = Math.max(...scores);

    return { avg, best, worst };
  };

  const stats = calculateStats();

  if (scores.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-pink-200 max-h-96 overflow-y-auto">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 text-center">
        Scores
      </h2>

      <div className="space-y-2 mb-4">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-3 py-2"
          >
            <span className="font-semibold text-gray-700">#{index + 1}</span>
            <span className="font-mono font-bold text-gray-800">{formatTime(score)}</span>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-purple-200 pt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Average:</span>
          <span className="font-mono font-bold text-blue-600">{formatTime(stats.avg)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Best:</span>
          <span className="font-mono font-bold text-green-600">{formatTime(stats.best)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Worst:</span>
          <span className="font-mono font-bold text-red-600">{formatTime(stats.worst)}</span>
        </div>
      </div>

      <button
        onClick={onClearScores}
        className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <span>Clear Scores</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default ScoreBoard;
