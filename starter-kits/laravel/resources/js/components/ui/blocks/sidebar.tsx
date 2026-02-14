import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/core/button';
import { motion, AnimatePresence } from 'motion/react';
import { Link, LinkProps } from '@/components/ui/core/link';

function Sidebar({ children, className }: React.ComponentProps<'aside'>) {
    return (
        <aside
            className={cn(
                'flex h-screen w-[280px] flex-col border-r border-sidebar-border bg-sidebar',
                className,
            )}
        >
            {children}
        </aside>
    );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('flex shrink-0 flex-col gap-2 px-3 py-4', className)}
            {...props}
        />
    );
}

function SidebarBody({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'relative flex flex-1 flex-col gap-1 overflow-y-auto px-3',
                className,
            )}
            {...props}
        />
    );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('shrink-0 px-3 py-4', className)} {...props} />;
}

interface SidebarSectionProps extends React.ComponentProps<'div'> {
    title?: string;
}

function SidebarSection({ title, children, className }: SidebarSectionProps) {
    return (
        <div className={cn('space-y-1', className)}>
            {title && (
                <div className="mb-2 px-3">
                    <h3 className="text-sm font-medium text-sidebar-foreground/50">
                        {title}
                    </h3>
                </div>
            )}
            {children}
        </div>
    );
}

interface SidebarItemProps extends ButtonProps {
    icon?: React.ReactNode;
    isActive?: boolean;
    href?: string;
    button?: ButtonProps;
    link?: LinkProps;
}

function SidebarItem({
    children,
    icon,
    isActive,
    size = 'sm',
    tone = 'ghost',
    href,
    button,
    link,
    className,
    ...props
}: SidebarItemProps) {
    if (href) {
        return (
            <Link href={href} className="w-full" {...link}>
                <Button
                    size={size}
                    tone={tone}
                    className={cn(
                        'w-full justify-start [&_*:not(.truncate)]:truncate',
                        isActive ? 'bg-foreground/10' : 'hover:bg-foreground/5',
                        button?.className,
                    )}
                    {...button}
                >
                    {icon && icon}
                    {children}
                </Button>
            </Link>
        );
    }

    return (
        <Button
            size={size}
            tone={tone}
            className={cn(
                'w-full justify-start [&_*:not(.truncate)]:truncate',
                isActive ? 'bg-foreground/10' : 'hover:bg-foreground/5',
                className,
            )}
            {...props}
        >
            {icon && icon}
            {children}
        </Button>
    );
}

interface SidebarGroupProps extends ButtonProps {
    label: string;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    stickyHeader?: boolean;
    classNames?: {
        stickyHeader?: string;
        trigger?: string;
    };
}

function SidebarGroup({
    label,
    icon,
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    className,
    size = 'sm',
    stickyHeader = false,
    classNames,
    ...props
}: SidebarGroupProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const handleToggle = () => {
        const next = !isOpen;
        if (!isControlled) setUncontrolledOpen(next);
        onOpenChange?.(next);
    };

    return (
        <div className={cn('grid w-full gap-1', className)}>
            <div
                className={cn(
                    stickyHeader &&
                        cn('sticky top-0 bg-sidebar', classNames?.stickyHeader),
                )}
            >
                <SidebarItem
                    onClick={handleToggle}
                    icon={icon}
                    size={size}
                    className={cn(classNames?.trigger)}
                    {...props}
                >
                    <h3 className="font-medium">{label}</h3>
                    <ChevronDown
                        className={cn(
                            'ms-auto size-4 shrink-0 transition-transform duration-200',
                            isOpen && 'rotate-180',
                        )}
                    />
                </SidebarItem>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            height: { duration: 0.25, ease: 'easeInOut' },
                            opacity: { duration: 0.15 },
                        }}
                        style={{ overflow: 'hidden' }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SidebarSeparator({ className }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'border-t border-dashed border-sidebar-border',
                className,
            )}
        />
    );
}

export {
    Sidebar,
    SidebarHeader,
    SidebarBody,
    SidebarFooter,
    SidebarSection,
    SidebarItem,
    SidebarGroup,
    SidebarSeparator,
};

export type { SidebarSectionProps, SidebarItemProps, SidebarGroupProps };
