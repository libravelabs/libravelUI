import * as React from 'react';
import { SidebarInset } from '@/components/ui/block/sidebar';
import { NavbarInset } from '@/components/ui/block/navbar';

type Props = React.ComponentProps<typeof NavbarInset> & {
    variant?: 'header' | 'sidebar';
};

export function AppContent({ variant = 'header', children, ...props }: Props) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return <NavbarInset {...props}>{children}</NavbarInset>;
}
