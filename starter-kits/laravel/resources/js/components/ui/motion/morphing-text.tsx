import { cn } from '@/lib/utils';
import { AnimatePresence, motion, Transition, Variants } from 'motion/react';
import { useMemo, useId } from 'react';

type MorphingTextProps = {
    children: string;
    as?: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
    variants?: Variants;
    transition?: Transition;
};

function MorphingText({
    children,
    as: Component = 'p',
    className,
    style,
    variants,
    transition,
}: MorphingTextProps) {
    const id = useId();

    const texts = useMemo(() => {
        const textCounts: Record<string, number> = {};

        return children.split('').map((text) => {
            const lowText = text.toLowerCase();
            textCounts[lowText] = (textCounts[lowText] || 0) + 1;

            return {
                id: `${id}-${lowText}${textCounts[lowText]}`,
                label: text === ' ' ? '\u00A0' : text,
            };
        });
    }, [children, id]);

    const defaultVariants: Variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const defaultTransition: Transition = {
        type: 'spring',
        stiffness: 280,
        damping: 18,
        mass: 0.3,
    };

    return (
        <Component
            className={cn(className)}
            aria-label={children}
            style={style}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {texts.map((text) => (
                    <motion.span
                        key={text.id}
                        layoutId={text.id}
                        className="inline-block"
                        aria-hidden="true"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants || defaultVariants}
                        transition={transition || defaultTransition}
                    >
                        {text.label}
                    </motion.span>
                ))}
            </AnimatePresence>
        </Component>
    );
}

export { MorphingText, type MorphingTextProps };
