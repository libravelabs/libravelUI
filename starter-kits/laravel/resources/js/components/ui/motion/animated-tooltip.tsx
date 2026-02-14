import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

type AnimationStyle =
    | 'default'
    | 'roll'
    | 'flip'
    | 'wobble'
    | 'orbit'
    | 'punch'
    | 'elastic'
    | 'zoom'
    | 'swing';

interface AnimatedTooltipProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    showArrow?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    offset?: number;
    animationStyle?: AnimationStyle;
}

function AnimatedTooltip({
    trigger,
    children,
    position = 'top',
    delay = 500,
    showArrow = true,
    open: controlledOpen,
    onOpenChange,
    offset = 8,
    animationStyle = 'default',
}: AnimatedTooltipProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            handleOpenChange(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        handleOpenChange(false);
    };

    const handleFocus = () => {
        handleOpenChange(true);
    };

    const handleBlur = () => {
        handleOpenChange(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const getAnimationConfig = () => {
        const animations = {
            default: {
                top: {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 8 },
                },
                bottom: {
                    initial: { opacity: 0, y: -8 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -8 },
                },
                left: {
                    initial: { opacity: 0, x: 8 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 8 },
                },
                right: {
                    initial: { opacity: 0, x: -8 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -8 },
                },
            },

            roll: {
                top: {
                    initial: { opacity: 0, y: 12, rotate: -15 },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    exit: { opacity: 0, y: 8, rotate: 10 },
                },
                bottom: {
                    initial: { opacity: 0, y: -12, rotate: 15 },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    exit: { opacity: 0, y: -8, rotate: -10 },
                },
                left: {
                    initial: { opacity: 0, x: 12, rotate: 15 },
                    animate: { opacity: 1, x: 0, rotate: 0 },
                    exit: { opacity: 0, x: 8, rotate: -10 },
                },
                right: {
                    initial: { opacity: 0, x: -12, rotate: -15 },
                    animate: { opacity: 1, x: 0, rotate: 0 },
                    exit: { opacity: 0, x: -8, rotate: 10 },
                },
            },

            flip: {
                top: {
                    initial: { opacity: 0, rotateX: -90, y: 10 },
                    animate: { opacity: 1, rotateX: 0, y: 0 },
                    exit: { opacity: 0, rotateX: 90, y: 10 },
                },
                bottom: {
                    initial: { opacity: 0, rotateX: 90, y: -10 },
                    animate: { opacity: 1, rotateX: 0, y: 0 },
                    exit: { opacity: 0, rotateX: -90, y: -10 },
                },
                left: {
                    initial: { opacity: 0, rotateY: -90, x: 10 },
                    animate: { opacity: 1, rotateY: 0, x: 0 },
                    exit: { opacity: 0, rotateY: 90, x: 10 },
                },
                right: {
                    initial: { opacity: 0, rotateY: 90, x: -10 },
                    animate: { opacity: 1, rotateY: 0, x: 0 },
                    exit: { opacity: 0, rotateY: -90, x: -10 },
                },
            },

            wobble: {
                top: {
                    initial: { opacity: 0, y: 15, rotate: -8, scale: 0.8 },
                    animate: {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                    },
                    exit: { opacity: 0, y: 10, rotate: 5, scale: 0.9 },
                },
                bottom: {
                    initial: { opacity: 0, y: -15, rotate: 8, scale: 0.8 },
                    animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
                    exit: { opacity: 0, y: -10, rotate: -5, scale: 0.9 },
                },
                left: {
                    initial: { opacity: 0, x: 15, rotate: 8, scale: 0.8 },
                    animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
                    exit: { opacity: 0, x: 10, rotate: -5, scale: 0.9 },
                },
                right: {
                    initial: { opacity: 0, x: -15, rotate: -8, scale: 0.8 },
                    animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
                    exit: { opacity: 0, x: -10, rotate: 5, scale: 0.9 },
                },
            },

            orbit: {
                top: {
                    initial: { opacity: 0, y: 20, x: -15, rotate: -20 },
                    animate: { opacity: 1, y: 0, x: 0, rotate: 0 },
                    exit: { opacity: 0, y: 15, x: 10, rotate: 15 },
                },
                bottom: {
                    initial: { opacity: 0, y: -20, x: 15, rotate: 20 },
                    animate: { opacity: 1, y: 0, x: 0, rotate: 0 },
                    exit: { opacity: 0, y: -15, x: -10, rotate: -15 },
                },
                left: {
                    initial: { opacity: 0, x: 20, y: -15, rotate: 20 },
                    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
                    exit: { opacity: 0, x: 15, y: 10, rotate: -15 },
                },
                right: {
                    initial: { opacity: 0, x: -20, y: 15, rotate: -20 },
                    animate: { opacity: 1, x: 0, y: 0, rotate: 0 },
                    exit: { opacity: 0, x: -15, y: -10, rotate: 15 },
                },
            },

            punch: {
                top: {
                    initial: { opacity: 0, y: 20, scale: 0.5 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: 10, scale: 0.8 },
                },
                bottom: {
                    initial: { opacity: 0, y: -20, scale: 0.5 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: -10, scale: 0.8 },
                },
                left: {
                    initial: { opacity: 0, x: 20, scale: 0.5 },
                    animate: { opacity: 1, x: 0, scale: 1 },
                    exit: { opacity: 0, x: 10, scale: 0.8 },
                },
                right: {
                    initial: { opacity: 0, x: -20, scale: 0.5 },
                    animate: { opacity: 1, x: 0, scale: 1 },
                    exit: { opacity: 0, x: -10, scale: 0.8 },
                },
            },

            elastic: {
                top: {
                    initial: { opacity: 0, y: 10, scaleY: 0.5, scaleX: 1.2 },
                    animate: { opacity: 1, y: 0, scaleY: 1, scaleX: 1 },
                    exit: { opacity: 0, y: 5, scaleY: 0.8, scaleX: 1.1 },
                },
                bottom: {
                    initial: { opacity: 0, y: -10, scaleY: 0.5, scaleX: 1.2 },
                    animate: { opacity: 1, y: 0, scaleY: 1, scaleX: 1 },
                    exit: { opacity: 0, y: -5, scaleY: 0.8, scaleX: 1.1 },
                },
                left: {
                    initial: { opacity: 0, x: 10, scaleX: 0.5, scaleY: 1.2 },
                    animate: { opacity: 1, x: 0, scaleX: 1, scaleY: 1 },
                    exit: { opacity: 0, x: 5, scaleX: 0.8, scaleY: 1.1 },
                },
                right: {
                    initial: { opacity: 0, x: -10, scaleX: 0.5, scaleY: 1.2 },
                    animate: { opacity: 1, x: 0, scaleX: 1, scaleY: 1 },
                    exit: { opacity: 0, x: -5, scaleX: 0.8, scaleY: 1.1 },
                },
            },

            zoom: {
                top: {
                    initial: { opacity: 0, scale: 0.3, y: 5 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.5, y: 5 },
                },
                bottom: {
                    initial: { opacity: 0, scale: 0.3, y: -5 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.5, y: -5 },
                },
                left: {
                    initial: { opacity: 0, scale: 0.3, x: 5 },
                    animate: { opacity: 1, scale: 1, x: 0 },
                    exit: { opacity: 0, scale: 0.5, x: 5 },
                },
                right: {
                    initial: { opacity: 0, scale: 0.3, x: -5 },
                    animate: { opacity: 1, scale: 1, x: 0 },
                    exit: { opacity: 0, scale: 0.5, x: -5 },
                },
            },

            swing: {
                top: {
                    initial: {
                        opacity: 0,
                        y: 10,
                        rotate: -25,
                        transformOrigin: 'top center',
                    },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    exit: { opacity: 0, y: 5, rotate: 15 },
                },
                bottom: {
                    initial: {
                        opacity: 0,
                        y: -10,
                        rotate: 25,
                        transformOrigin: 'bottom center',
                    },
                    animate: { opacity: 1, y: 0, rotate: 0 },
                    exit: { opacity: 0, y: -5, rotate: -15 },
                },
                left: {
                    initial: {
                        opacity: 0,
                        x: 10,
                        rotate: 25,
                        transformOrigin: 'left center',
                    },
                    animate: { opacity: 1, x: 0, rotate: 0 },
                    exit: { opacity: 0, x: 5, rotate: -15 },
                },
                right: {
                    initial: {
                        opacity: 0,
                        x: -10,
                        rotate: -25,
                        transformOrigin: 'right center',
                    },
                    animate: { opacity: 1, x: 0, rotate: 0 },
                    exit: { opacity: 0, x: -5, rotate: 15 },
                },
            },
        };

        return animations[animationStyle][position];
    };

    const getTransition = () => {
        const transitions = {
            default: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.8,
            },
            roll: {
                type: 'spring',
                stiffness: 400,
                damping: 25,
                mass: 0.9,
            },
            flip: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                mass: 1,
            },
            wobble: {
                type: 'spring',
                stiffness: 250,
                damping: 15,
                mass: 0.8,
            },
            orbit: {
                type: 'spring',
                stiffness: 350,
                damping: 25,
                mass: 1.2,
            },
            punch: {
                type: 'spring',
                stiffness: 600,
                damping: 35,
                mass: 0.6,
            },
            elastic: {
                type: 'spring',
                stiffness: 200,
                damping: 12,
                mass: 0.9,
            },
            zoom: {
                type: 'spring',
                stiffness: 450,
                damping: 28,
                mass: 0.7,
            },
            swing: {
                type: 'spring',
                stiffness: 280,
                damping: 18,
                mass: 1.1,
            },
        };

        return transitions[animationStyle];
    };

    const getTooltipPosition = () => {
        const positions = {
            top: `bottom-full left-1/2 -translate-x-1/2`,
            bottom: `top-full left-1/2 -translate-x-1/2`,
            left: `right-full top-1/2 -translate-y-1/2`,
            right: `left-full top-1/2 -translate-y-1/2`,
        };
        return positions[position];
    };

    const getArrowPosition = () => {
        const arrows = {
            top: 'top-full left-1/2 -translate-x-1/2 -mt-[1px]',
            bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-[1px]',
            left: 'left-full top-1/2 -translate-y-1/2 -ml-[1px]',
            right: 'right-full top-1/2 -translate-y-1/2 -mr-[1px]',
        };
        return arrows[position];
    };

    const getArrowRotation = () => {
        const rotations = {
            top: 'rotate-180',
            bottom: 'rotate-0',
            left: 'rotate-90',
            right: '-rotate-90',
        };
        return rotations[position];
    };

    const animationConfig = getAnimationConfig();

    return (
        <div className="relative inline-block">
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={0}
                className="inline-block cursor-pointer"
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={animationConfig.initial}
                        animate={animationConfig.animate}
                        exit={animationConfig.exit}
                        transition={getTransition()}
                        className={cn(
                            'pointer-events-none absolute z-99999',
                            'bg-popover text-foreground',
                            'rounded-md border shadow-md',
                            'px-3 py-2 text-sm',
                            'whitespace-nowrap',
                            getTooltipPosition(),
                        )}
                        style={{
                            [position === 'top' || position === 'bottom'
                                ? 'marginBottom'
                                : 'marginRight']:
                                position === 'top'
                                    ? `${offset}px`
                                    : position === 'bottom'
                                      ? undefined
                                      : position === 'left'
                                        ? `${offset}px`
                                        : undefined,
                            [position === 'top' || position === 'bottom'
                                ? 'marginTop'
                                : 'marginLeft']:
                                position === 'bottom'
                                    ? `${offset}px`
                                    : position === 'top'
                                      ? undefined
                                      : position === 'right'
                                        ? `${offset}px`
                                        : undefined,
                        }}
                    >
                        {children}

                        {showArrow && (
                            <div className={cn('absolute', getArrowPosition())}>
                                <svg
                                    width={8}
                                    height={8}
                                    viewBox="0 0 8 8"
                                    className={cn(
                                        'fill-popover',
                                        getArrowRotation(),
                                    )}
                                    style={{
                                        filter: 'drop-shadow(0 -1px 1px rgba(0,0,0,0.1))',
                                    }}
                                >
                                    <path d="M 0 8 L 4 0 L 8 8 Z" />
                                </svg>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export { AnimatedTooltip, type AnimatedTooltipProps, type AnimationStyle };
