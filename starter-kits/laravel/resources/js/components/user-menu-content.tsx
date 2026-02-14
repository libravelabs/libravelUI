import { router } from '@inertiajs/react';
import { Gauge, LogOut, Settings } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuHeader,
} from '@/components/ui/core/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { dashboard, logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.post(logout());
    };

    return (
        <>
            <DropdownMenuHeader separator className="flex items-center gap-2">
                <UserInfo user={user} showEmail showName showAvatar={false} />
            </DropdownMenuHeader>
            <DropdownMenuGroup>
                <DropdownMenuItem onAction={() => router.visit(dashboard())}>
                    <Gauge /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                    onAction={() => {
                        cleanup();
                        router.visit(edit());
                    }}
                >
                    <Settings />
                    Settings
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
                <DropdownMenuItem onAction={handleLogout}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </>
    );
}
