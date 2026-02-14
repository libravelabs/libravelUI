import React, { useState, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Group,
    Input as InputPrimitive,
    type GroupProps,
    type InputProps as InputPrimitiveProps,
} from 'react-aria-components';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { Loader } from '@/components/ui/core/loader';

const inputVariants = cva(
    [
        'group relative flex w-full min-w-0 items-center overflow-hidden',
        'border bg-transparent px-3 py-1',
        'text-foreground selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground',
        'transition-[color,box-shadow] outline-none',
        'disabled:pointer-events-none disabled:opacity-80',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        '[&>.content]:text-muted-foreground',
        'group-disabled:[&_svg]:opacity-50',
        'transition-all ease-in-out',

        'has-[>_:first-child[data-fullsize-ele]]:ps-0 has-[>_:last-child[data-fullsize-ele]]:pe-0 has-[>_:first-child[data-fullsize-ele]]:has-[>_:last-child[data-fullsize-ele]]:px-0',

        "[&_[data-fullsize-ele]:not([class*='bg-'])]:bg-secondary [&_button[data-fullsize-ele]:not([class*='cursor-'])]:cursor-pointer",
    ],
    {
        variants: {
            tone: {
                default: [
                    'border-2 border-input bg-transparent',
                    'focus-within:border-ring/70 focus-within:ring-4 focus-within:ring-ring/10',
                    'focus:border-ring/70 focus:ring-4 focus:ring-ring/10',
                    'group-invalid:border-destructive',
                    'group-invalid:focus-within:border-destructive',
                    'group-invalid:focus-within:ring-destructive/10',
                    'group-invalid:focus:border-destructive',
                    'group-invalid:focus:ring-destructive/10',
                ],

                destructive: [
                    'border-destructive/50 bg-destructive/5',
                    'focus-within:border-destructive focus-within:ring-4 focus-within:ring-destructive/10',
                    'focus:border-destructive focus:ring-4 focus:ring-destructive/10',
                ],

                ghost: [
                    'border-transparent bg-transparent px-0',
                    'group-invalid:border-destructive',
                    'group-invalid:focus-within:border-destructive',
                    'group-invalid:focus-within:ring-destructive/10',
                    'group-invalid:focus:border-destructive',
                    'group-invalid:focus:ring-destructive/10',
                ],

                line: [
                    'rounded-none border-x-0 border-t-0 border-b',
                    'focus-within:border-b-ring',
                    'focus:border-b-ring',
                    'group-invalid:border-b-destructive',
                    'group-invalid:focus-within:border-b-destructive',
                    'group-invalid:focus:border-b-destructive',
                ],
            },
            size: {
                sm: "h-7 text-sm [&_[data-fullsize-ele]]:p-2 [&_svg:not([class='size-'])]:size-4",
                default:
                    "h-9 text-base text-sm [&_[data-fullsize-ele]]:p-2.5 [&_svg:not([class*='size-'])]:size-4.5",
                lg: "h-11 text-base [&_[data-fullsize-ele]]:p-3 [&_svg:not([class*='size-'])]:size-5",
                xl: "h-13 text-base [&_[data-fullsize-ele]]:p-3.5 [&_svg:not([class*='size-'])]:size-5.5",
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                '2xl': 'rounded-2xl',
                full: 'rounded-full',
            },
        },
        defaultVariants: {
            tone: 'default',
            size: 'default',
            radius: 'md',
        },
    },
);

