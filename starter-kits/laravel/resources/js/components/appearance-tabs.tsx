import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import { TabList, Tabs, TabTrigger } from '@/components/ui/core/tabs';
import { cn } from '@/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { theme, setTheme } = useTheme();

    const tabs: { value: string; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <Tabs
            selectedKey={theme}
            onSelectionChange={(key) => setTheme(key as string)}
            className={cn('w-fit', className)}
            {...props}
        >
            <TabList>
                {tabs.map(({ value, icon: Icon, label }) => (
                    <TabTrigger key={value} id={value} className="px-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{label}</span>
                    </TabTrigger>
                ))}
            </TabList>
        </Tabs>
    );
}
