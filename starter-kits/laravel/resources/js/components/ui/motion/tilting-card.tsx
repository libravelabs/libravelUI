import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltingCardAnimation {
    stiffness?: number;
    damping?: number;
    mass?: number;
    restDelta?: number;
}

interface TiltingCardProps extends React.ComponentProps<'div'> {
    intensity?: number;
    perspective?: number;
    animation?: TiltingCardAnimation;
}

function TiltingCard({
    children,
    intensity = 25,
    perspective = 800,
    className,
    animation = {
        stiffness: 150,
        damping: 20,
        mass: 0.5,
        restDelta: 0.01,
    },
}: TiltingCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, animation);
    const springY = useSpring(y, animation);

    const rotateX = useTransform(
        springY,
        [-300, 300],
        [intensity / 2, -intensity / 2],
    );
    const rotateY = useTransform(
        springX,
        [-300, 300],
        [-intensity / 2, intensity / 2],
    );

    const innerRotateX = useTransform(
        springY,
        [-300, 300],
        [intensity, -intensity],
    );
    const innerRotateY = useTransform(
        springX,
        [-300, 300],
        [-intensity, intensity],
    );

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        x.set(offsetX);
        y.set(offsetY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="flex items-center justify-center"
            style={{ perspective }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div className={className} style={{ rotateX, rotateY }}>
                <motion.div
                    className="transform-style-preserve-3d"
                    style={{ rotateX: innerRotateX, rotateY: innerRotateY }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export { TiltingCard, type TiltingCardProps, type TiltingCardAnimation };
