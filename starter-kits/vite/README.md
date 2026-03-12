# LibravelUI — Vite Starter Kit

The official LibravelUI starter for [Vite](https://vitejs.dev) + React, pre-configured with components, theming, and Tailwind CSS.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding Components

```bash
npx libravelui@latest add button input modal
```

Components are copied into `src/components/ui/core/` — you own and can modify the source freely.

## Project Structure

```
src/
├── main.tsx          # App entry point
├── App.tsx           # Root component
├── components/
│   └── ui/
│       └── core/     # LibravelUI core components
│       └── motion/   # LibravelUI motion components
│       └── block/    # LibravelUI block components
└── lib/              # Utilities (cn, etc.)
components.json       # LibravelUI CLI config
```

## Documentation

[https://ui.libravelabs.com](https://ui.libravelabs.com)
