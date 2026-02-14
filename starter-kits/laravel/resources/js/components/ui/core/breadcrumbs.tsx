import { Link } from '@inertiajs/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { createContext, useContext } from 'react';
import {
    Breadcrumbs as BreadcrumbsPrimitive,
    Breadcrumb as BreadcrumbPrimitive,
} from 'react-aria-components';
import type {
    BreadcrumbsProps as BreadcrumbsPrimitiveProps,
    BreadcrumbProps as BreadcrumbPrimitiveProps,
} from 'react-aria-components';
import { cn } from '@/lib/utils';

type BreadcrumbsContextProps = {
    separator?: React.ReactNode;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextProps | undefined>(
    undefined,
);

function useBreadcrumbsContext() {
    const context = useContext(BreadcrumbsContext);
    if (!context) {
        throw new Error(
            'useBreadcrumbsContext must be used within BreadcrumbsProvider',
        );
    }
    return context;
}

const breadcrumbListVariants = cva(
    'flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground',
    {
        variants: {
            size: {
                sm: 'gap-1 text-xs',
                default: 'gap-1.5 text-sm',
                lg: 'gap-2 text-base',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
);

const breadcrumbItemVariants = cva(
    'flex items-center gap-1 rounded-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
    {
        variants: {
            emphasis: {
                normal: 'text-muted-foreground hover:text-foreground',
                current: 'font-medium text-foreground',
            },
        },
        defaultVariants: {
            emphasis: 'normal',
        },
    },
);

type BreadcrumbProps<T> = BreadcrumbsPrimitiveProps<T> &
    VariantProps<typeof breadcrumbListVariants> & {
        separator?: BreadcrumbsContextProps['separator'];
    };

function Breadcrumb<T extends object>({
    size,
    separator = <ChevronRight />,
    className,
    children,
    ...props
}: BreadcrumbProps<T>) {
    return (
        <BreadcrumbsContext.Provider value={{ separator }}>
            <BreadcrumbsPrimitive
                className={cn(breadcrumbListVariants({ size }), className)}
                {...props}
            >
                {children}
            </BreadcrumbsPrimitive>
        </BreadcrumbsContext.Provider>
    );
}

function BreadcrumbItem({
    className,
    href,
    children,
    emphasis,
    ...props
}: BreadcrumbPrimitiveProps &
    Omit<React.ComponentProps<typeof Link>, 'ref'> &
    VariantProps<typeof breadcrumbItemVariants>) {
    const { separator } = useBreadcrumbsContext();

    return (
        <BreadcrumbPrimitive
            className={cn(breadcrumbItemVariants({ emphasis }), className)}
            {...props}
        >
            {({ isCurrent }) => (
                <>
                    <Link
                        href={href}
                        className="flex items-center gap-1 [&_svg:not([class*='size-'])]:size-4"
                    >
                        {children}
                    </Link>
                    {!isCurrent && separator !== false && (
                        <BreadcrumbSeparator separator={separator} />
                    )}
                </>
            )}
        </BreadcrumbPrimitive>
    );
}

function BreadcrumbSeparator({
    separator,
}: React.ComponentProps<'span'> & {
    separator?: BreadcrumbsContextProps['separator'];
}) {
    const shouldRenderDefault =
        separator === true || separator === undefined || separator === null;

    return (
        <span className="[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='size-'])]:shrink-0 [&_svg:not([class*='size-'])]:text-muted-foreground">
            {shouldRenderDefault ? <ChevronRight /> : separator}
        </span>
    );
}

export type { BreadcrumbProps };
export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator };
