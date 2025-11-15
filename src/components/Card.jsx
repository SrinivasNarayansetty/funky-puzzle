const Card = ({ card, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 cursor-pointer
        transition-all duration-300 hover:scale-105
        ${isMatched ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      <div
        className={`
          w-full h-full rounded-xl shadow-lg
          transition-all duration-500 transform-gpu
          ${isFlipped || isMatched ? 'rotate-y-180' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Card Back */}
        <div
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="text-white text-4xl sm:text-5xl font-bold animate-pulse-slow">?</div>
        </div>

        {/* Card Front */}
        <div
          className={`
            absolute w-full h-full rounded-xl flex items-center justify-center
            ${isMatched ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-white'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className={`
            text-5xl sm:text-6xl font-bold
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
