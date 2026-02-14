import { Avatar } from '@/components/ui/core/avatar';
import { useSidebar } from '@/components/ui/core/sidebar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showName,
    showAvatar = true,
    showEmail = false,
}: {
    user: User;
    showName?: boolean;
    showAvatar?: boolean;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();
    const { state } = useSidebar();

    const shouldShowName = showName ?? state !== 'collapsed';

    return (
        <>
            {showAvatar && (
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    initials={getInitials(user.name)}
                    className="size-8 cursor-pointer transition-opacity ease-in-out hover:opacity-70"
                />
            )}
            {shouldShowName && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    {showEmail && (
                        <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </span>
                    )}
                </div>
            )}
        </>
    );
}
