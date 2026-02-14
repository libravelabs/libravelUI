import { Link } from '@inertiajs/react';
import { BookCopy, LayoutGrid, Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/core/breadcrumbs';
import { Button } from '@/components/ui/core/button';
import {
    Navbar,
    NavbarDrawer,
    NavbarItem,
    NavbarMobile,
    NavbarSection,
    NavbarSpacer,
    NavbarStart,
    NavbarTrigger,
} from '@/components/ui/core/navbar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType, NavItem } from '@/types';
import { AppLogo } from '@/components/logo';
import { NavUser } from './nav-user';

type Props = {
    breadcrumbs?: BreadcrumbItemType[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: <LayoutGrid />,
    },
    {
        title: 'Repository',
        href: 'https://github.com',
        icon: <BookCopy />,
        target: '_blank',
    },
];

export function AppHeader({ breadcrumbs = [] }: Props) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <>
            <Navbar isSticky variant="inset">
                <NavbarStart>
                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center"
                    >
                        <AppLogo />
                    </Link>
                </NavbarStart>

                <NavbarSection className="ms-4">
                    {mainNavItems.map((item) => (
                        <NavbarItem
                            key={toUrl(item.href)}
                            href={String(item.href)}
                            target={item.target}
                            isCurrent={isCurrentUrl(toUrl(item.href))}
                        >
                            {item.icon && item.icon}
                            {item.title}
                        </NavbarItem>
                    ))}
                </NavbarSection>

                <NavbarSpacer />

                <NavbarSection>
                    <div className="flex items-center gap-1">
                        <Button
                            tone="ghost"
                            iconOnly
                            className="group size-9 cursor-pointer"
                        >
                            <Search className="size-5! opacity-80 group-hover:opacity-100" />
                        </Button>
                        <NavUser variant="avatar" />
                    </div>
                </NavbarSection>
            </Navbar>

            <NavbarMobile>
                <NavbarTrigger />
                <NavbarSpacer />
                <Link href={dashboard()} prefetch className="flex items-center">
                    <AppLogo />
                </Link>
                <NavbarSpacer />
                <div className="ms-auto">
                    <NavUser variant="avatar" />
                </div>
            </NavbarMobile>

            <NavbarDrawer>
                <NavbarSection>
                    {mainNavItems.map((item) => (
                        <NavbarItem
                            key={toUrl(item.href)}
                            href={String(item.href)}
                            target={item.target}
                            isCurrent={isCurrentUrl(toUrl(item.href))}
                        >
                            {item.icon && item.icon}
                            {item.title}
                        </NavbarItem>
                    ))}
                </NavbarSection>
            </NavbarDrawer>

            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumb>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <BreadcrumbItem
                                    key={index}
                                    href={breadcrumb.href}
                                    className={
                                        index === breadcrumbs.length - 1
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }
                                >
                                    {breadcrumb.title}
                                </BreadcrumbItem>
                            ))}
                        </Breadcrumb>
                    </div>
                </div>
            )}
        </>
    );
}
