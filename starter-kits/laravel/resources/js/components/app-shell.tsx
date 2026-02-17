import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/block/sidebar';
import type { SharedData } from '@/types';
import { NavbarProvider } from './ui/core/navbar';

type Props = {
    children: ReactNode;
    variant?: 'header' | 'sidebar';
};

export function AppShell({ children, variant = 'header' }: Props) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <NavbarProvider breakpoint="lg" className="max-h-screen">
                {children}
            </NavbarProvider>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen} className="max-h-screen">
            {children}
        </SidebarProvider>
    );
}
