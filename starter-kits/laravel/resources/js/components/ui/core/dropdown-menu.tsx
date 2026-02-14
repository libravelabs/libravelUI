import { Check, ChevronRight, CircleSmall } from 'lucide-react';
import * as React from 'react';
import {
    Menu,
    MenuTrigger,
    MenuSection,
    MenuItem,
    Separator,
    Header,
    SubmenuTrigger,
    type MenuProps,
    Collection,
} from 'react-aria-components';
import { DialogDescription, DialogTrigger } from '@/components/ui/core/dialog';
import { Label } from '@/components/ui/core/field';
import {
    PopoverContent,
    type PopoverContentProps,
} from '@/components/ui/core/popover';
import { Shortcut, type ShortcutProps } from '@/components/ui/core/shortcut';
import { cn } from '@/lib/utils';

function DropdownMenu({ ...props }: React.ComponentProps<typeof MenuTrigger>) {
    return <MenuTrigger {...props} />;
}

function DropdownMenuPortal({
    ...props
}: React.ComponentProps<typeof PopoverContent>) {
    return <PopoverContent {...props} />;
}

interface DropdownMenuContentProps<T>
    extends MenuProps<T>, Pick<PopoverContentProps, 'placement'> {
    className?: string;
    popover?: PopoverContentProps;
    withArrow?: PopoverContentProps['withArrow'];
}

function DropdownMenuContent<T extends object>({
    className,
    popover,
    withArrow,
    ...props
}: DropdownMenuContentProps<T>) {
    return (
        <DropdownMenuPortal withArrow={withArrow} className="p-0" {...popover}>
            <Menu
                data-slot="dropdown-menu-content"
                className={cn(
                    'z-50 grid max-h-140 min-w-64 gap-1 overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
                    className,
                )}
                {...props}
            >
                {props.children}
            </Menu>
        </DropdownMenuPortal>
    );
}

function DropdownMenuGroup({
    title,
    children,
    ...props
}: React.ComponentProps<typeof MenuSection> & {
    title?: string;
}) {
    return (
        <MenuSection data-slot="dropdown-menu-group" {...props}>
            {title && (
                <Header className="col-span-full px-2 py-2 text-sm/6 font-medium text-muted-foreground/70 sm:py-1.5 sm:text-xs/5">
                    {title}
                </Header>
            )}
            <Collection>{children}</Collection>
        </MenuSection>
    );
}

interface DropdownMenuItemProps extends React.ComponentProps<typeof MenuItem> {
    inset?: boolean;
    tone?: 'default' | 'destructive';
    href?: string;
}

function DropdownMenuItem({
    className,
    inset,
    tone = 'default',
    children,
    ...props
}: DropdownMenuItemProps) {
    const textValue =
        props.textValue ||
        (typeof children === 'string' ? children : undefined);

    return (
        <MenuItem
            data-slot="dropdown-menu-item"
            textValue={textValue}
            className={({ isDisabled, isSelected }) =>
                cn(
                    'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
                    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
                    'transition-all ease-linear hover:ps-3',
                    isDisabled && 'pointer-events-none opacity-50',
                    isSelected && "[&_svg:not([data-slot='indicator'])]:hidden",
                    tone === 'destructive'
                        ? 'text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20 [&_svg]:text-destructive!'
                        : 'focus:bg-accent focus:text-accent-foreground',
                    inset && 'ps-8 hover:ps-9',
                    className,
                )
            }
            {...props}
        >
            {(values) => (
                <>
                    {values.isSelected && (
                        <>
                            {values.selectionMode === 'single' && (
                                <CircleSmall
                                    className="size-3 fill-foreground"
                                    data-slot="indicator"
                                />
                            )}
                            {values.selectionMode === 'multiple' && (
                                <Check
                                    className="size-4"
                                    data-slot="indicator"
                                />
                            )}
                        </>
                    )}

                    {typeof children === 'function'
                        ? children(values)
                        : children}

                    {values.hasSubmenu && (
                        <ChevronRight data-slot="chevron" className="ms-auto" />
                    )}
                </>
            )}
        </MenuItem>
    );
}

function DropdownMenuLabel({
    className,
    inset,
    ...props
}: React.ComponentProps<typeof Label> & {
    inset?: boolean;
}) {
    return (
        <Label
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn('text-sm font-medium data-inset:ps-8', className)}
            {...props}
        />
    );
}

function DropdownMenuSeparator({
    className,
    ...props
}: React.ComponentProps<typeof Separator>) {
    return (
        <Separator
            data-slot="dropdown-menu-separator"
            className={cn(
                '-mx-1 my-1 h-px w-full shrink-0 bg-border',
                className,
            )}
            {...props}
        />
    );
}

function DropdownMenuHeader({
    className,
    separator = false,
    ...props
}: React.ComponentProps<typeof Header> & {
    separator?: boolean;
}) {
    return (
        <Header
            className={cn(
                'col-span-full px-2.5 py-2 text-base font-semibold sm:text-sm',
                separator && '-mx-1 mb-1 border-b sm:px-3 sm:pb-2.5',
                className,
            )}
            {...props}
        />
    );
}

function DropdownMenuShortcut({ className, ...props }: ShortcutProps) {
    return (
        <Shortcut
            className={cn(
                'ms-auto text-xs tracking-widest text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

function DropdownMenuDescription({
    ...props
}: React.ComponentProps<typeof DialogDescription>) {
    return (
        <DialogDescription
            className={cn('text-[13px]', props.className)}
            {...props}
        />
    );
}

function DropdownMenuSub({
    delay = 0,
    ...props
}: React.ComponentProps<typeof SubmenuTrigger>) {
    return (
        <SubmenuTrigger {...props} delay={delay}>
            {props.children}
        </SubmenuTrigger>
    );
}

const DropdownMenuTrigger = DialogTrigger;
const DropdownMenuSubTrigger = DropdownMenuItem;
const DropdownMenuSubContent = DropdownMenuContent;

export {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuHeader,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuDescription,
};

export type { DropdownMenuItemProps };
