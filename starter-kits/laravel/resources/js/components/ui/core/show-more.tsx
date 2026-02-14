import * as React from 'react';
import { Button } from '@/components/ui/core/button';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ShowMoreTextProps = {
    text: string;
    maxLength?: number;
    className?: string;
    classNames?: {
        wrapper?: string | string[];
        text?: string | string[];
        toggle?: string | string[];
    };
    showMoreLabel?: string;
    showLessLabel?: string;
};

function splitTextByWords(text: string, maxLength: number) {
    const words = text.split(' ');
    let visibleText = '';
    let i = 0;

    while (i < words.length) {
        const next = visibleText ? visibleText + ' ' + words[i] : words[i];
        if (next.length > maxLength) break;
        visibleText = next;
        i++;
    }

    const hiddenText = text.slice(visibleText.length);

    return { visibleText, hiddenText };
}

function ShowMoreText({
    text,
    maxLength = 100,
    className,
    classNames,
    showMoreLabel = 'Show More',
    showLessLabel = 'Show Less',
}: ShowMoreTextProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const { visibleText, hiddenText } = React.useMemo(
        () => splitTextByWords(text, maxLength),
        [text, maxLength],
    );

    const handleToggle = () => setIsExpanded((prev) => !prev);

    return (
        <div className={cn('max-w-xl', className, classNames?.wrapper)}>
            <p className={cn(classNames?.text)}>
                {visibleText}
                <AnimatePresence initial={false} mode="wait">
                    {!isExpanded && text.length > visibleText.length && (
                        <motion.span
                            key="ellipsis"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            ...
                        </motion.span>
                    )}

                    {isExpanded && (
                        <motion.span
                            key="expandable-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'inline' }}
                        >
                            {hiddenText}
                        </motion.span>
                    )}
                </AnimatePresence>
            </p>

            {text.length > visibleText.length && (
                <Button
                    onClick={handleToggle}
                    tone="link"
                    className={cn(
                        'mt-1 flex items-center gap-1 !px-0 !py-0',
                        classNames?.toggle,
                    )}
                    aria-expanded={isExpanded}
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                    {isExpanded ? showLessLabel : showMoreLabel}
                </Button>
            )}
        </div>
    );
}

export { ShowMoreText, splitTextByWords, type ShowMoreTextProps };
