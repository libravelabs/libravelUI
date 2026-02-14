import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/core/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/core/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import type { SharedData } from '@/types';
import type { PopoverContentProps } from '@/components/ui/core/popover';

export function NavUser({
    variant = 'default',
    popover,
}: {
    variant?: 'default' | 'avatar';
    popover?: PopoverContentProps;
}) {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    if (variant === 'avatar') {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger tone="unstyled" className="w-auto p-2">
                    <UserInfo user={auth.user} showName={false} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    popover={{
                        placement: 'bottom start',
                        withArrow: true,
                        ...popover,
                    }}
                >
                    <UserMenuContent user={auth.user} />
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        tone={state === 'collapsed' ? 'unstyled' : 'ghost'}
                        className="w-full"
                    >
                        <UserInfo user={auth.user} />
                        {state !== 'collapsed' && (
                            <ChevronsUpDown className="ml-auto size-4" />
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        popover={{
                            placement: isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                  ? 'end'
                                  : 'bottom',
                            withArrow: true,
                            ...popover,
                        }}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
