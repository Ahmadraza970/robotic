'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  fill?: string;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className,
  size = 200,
  fill,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const el = containerRef.current?.parentElement;
      if (!el) return;
      const { left, top } = el.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', () => setIsHovered(true));
    el.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', () => setIsHovered(true));
      el.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: fill
          ? `radial-gradient(circle at center, ${fill}, transparent 80%)`
          : `radial-gradient(circle at center, var(--tw-gradient-stops), transparent 80%)`,
        ...(fill ? {} : {}),
      }}
    />
  );
}
