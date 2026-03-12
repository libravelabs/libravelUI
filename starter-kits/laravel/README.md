# LibravelUI — Laravel + Inertia Starter Kit

The official LibravelUI starter for [Laravel](https://laravel.com) with [Inertia.js](https://inertiajs.com) and React, pre-configured with components, theming, and Tailwind CSS.

## Quick Start

```bash
# 1. Install PHP dependencies
composer install

# 2. Install JS dependencies
npm install

# 3. Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# 4. Run migrations
php artisan migrate

# 5. Start the dev server
npm run dev
# In a separate terminal:
php artisan serve
```

Open [http://localhost:8000](http://localhost:8000).

## Adding Components

```bash
npx libravelui@latest add button input modal
```

Components are copied into `resources/js/components/ui/core/` — you own and can modify the source freely.

## Project Structure

```
resources/js/
├── pages/            # Inertia page components
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
