# LibravelUI CLI

A powerful command-line interface to integrate LibravelUI into your project with industry-standard practices.

## Installation

You can run the CLI directly using `npx` or install it globally.

```bash
# Using npx (Recommended)
npx libravelui@latest init
```

## Commands

### `init`

Initializes your project with a selected theme and CSS configuration.

```bash
npx libravelui init
```

**What this command does:**

1. Fetches available themes from the LibravelUI registry.
2. Prompts you to choose a theme (Default, Orbital, Vercel, etc.).
3. Configures your global CSS file with Tailwind v4 `@theme` mappings.
4. Creates a `components.json` configuration file.

### `add`

Adds LibravelUI components to your project.

```bash
# Add a single component
npx libravelui add button

# Add multiple components
npx libravelui add button accordion loader

# Add all available components
npx libravelui add --all

# Search and select from the list (interactive)
npx libravelui add
```

**Features of `add`:**

- **Automatic Dependency Resolution**: If a component depends on others (e.g., `button` needs `loader`), the CLI will automatically install them.
- **Safe Overwrites**: CLI prompts for confirmation before overwriting existing utility or hook files.
- **Clean Configuration**: Only adds necessary files to your `src/components/ui`, `src/lib`, and `src/hooks` directories without touching your custom CSS.

## Project Structure

After running `init`, your project will follow this convention:

- `src/app/globals.css`: (or your chosen location) Updated with theme variables.
- `components.json`: Your local configuration.
- `src/components/ui/core/...`: Where specific UI components are stored.
- `src/lib/utils.ts`: Core utilities.
- `src/hooks/...`: Essential React hooks for component logic.
