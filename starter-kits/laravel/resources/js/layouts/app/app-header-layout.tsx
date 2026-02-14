import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>
                <div className="scrollbar-hide flex h-full overflow-hidden rounded-xl">
                    <div className="flex-1 overflow-auto">{children}</div>
                </div>
            </AppContent>
        </AppShell>
    );
}
