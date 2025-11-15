# 🧩 Funky Puzzle

A modern, beautifully designed memory card matching game built with React and Tailwind CSS. Test your memory and IQ by finding all matching card positions as fast as you can!

## ✨ Features

- **24 Cards**: Find 12 matching pairs in a 6×4 grid
- **Timer**: Race against the clock to improve your score
- **Score Tracking**: Automatically saves your scores with localStorage
- **Statistics**: View your best, average, and worst completion times
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient themes and smooth animations
- **React Hooks**: Built with modern React patterns (useState, useEffect, useCallback)
- **Optimized Performance**: Fast rendering with Vite build tool

## 🎮 How to Play

1. Click the **Start Game** button on the welcome screen
2. Click on any card to flip it and reveal its value
3. Click on another card to find its match
4. If the cards match, they stay flipped (with a green background)
5. If they don't match, they flip back after 1 second
6. Complete all 24 cards as fast as possible!
7. Your time is automatically saved to the scoreboard

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SrinivasNarayansetty/funky-puzzle.git
cd funky-puzzle
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Technologies Used

- **React 18.3** - Modern UI library with hooks
- **Vite 5.4** - Next-generation frontend build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **ESLint 9** - Code linting and quality checks
- **PostCSS & Autoprefixer** - CSS processing

## 📁 Project Structure

```
funky-puzzle/
├── src/
│   ├── components/
│   │   ├── Card.jsx          # Individual card component
│   │   ├── Timer.jsx          # Timer component
│   │   ├── ScoreBoard.jsx     # Score tracking component
│   │   └── WelcomeScreen.jsx  # Landing screen
│   ├── App.jsx                # Main game logic
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind imports & global styles
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── README.md                  # This file
```

## 🎨 Key Improvements (v2.0)

- ✅ Migrated from vanilla JavaScript to React
- ✅ Replaced jQuery with React hooks
- ✅ Modern Tailwind CSS styling (removed old CSS)
- ✅ Removed Font Awesome dependency (using inline SVG icons)
- ✅ Fixed security issues (removed Array.prototype modification)
- ✅ Better state management with React hooks
- ✅ Improved code organization with component-based architecture
- ✅ Added Vite for lightning-fast development and builds
- ✅ Mobile-responsive design with Tailwind breakpoints
- ✅ Modern gradient color schemes
- ✅ Smooth animations and transitions
- ✅ Better accessibility and UX

## 🎯 Game Rules

- Grid size: 6×4 (24 cards total)
- 12 unique pairs to match
- Cards are shuffled randomly each game
- Score based on completion time
- All scores saved in browser localStorage
- Clear scores option available

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 👤 Author

**Srinivas Narayansetty**
- GitHub: [@SrinivasNarayansetty](https://github.com/SrinivasNarayansetty)

---

Made with ❤️ using React and Tailwind CSS
