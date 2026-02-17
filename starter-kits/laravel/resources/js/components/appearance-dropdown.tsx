import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/core/dropdown-menu';

export function AppearanceDropdown({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { theme, setTheme } = useTheme();

    const getCurrentIcon = () => {
        switch (theme) {
            case 'dark':
                return <Moon className="h-5 w-5" />;
            case 'light':
                return <Sun className="h-5 w-5" />;
            default:
                return <Monitor className="h-5 w-5" />;
        }
    };

    return (
        <div className={className} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger tone="secondary" iconOnly>
                    {getCurrentIcon()}
                    <span className="sr-only">Switch theme</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent placement="end">
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setTheme('light')}
                    >
                        <span className="flex items-center gap-2">
                            <Sun className="h-5 w-5" />
                            Light
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setTheme('system')}
                    >
                        <span className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            System
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setTheme('dark')}
                    >
                        <span className="flex items-center gap-2">
                            <Moon className="h-5 w-5" />
                            Dark
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
