import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useTheme, type Appearance } from '@/components/theme/theme-provider';
import { motion } from 'motion/react';

export function AppearanceImage() {
    const { theme, setTheme } = useTheme();

    const themes: { value: Appearance; label: string; src: string }[] = [
        {
            value: 'light',
            label: 'light',
            src: '/assets/appearance/light-appearance.png',
        },
        {
            value: 'system',
            label: 'system',
            src: '/assets/appearance/system-appearance.png',
        },
        {
            value: 'dark',
            label: 'dark',
            src: '/assets/appearance/dark-appearance.png',
        },
    ];

    return (
        <div className="flex gap-2">
            {themes.map(({ value, src, label }) => (
                <div
                    key={value}
                    onClick={() => setTheme(value)}
                    className="group flex flex-col items-center gap-2"
                >
                    <div className="relative flex cursor-pointer justify-center overflow-visible">
                        <img
                            src={src}
                            alt={value}
                            className={cn(
                                'max-w-52 rounded-xl border border-transparent transition ease-in-out hover:opacity-100',
                                theme === value ? 'opacity-100' : 'opacity-70',
                            )}
                        />
                        {theme === value && (
                            <motion.div
                                layoutId="appearance-active"
                                className="absolute inset-0 rounded-xl border-3 border-primary"
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            >
                                <div className="absolute -right-2 -bottom-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Check className="size-4" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <span
                        className={cn(
                            theme === value
                                ? 'text-foreground'
                                : 'text-muted-foreground',
                            'cursor-pointer rounded-xl px-4 py-1 capitalize transition-colors group-hover:text-foreground',
                        )}
                    >
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