const inputGroupVariants = cva(
    [
        'group relative flex w-full min-w-0 items-center overflow-hidden',
        'border bg-transparent px-3 py-1',
        'text-foreground selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground',
        'transition-[color,box-shadow] outline-none',
        'disabled:pointer-events-none disabled:opacity-80',
        '[&>:not([data-input])]:flex [&>:not([data-input])]:shrink-0 [&>:not([data-input])]:items-center [&>:not([data-input])]:text-muted-foreground',
        '[&>:not([data-input])>svg]:translate-y-[-0.05em]',

        '[&>[data-input]]:min-w-0 [&>[data-input]]:flex-1 [&>[data-input]]:border-0 [&>[data-input]]:bg-transparent [&>[data-input]]:px-0 [&>[data-input]]:shadow-none [&>[data-input]]:ring-0 [&>[data-input]]:outline-none [&>[data-input]]:focus:ring-0',

        'has-[>[data-textarea]]:items-stretch',
        'has-[>[data-textarea]]:h-auto',
        'has-[>[data-textarea]]:px-0',
        'has-[>[data-textarea]]:py-0',
        '[&>[data-textarea]]:block',
        '[&>[data-textarea]]:self-stretch',
        '[&>[data-textarea]]:mt-0',
        '[&>[data-textarea]]:mb-0',

        'has-[>_:first-child[data-fullsize-ele]]:ps-0 has-[>_:last-child[data-fullsize-ele]]:pe-0 has-[>_:first-child[data-fullsize-ele]]:has-[>_:last-child[data-fullsize-ele]]:px-0',

        '[&>[data-input]]:text-foreground [&>[data-input]]:placeholder:text-muted-foreground',
        "[&_[data-fullsize-ele]:not([class*='bg-'])]:bg-secondary [&_button[data-fullsize-ele]:not([class*='cursor-'])]:cursor-pointer",
    ],
    {
        variants: {
            tone: {
                default: [
                    'border-2 border-input bg-transparent',
                    'focus-within:border-ring/70 focus-within:ring-4 focus-within:ring-ring/10',
                    'focus:border-ring/70 focus:ring-4 focus:ring-ring/10',
                    'group-invalid:border-destructive',
                    'group-invalid:focus-within:border-destructive',
                    'group-invalid:focus-within:ring-destructive/10',
                    'group-invalid:focus:border-destructive',
                    'group-invalid:focus:ring-destructive/10',
                ],

                destructive: [
                    'border-destructive/50 bg-destructive/5',
                    'focus-within:border-destructive focus-within:ring-4 focus-within:ring-destructive/10',
                    'focus:border-destructive focus:ring-4 focus:ring-destructive/10',
                ],

                ghost: [
                    'border-transparent bg-transparent px-0',
                    'group-invalid:border-destructive',
                    'group-invalid:focus-within:border-destructive',
                    'group-invalid:focus-within:ring-destructive/10',
                    'group-invalid:focus:border-destructive',
                    'group-invalid:focus:ring-destructive/10',
                ],

                line: [
                    'rounded-none border-x-0 border-t-0 border-b',
                    'focus-within:border-b-ring',
                    'focus:border-b-ring',
                    'group-invalid:border-b-destructive',
                    'group-invalid:focus-within:border-b-destructive',
                    'group-invalid:focus:border-b-destructive',
                ],
            },

            size: {
                sm: [
                    'h-7 gap-1.5 text-sm',
                    "[&_svg:not([class*='size-'])]:size-4",
                    '[&>:not([data-input])_button]:h-6 [&>:not([data-input])_button]:min-h-6 [&>:not([data-input])_button]:px-2',
                    '[&_[data-fullsize-ele]]:p-2',
                ],
                default: [
                    'h-9 gap-2 text-base text-sm',
                    "[&_svg:not([class*='size-'])]:size-4.5",
                    '[&>:not([data-input])_button]:h-7 [&>:not([data-input])_button]:min-h-7 [&>:not([data-input])_button]:px-2.5',
                    '[&_[data-fullsize-ele]]:p-2.5',
                ],
                lg: [
                    'h-11 gap-2.5 text-base',
                    "[&_svg:not([class*='size-'])]:size-5",
                    '[&>:not([data-input])_button]:h-9 [&>:not([data-input])_button]:min-h-9 [&>:not([data-input])_button]:px-3',
                    '[&_[data-fullsize-ele]]:p-3',
                ],
                xl: [
                    'h-13 gap-3 text-base',
                    "[&_svg:not([class*='size-'])]:size-5.5",
                    '[&>:not([data-input])_button]:h-10 [&>:not([data-input])_button]:min-h-10 [&>:not([data-input])_button]:px-3.5',
                    '[&_[data-fullsize-ele]]:p-3.5',
                ],
            },

            radius: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                '2xl': 'rounded-2xl',
                full: 'rounded-full',
            },
        },
        defaultVariants: {
            tone: 'default',
            size: 'default',
            radius: 'md',
        },
    },
);

