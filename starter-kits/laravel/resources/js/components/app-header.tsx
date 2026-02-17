import { Link } from '@inertiajs/react';
import { BookCopy, Files, LayoutGrid } from 'lucide-react';
import {
    Navbar,
    NavbarDrawer,
    NavbarItem,
    NavbarMobile,
    NavbarSection,
    NavbarSpacer,
    NavbarStart,
    NavbarTrigger,
} from '@/components/ui/block/navbar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { AppLogo } from '@/components/logo';
import { NavUser } from './nav-user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: <LayoutGrid />,
    },
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

export function AppHeader() {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <>
            <Navbar variant="inset">
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
                    <NavUser variant="avatar" />
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
        </>
    );
}
