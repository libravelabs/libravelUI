# LibravelUI — Next.js Starter Kit

The official LibravelUI starter for [Next.js](https://nextjs.org) (App Router), pre-configured with components, theming, and Tailwind CSS.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Components

```bash
npx libravelui@latest add button input modal
```

Components are copied into `src/components/ui/core/` — you own and can modify the source freely.

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, pages)
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
