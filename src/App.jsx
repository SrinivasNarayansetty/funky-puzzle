import { useState, useEffect, useCallback } from 'react';
import Card, { getRandomTheme } from './components/Card';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import WelcomeScreen from './components/WelcomeScreen';
import UsernameModal from './components/UsernameModal';
import UserMenu from './components/UserMenu';
import Dashboard from './components/Dashboard';

// Game configuration
const CARD_VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const STORAGE_KEY = 'funky-puzzle-scores';
const USER_KEY = 'funky-puzzle-user';

// Utility function to shuffle array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create initial deck (each card appears twice)
const createDeck = () => {
  const deck = CARD_VALUES.flatMap((value, index) => [
    { id: `${value}-1-${index}`, value },
    { id: `${value}-2-${index}`, value },
  ]);
  return shuffleArray(deck);
};

function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem(USER_KEY) || '';
  });
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [cards, setCards] = useState(createDeck());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [scores, setScores] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [cardTheme, setCardTheme] = useState(getRandomTheme);

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    if (savedScores) {
      try {
        const parsed = JSON.parse(savedScores);
        setScores(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Failed to parse scores:', e);
      }
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    if (scores.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    }
  }, [scores]);

  // Check for game completion
  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      setIsTimerRunning(false);

      // Add score and redirect to dashboard after a delay
      setTimeout(() => {
        setScores(prev => [...prev, currentTime]);
        setCards(createDeck());
        setFlippedCards([]);
        setMatchedCards([]);
        setCurrentTime(0);
        setIsChecking(false);
        setCardTheme(getRandomTheme());
        setShowWelcome(false);
        setShowDashboard(true);
      }, 1500);
    }
  }, [matchedCards, cards, currentTime]);

  // Handle card flip
  const handleCardClick = useCallback((card) => {
    if (
      isChecking ||
      flippedCards.length >= 2 ||
      flippedCards.find(c => c.id === card.id) ||
      matchedCards.includes(card.id)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);

      if (newFlipped[0].value === newFlipped[1].value) {
        setTimeout(() => {
          setMatchedCards(prev => [...prev, newFlipped[0].id, newFlipped[1].id]);
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, matchedCards, isChecking]);

  const resetGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setMatchedCards([]);
    setCurrentTime(0);
    setShowWelcome(true);
    setIsTimerRunning(false);
    setIsChecking(false);
    setCardTheme(getRandomTheme());
  };

  const startGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setMatchedCards([]);
    setCurrentTime(0);
    setIsChecking(false);
    setCardTheme(getRandomTheme());
    setShowWelcome(false);
    setShowDashboard(false);
    setIsTimerRunning(true);
  };

  const clearScores = () => {
    setScores([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleUsernameSubmit = (name) => {
    setUsername(name);
    localStorage.setItem(USER_KEY, name);
  };

  const handleLogout = () => {
    setUsername('');
    setScores([]);
    setShowWelcome(true);
    setShowDashboard(false);
    setIsTimerRunning(false);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('funky-puzzle-theme-queue');
    localStorage.removeItem('funky-puzzle-theme-last');
  };

  // Show username modal if no user
  if (!username) {
    return <UsernameModal onSubmit={handleUsernameSubmit} />;
  }

  // Show dashboard
  if (showDashboard) {
    return (
      <Dashboard
        username={username}
        scores={scores}
        onBack={() => setShowDashboard(false)}
        onStartNewGame={startGame}
        onClearScores={clearScores}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {showWelcome && <WelcomeScreen username={username} onStart={startGame} />}

      {!showWelcome && (
        <>
          {/* Header */}
          <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                🧩 Funky Puzzle
              </h1>
              <UserMenu
                username={username}
                onDashboard={() => {
                  setIsTimerRunning(false);
                  setShowDashboard(true);
                }}
                onLogout={handleLogout}
              />
            </div>
          </header>

          {/* Main Game Area */}
          <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
              {/* Game Board */}
              <div className="flex-1 max-w-2xl">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 sm:gap-5 bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white">
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      isFlipped={flippedCards.some(c => c.id === card.id)}
                      isMatched={matchedCards.includes(card.id)}
                      onClick={handleCardClick}
                      theme={cardTheme}
                    />
                  ))}
                </div>

                {/* Mobile Stats */}
                <div className="lg:hidden mt-6 space-y-4">
                  <Timer isRunning={isTimerRunning} onTimeUpdate={handleTimeUpdate} />
                  <ScoreBoard scores={scores} onClearScores={clearScores} />
                </div>

                {/* Reset Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Reset Game
                  </button>
                </div>
              </div>

              {/* Sidebar - Desktop Only */}
              <aside className="hidden lg:block w-80 space-y-6 sticky top-8">
                <Timer isRunning={isTimerRunning} onTimeUpdate={handleTimeUpdate} />
                <ScoreBoard scores={scores} onClearScores={clearScores} />
              </aside>
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-12 py-6 text-center text-gray-600">
            <a
              href="https://github.com/SrinivasNarayansetty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-purple-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              <span>Created by Srinivas Narayansetty</span>
            </a>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