/**
 * Props for the Input component.
 */
type InputProps = InputPrimitiveProps &
    VariantProps<typeof inputVariants> & {
        /** Content to display at the start of the input. */
        startContent?: React.ReactNode;
        /** Content to display at the end of the input (e.g., icons, buttons). */
        endContent?: React.ReactNode;
        /** Whether the input is disabled. */
        isDisabled?: boolean;
        /** Whether the input is in a loading state. */
        isLoading?: boolean;
        /** Custom class names for internal elements. */
        classNames?: {
            wrapper?: string;
            input?: string;
            startContent?: string;
            endContent?: string;
        };
        /** Optional custom component to render as the input (e.g., textarea). */
        as?: React.ElementType;
        /** Content or render prop for the input. */
        children?: React.ReactNode | ((args: any) => React.ReactNode);
    };

/**
 * A stylized input component built on React Aria Components.
 * Supports start/end content, password visibility toggle, and loading states.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            tone,
            size,
            radius,
            startContent,
            endContent,
            isDisabled,
            isLoading,
            classNames,
            className,
            type: typeProp,
            as,
            ...props
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = typeProp === 'password';
        const type = isPassword && showPassword ? 'text' : typeProp;

        const Component = as || InputPrimitive;

        const gapClass =
            size === 'sm'
                ? 'gap-1.5'
                : size === 'lg'
                  ? 'gap-2.5'
                  : size === 'xl'
                    ? 'gap-3'
                    : 'gap-2';

        const actualEndContent = isPassword ? (
            <>
                {endContent}
                <div
                    data-fullsize-ele
                    className="content flex items-center bg-secondary/50"
                    onClick={() => setShowPassword(!showPassword)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setShowPassword((v) => !v);
                        }
                    }}
                    aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </div>
            </>
        ) : isLoading ? (
            <>
                {endContent}
                <Loader />
            </>
        ) : (
            endContent
        );

        return (
            <div
                data-input
                className={cn(
                    inputVariants({ tone, size, radius }),
                    gapClass,
                    isPassword && 'px-0 ps-3',
                    classNames?.wrapper,
                    className,
                )}
            >
                {startContent && (
                    <div
                        className={cn(
                            'flex shrink-0 items-center text-muted-foreground',
                            size === 'sm' &&
                                "[&_svg:not([class*='size-'])]:size-4",
                            size === 'default' &&
                                "[&_svg:not([class*='size-'])]:size-4.5",
                            size === 'lg' &&
                                "[&_svg:not([class*='size-'])]:size-5",
                            size === 'xl' &&
                                "[&_svg:not([class*='size-'])]:size-5.5",
                            classNames?.startContent,
                        )}
                    >
                        {startContent}
                    </div>
                )}
                <Component
                    ref={ref}
                    type={type}
                    disabled={isDisabled || isLoading}
                    className={cn(
                        'min-w-0 flex-1 bg-transparent px-0 outline-none placeholder:text-muted-foreground disabled:pointer-events-none',
                        classNames?.input,
                    )}
                    {...props}
                />
                {actualEndContent && (
                    <div
                        className={cn(
                            'flex shrink-0 items-center text-muted-foreground',
                            gapClass,
                            size === 'sm' && '[&>svg]:size-4',
                            size === 'default' && '[&>svg]:size-4.5',
                            size === 'lg' && '[&>svg]:size-5',
                            size === 'xl' && '[&>svg]:size-5.5',
                            classNames?.endContent,
                        )}
                    >
                        {actualEndContent}
                    </div>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';

type InputGroupProps = GroupProps & VariantProps<typeof inputGroupVariants>;

const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
    ({ children, className, size = 'default', radius = 'md' }, ref) => {
        return (
            <Group
                ref={ref}
                className={cn(inputGroupVariants({ size, radius }), className)}
            >
                {children}
            </Group>
        );
    },
);

InputGroup.displayName = 'InputGroup';

export {
    Input,
    InputGroup,
    inputVariants,
    inputGroupVariants,
    type InputProps,
    type InputGroupProps,
};
