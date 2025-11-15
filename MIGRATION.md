# Migration Guide: Funky Puzzle v1 → v2

This document outlines the major changes in migrating from vanilla JavaScript to React + Tailwind CSS.

## What Changed

### Technology Stack

**Before (v1):**
- Vanilla JavaScript
- jQuery 3.1.1 (from 2016)
- Font Awesome 4.7.0 (from 2016)
- Pure CSS
- No build system

**After (v2):**
- React 18.3 (Latest)
- Vite 5.4 (Modern build tool)
- Tailwind CSS 3.4 (Utility-first CSS)
- ESLint 9 (Code quality)
- No external dependencies for icons

### Code Improvements

#### 1. Removed jQuery Dependency
All jQuery calls (`$('.wrapper').hide()`, `$('.scores').show()`) were replaced with React state management.

#### 2. Fixed Security Issues
- **Before:** Modified `Array.prototype.memory_tile_shuffle` (dangerous practice)
- **After:** Created standalone `shuffleArray()` utility function

#### 3. Better State Management
- **Before:** Global variables scattered throughout
- **After:** Centralized state with React hooks (useState, useEffect, useCallback)

#### 4. Component Architecture
The monolithic `app.js` was split into reusable components:
- `App.jsx` - Main game logic
- `Card.jsx` - Individual card component
- `Timer.jsx` - Timer with useEffect hook
- `ScoreBoard.jsx` - Score tracking
- `WelcomeScreen.jsx` - Landing page

#### 5. Modern JavaScript
- **Before:** `var`, function declarations
- **After:** `const`/`let`, arrow functions, destructuring, template literals

#### 6. Styling
- **Before:** 200+ lines of custom CSS with magic numbers
- **After:** Tailwind utility classes with modern gradients and animations

#### 7. Performance
- **Before:** Direct DOM manipulation
- **After:** Virtual DOM with React for optimal re-renders

## File Structure Changes

### Removed Files (now in `/archive`)
- `public/index.html` (old version)
- `src/app.js` (vanilla JS version)
- `styles/styles.css` (old CSS)
- `public/vendor/jquery/` (no longer needed)
- `public/vendor/font-awesome/` (using inline SVG)

### New Files
- `index.html` (React mount point)
- `src/main.jsx` (React entry)
- `src/App.jsx` (Main component)
- `src/index.css` (Tailwind imports)
- `src/components/` (Component directory)
- `vite.config.js` (Build config)
- `tailwind.config.js` (Style config)
- `package.json` (Modern dependencies)

## Breaking Changes

### localStorage Format
Score storage remains compatible! The `funky-puzzle-scores` key still works, but now stores as JSON array instead of comma-separated string.

### Browser Support
Now requires modern browsers with ES6+ support (2015+). No IE11 support.

## Performance Improvements

1. **Bundle Size:**
   - Before: ~280KB (jQuery + Font Awesome)
   - After: ~50KB gzipped (React + optimized build)

2. **Build Time:** Vite provides instant hot module replacement (HMR)

3. **Development Experience:**
   - ESLint catches errors before runtime
   - React DevTools for debugging
   - Fast refresh on save

## How to Run

### Development
```bash
yarn install
yarn dev
```

### Production Build
```bash
yarn build
yarn preview
```

## Color Scheme Updates

The color scheme has been modernized with Tailwind's gradient utilities:

- **Primary:** Purple-Pink-Blue gradients
- **Accent:** Vibrant pink and purple tones
- **Background:** Soft gradient from purple to blue
- **Cards:** Gradient question marks, smooth flip animations

## Future Enhancements

Potential improvements for v3:
- [ ] Add difficulty levels (easy, medium, hard)
- [ ] Multiplayer mode
- [ ] Sound effects
- [ ] Dark mode toggle
- [ ] Animations with Framer Motion
- [ ] PWA support (offline play)
- [ ] Leaderboard with backend
- [ ] Custom card themes

---

**Questions?** Open an issue on GitHub!
