import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
    function __(
        key: string,
        replace?: Record<string, string>,
        fallback?: string,
    ): string;
}
