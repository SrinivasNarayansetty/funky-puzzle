# 🚀 Quick Start Guide

Get Funky Puzzle running in 3 simple steps!

## Prerequisites

Make sure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Yarn** (recommended) or npm

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
yarn --version  # Should be 1.22.0 or higher
```

## Step 1: Install Dependencies

```bash
yarn install
```

This will install:
- React 18.3
- Vite 5.4
- Tailwind CSS 3.4
- ESLint 9
- And other development tools

⏱️ Takes about 10-20 seconds

## Step 2: Start Development Server

```bash
yarn dev
```

The game will automatically open in your browser at `http://localhost:3000`

✅ You should see the Funky Puzzle welcome screen!

## Step 3: Play the Game!

1. Click **Start Game** button
2. Flip cards to find matching pairs
3. Try to complete all 24 cards as fast as possible
4. Your scores are automatically saved!

---

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server (hot reload enabled) |
| `yarn build` | Create optimized production build |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Check code quality with ESLint |

---

## Building for Production

```bash
# Create optimized build
yarn build

# Preview the production build
yarn preview
```

The optimized files will be in the `dist/` folder, ready to deploy!

---

## Deploying to Production

### Option 1: Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repo to [Netlify](https://www.netlify.com/)
3. Build settings:
   - Build command: `yarn build`
   - Publish directory: `dist`
4. Deploy! 🚀

### Option 2: Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com/)
3. Vercel auto-detects Vite config
4. Deploy! 🚀

### Option 3: GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/funky-puzzle",

# Build and deploy
yarn build
# Then push the dist folder to gh-pages branch
```

### Option 4: Any Static Hosting

Just upload the contents of the `dist/` folder to any static hosting service:
- AWS S3
- Google Cloud Storage
- DigitalOcean Spaces
- Cloudflare Pages
- etc.

---

## Troubleshooting

### Port 3000 already in use?

```bash
# Vite will automatically use the next available port
# Or specify a custom port in vite.config.js
```

### Build errors?

```bash
# Clear node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### Styling issues?

```bash
# Make sure Tailwind is configured correctly
# Check that index.css imports Tailwind directives
```

---

## Next Steps

- 📖 Read the full [README.md](README.md)
- 🔍 Check [MIGRATION.md](MIGRATION.md) to see what changed from v1
- 📝 View [CHANGELOG.md](CHANGELOG.md) for version history
- 💻 Customize the game (colors, card values, grid size)
- 🎨 Modify Tailwind theme in `tailwind.config.js`

---

## Need Help?

- 🐛 Found a bug? [Open an issue](https://github.com/SrinivasNarayansetty/funky-puzzle/issues)
- 💡 Have an idea? Submit a feature request!
- ⭐ Like the project? Give it a star on GitHub!

---

**Happy Gaming! 🎮**
