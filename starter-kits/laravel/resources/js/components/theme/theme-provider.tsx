import * as React from 'react';

export interface ThemeProviderProps {
    themes?: string[];
    forcedTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    enableColorScheme?: boolean;
    storageKey?: string;
    defaultTheme?: string;
    attribute?: string | 'class';
    value?: { [themeName: string]: string };
    nonce?: string;
    children?: React.ReactNode;
}

interface UseThemeProps {
    setTheme: (theme: string) => void;
    theme?: string;
    resolvedTheme?: string;
    systemTheme?: 'light' | 'dark';
    themes: string[];
}

const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultThemes = ['light', 'dark'];

export const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
    const context = React.useContext(ThemeContext);

    if (context) return <React.Fragment>{props.children}</React.Fragment>;
    return <Theme {...props} />;
};

const Theme = ({
    forcedTheme,
    disableTransitionOnChange = false,
    enableSystem = true,
    enableColorScheme = true,
    storageKey = 'theme',
    themes = defaultThemes,
    defaultTheme = 'system',
    attribute = 'class',
    value,
    children,
    nonce,
}: ThemeProviderProps) => {
    const [theme, setThemeState] = React.useState(() =>
        getTheme(storageKey, defaultTheme),
    );
    const [resolvedTheme, setResolvedTheme] = React.useState(() =>
        getTheme(storageKey),
    );
    const [mounted, setMounted] = React.useState(false);

    const applyTheme = React.useCallback(
        (theme: string) => {
            let resolved = theme;
            if (!resolved) return;

            if (theme === 'system' && enableSystem) {
                resolved = getSystemTheme();
            }

            const name = value ? value[resolved] : resolved;
            const d = document.documentElement;

            if (attribute === 'class') {
                d.classList.remove(...(value ? Object.values(value) : themes!));
                if (name) d.classList.add(name);
            } else {
                if (name) {
                    d.setAttribute(attribute, name);
                } else {
                    d.removeAttribute(attribute);
                }
            }

            if (enableColorScheme) {
                const fallback = defaultThemes.includes(resolved)
                    ? resolved
                    : null;
                const colorScheme = forcedTheme ? forcedTheme : fallback;

                if (colorScheme) {
                    d.style.colorScheme = colorScheme;
                }
            }
        },
        [
            attribute,
            enableColorScheme,
            forcedTheme,
            themes,
            value,
            enableSystem,
        ],
    );

    const disableTransitions = React.useCallback(() => {
        const css = document.createElement('style');
        css.append(
            document.createTextNode(
                `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
            ),
        );
        document.head.append(css);

        return () => {
            (() => window.getComputedStyle(document.body))();

            requestAnimationFrame(() => {
                css.remove();
            });
        };
    }, []);

    const setTheme = React.useCallback(
        (value: string) => {
            const cleanup = disableTransitionOnChange
                ? disableTransitions()
                : null;

            setThemeState(value);

            try {
                localStorage.setItem(storageKey, value);
            } catch (e) {}

            if (cleanup) cleanup();
        },
        [storageKey, disableTransitionOnChange, disableTransitions],
    );

    const handleMediaQuery = React.useCallback(
        (e: MediaQueryListEvent | MediaQueryList) => {
            const resolved = getSystemTheme(e);
            setResolvedTheme(resolved);

            if (theme === 'system' && enableSystem && !forcedTheme) {
                applyTheme('system');
            }
        },
        [theme, enableSystem, forcedTheme],
    );

    React.useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', handleMediaQuery);
        handleMediaQuery(media);

        return () => media.removeEventListener('change', handleMediaQuery);
    }, [handleMediaQuery]);

    React.useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key !== storageKey) {
                return;
            }

            const theme = e.newValue || defaultTheme;
            setTheme(theme!);
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [setTheme, storageKey, defaultTheme]);

    React.useEffect(() => {
        const d = document.documentElement;
        if (attribute === 'class') {
            d.classList.remove(...themes);
        } else {
            d.removeAttribute(attribute);
        }
        d.setAttribute('style', '');
        if (forcedTheme) {
            applyTheme(forcedTheme);
        } else {
            applyTheme(theme);
        }
    }, [forcedTheme, theme]);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const providerValue = React.useMemo(
        () => ({
            theme,
            setTheme,
            forcedTheme,
            resolvedTheme: theme === 'system' ? resolvedTheme : theme,
            systemTheme: (enableSystem ? resolvedTheme : undefined) as
                | 'light'
                | 'dark'
                | undefined,
            themes: themes || [],
        }),
        [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
    );

    return (
        <ThemeContext.Provider value={providerValue}>
            <ThemeScript
                {...{
                    forcedTheme,
                    disableTransitionOnChange,
                    enableSystem,
                    enableColorScheme,
                    storageKey,
                    themes: themes!,
                    defaultTheme,
                    attribute,
                    value,
                    children,
                    nonce,
                }}
            />
            {children}
        </ThemeContext.Provider>
    );
};

const ThemeScript = React.memo(
    ({
        forcedTheme,
        storageKey,
        attribute,
        enableSystem,
        enableColorScheme,
        defaultTheme,
        value,
        themes,
        nonce,
    }: ThemeProviderProps & { themes: string[] }) => {
        const scriptArgs = JSON.stringify([
            attribute,
            storageKey,
            defaultTheme,
            forcedTheme,
            themes,
            value,
            enableSystem,
            enableColorScheme,
        ]);

        return (
            <script
                nonce={nonce}
                dangerouslySetInnerHTML={{
                    __html: `(${optimization.toString()})(${scriptArgs})`,
                }}
            />
        );
    },
);

const optimization = (
    attribute: string,
    storageKey: string,
    defaultTheme: string,
    forcedTheme: string,
    themes: string[],
    value: { [key: string]: string },
    enableSystem: boolean,
    enableColorScheme: boolean,
) => {
    const el = document.documentElement;
    const systemThemes = ['light', 'dark'];
    const isClass = attribute === 'class';
    const classes =
        isClass && value ? themes.map((t) => value[t] || t) : themes;

    function updateDOM(theme: string) {
        const name = value ? value[theme] || theme : theme;

        if (isClass) {
            el.classList.remove(...classes);
            el.classList.add(name);
        } else {
            el.setAttribute(attribute, name);
        }

        if (enableColorScheme) {
            if (systemThemes.includes(theme)) {
                el.style.colorScheme = theme;
            }
        }
    }

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }

    if (forcedTheme) {
        updateDOM(forcedTheme);
    } else {
        try {
            const theme = localStorage.getItem(storageKey) || defaultTheme;
            const isSystem = theme === 'system';

            if (isSystem && enableSystem) {
                updateDOM(getSystemTheme());
            } else {
                updateDOM(theme);
            }
        } catch (e) {}
    }
};

const getTheme = (key: string, fallback?: string) => {
    if (typeof window === 'undefined') return undefined;
    let theme;
    try {
        theme = localStorage.getItem(key) || undefined;
    } catch (e) {}
    return theme || fallback;
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
    if (!e) e = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = e.matches;
    return isDark ? 'dark' : 'light';
};
