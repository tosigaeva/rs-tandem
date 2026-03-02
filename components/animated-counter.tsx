'use client';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

type AnimatedCounterProperties = {
  startValue: number;
  endValue: number;
  animationDuration: number;
};

export default function AnimatedCounter({ startValue, endValue, animationDuration }: AnimatedCounterProperties) {
  const count = useMotionValue(startValue);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, endValue, { duration: animationDuration });
    return () => controls.stop();
  }, [animationDuration, count, endValue]);

  return <motion.span>{rounded}</motion.span>;
}
