const Dashboard = ({ username, scores, onBack, onStartNewGame, onClearScores }) => {
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = (() => {
    if (scores.length === 0) {
      return {
        gamesPlayed: 0,
        bestTime: 0,
        worstTime: 0,
        avgTime: 0,
        totalTime: 0,
        medianTime: 0,
        last5Avg: 0,
        streak: 0,
      };
    }

    const sorted = [...scores].sort((a, b) => a - b);
    const total = scores.reduce((sum, s) => sum + s, 0);
    const avg = Math.round(total / scores.length);
    const median =
      sorted.length % 2 === 0
        ? Math.round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2)
        : sorted[Math.floor(sorted.length / 2)];

    const last5 = scores.slice(-5);
    const last5Avg = Math.round(last5.reduce((s, v) => s + v, 0) / last5.length);

    // Improvement streak: how many recent games improved over the previous
    let streak = 0;
    for (let i = scores.length - 1; i > 0; i--) {
      if (scores[i] <= scores[i - 1]) {
        streak++;
      } else {
        break;
      }
    }

    return {
      gamesPlayed: scores.length,
      bestTime: Math.min(...scores),
      worstTime: Math.max(...scores),
      avgTime: avg,
      totalTime: total,
      medianTime: median,
      last5Avg,
      streak,
    };
  })();

  const StatCard = ({ label, value, icon, color }) => (
    <div className={`bg-white rounded-2xl shadow-lg p-5 border-2 ${color} transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-800 font-mono">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={onStartNewGame}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium px-5 py-2.5 rounded-full transition-all duration-300 border border-white/30 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>New Game</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Player Info */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-purple-100 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-pink-400 flex items-center justify-center shadow-lg border-3 border-white">
            <span className="text-white font-bold text-xl">
              {username.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
            <p className="text-gray-500">
              {stats.gamesPlayed === 0
                ? 'No games played yet'
                : `${stats.gamesPlayed} game${stats.gamesPlayed === 1 ? '' : 's'} played`}
            </p>
          </div>
        </div>

        {scores.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🎮</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Games Yet</h3>
            <p className="text-gray-500 mb-8">Play your first game to see your stats here!</p>
            <button
              onClick={onStartNewGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Play Now
            </button>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Games Played" value={stats.gamesPlayed} icon="🎮" color="border-purple-200" />
              <StatCard label="Best Time" value={formatTime(stats.bestTime)} icon="🏆" color="border-green-200" />
              <StatCard label="Worst Time" value={formatTime(stats.worstTime)} icon="🐌" color="border-red-200" />
              <StatCard label="Average Time" value={formatTime(stats.avgTime)} icon="📊" color="border-blue-200" />
              <StatCard label="Median Time" value={formatTime(stats.medianTime)} icon="📈" color="border-indigo-200" />
              <StatCard label="Last 5 Avg" value={formatTime(stats.last5Avg)} icon="🔥" color="border-orange-200" />
              <StatCard label="Total Time" value={formatTime(stats.totalTime)} icon="⏳" color="border-yellow-200" />
              <StatCard
                label="Improvement Streak"
                value={`${stats.streak} game${stats.streak === 1 ? '' : 's'}`}
                icon="📈"
                color="border-emerald-200"
              />
            </div>

            {/* Game History */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-purple-100 mb-8">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                Game History
              </h3>
              <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
                {[...scores].reverse().map((score, index) => {
                  const gameNum = scores.length - index;
                  const isBest = score === stats.bestTime;
                  const isWorst = score === stats.worstTime;
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                        isBest
                          ? 'bg-green-50 border border-green-200'
                          : isWorst
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-400 w-8">#{gameNum}</span>
                        {isBest && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">BEST</span>}
                        {isWorst && <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">WORST</span>}
                      </div>
                      <span className="font-mono font-bold text-gray-800">{formatTime(score)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartNewGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start New Game
              </button>
              <button
                onClick={onClearScores}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All Scores
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
