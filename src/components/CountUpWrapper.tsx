'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

type CountUpWrapperProps = {
  value: number;
};

export const CountUpWrapper = ({ value }: CountUpWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return '-';

  return (
    <CountUp duration={1} preserveValue end={value} decimals={2} suffix="€" />
  );
};
