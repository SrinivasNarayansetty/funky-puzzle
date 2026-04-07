const CARD_THEMES = [
  {
    name: 'hearts',
    gradient: 'from-rose-500 via-pink-500 to-red-500',
    matchGradient: 'from-green-400 to-emerald-500',
    icon: '❤️',
    shape: 'rounded-[30%]',
  },
  {
    name: 'classic',
    gradient: 'from-purple-500 via-pink-500 to-blue-500',
    matchGradient: 'from-green-400 to-emerald-500',
    icon: '?',
    shape: 'rounded-2xl',
  },
  {
    name: 'fruits',
    gradient: 'from-orange-400 via-amber-500 to-yellow-500',
    matchGradient: 'from-lime-400 to-green-500',
    icon: '🍎',
    shape: 'rounded-[40%_40%_45%_45%]',
  },
  {
    name: 'ocean',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    matchGradient: 'from-teal-400 to-cyan-500',
    icon: '🐚',
    shape: 'rounded-[50%_20%_50%_20%]',
  },
  {
    name: 'space',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    matchGradient: 'from-yellow-400 to-amber-500',
    icon: '⭐',
    shape: 'rounded-full',
  },
  {
    name: 'nature',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    matchGradient: 'from-rose-400 to-pink-500',
    icon: '🌿',
    shape: 'rounded-[20%_50%_20%_50%]',
  },
];

const THEME_QUEUE_KEY = 'funky-puzzle-theme-queue';
const THEME_LAST_KEY = 'funky-puzzle-theme-last';

const shuffleThemes = () => {
  const indices = CARD_THEMES.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

const getNextTheme = () => {
  let queue = [];
  try {
    const saved = localStorage.getItem(THEME_QUEUE_KEY);
    if (saved) queue = JSON.parse(saved);
  } catch {}

  // Refill queue if empty
  if (!Array.isArray(queue) || queue.length === 0) {
    queue = shuffleThemes();

    // Make sure the first theme in new queue isn't the same as last played
    const lastUsed = localStorage.getItem(THEME_LAST_KEY);
    if (lastUsed !== null && queue[0] === parseInt(lastUsed) && queue.length > 1) {
      // Swap first with a random later position
      const swapIdx = 1 + Math.floor(Math.random() * (queue.length - 1));
      [queue[0], queue[swapIdx]] = [queue[swapIdx], queue[0]];
    }
  }

  const nextIdx = queue.shift();
  localStorage.setItem(THEME_QUEUE_KEY, JSON.stringify(queue));
  localStorage.setItem(THEME_LAST_KEY, String(nextIdx));

  return CARD_THEMES[nextIdx];
};

// Legacy alias
const getRandomTheme = getNextTheme;

const Card = ({ card, isFlipped, isMatched, onClick, theme }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(card);
    }
  };

  const t = theme || CARD_THEMES[1];

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-full aspect-square cursor-pointer
        transition-all duration-300 hover:scale-105
        ${isMatched ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      <div
        className={`
          w-full h-full ${t.shape} shadow-lg
          transition-all duration-500 transform-gpu
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Card Back */}
        <div
          className={`absolute w-full h-full ${t.shape} bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-inner`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-white text-3xl sm:text-4xl font-bold opacity-80 select-none">
            {t.icon}
          </div>
        </div>

        {/* Card Front */}
        <div
          className={`
            absolute w-full h-full ${t.shape} flex items-center justify-center
            ${isMatched ? `bg-gradient-to-br ${t.matchGradient}` : 'bg-white shadow-inner'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className={`
            text-3xl sm:text-4xl md:text-5xl font-bold
            ${isMatched ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'}
          `}>
            {card.value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
export { getNextTheme, getRandomTheme, CARD_THEMES };
