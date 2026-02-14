import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

type HighlightedTextProps = {
    children: React.ReactNode;
    className?: string;
};

function HighlightedText({ children, className }: HighlightedTextProps) {
    return (
        <motion.span
            initial={{ backgroundSize: '0% 100%' }}
            animate={{ backgroundSize: '100% 100%' }}
            transition={{ duration: 2, ease: 'linear', delay: 0.5 }}
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center',
                display: 'inline',
            }}
            className={cn(
                `relative inline-block rounded-lg bg-gradient-to-r from-chart-2 via-chart-3 to-chart-4 px-1 pb-1`,
                className,
            )}
        >
            {children}
        </motion.span>
    );
}

export { HighlightedText, type HighlightedTextProps };
