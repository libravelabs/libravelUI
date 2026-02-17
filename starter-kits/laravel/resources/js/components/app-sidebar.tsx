import { Link } from '@inertiajs/react';
import { LayoutGrid, BookCopy, Files } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/block/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { AppLogoIcon, AppName } from '@/components/logo';
import { NavFooter } from '@/components/nav-footer';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: <LayoutGrid />,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/',
        icon: <BookCopy />,
        target: '_blank',
    },
    {
        title: 'Docs',
        href: 'https://github.com/libravelabs/libravelUI/',
        icon: <Files />,
        target: '_blank',
    },
];

export function AppSidebar() {
    const { state } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href={dashboard()} prefetch className="w-fit">
                            <SidebarMenuButton className="w-fit gap-1 hover:bg-transparent">
                                <AppLogoIcon className="size-5" />
                                {state !== 'collapsed' && (
                                    <AppName className="size-20" />
                                )}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
