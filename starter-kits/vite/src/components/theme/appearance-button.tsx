import { Sun, Moon } from 'lucide-react';
import * as React from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import { Button, type ButtonProps } from '@/components/ui/core/button';

export function AppearanceButton({ ...props }: ButtonProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button tone="outline" iconOnly {...props}>
                <Sun />
            </Button>
        );
    }

    return (
        <Button
            tone="outline"
            iconOnly
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            {...props}
        >
            {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
    );
}
