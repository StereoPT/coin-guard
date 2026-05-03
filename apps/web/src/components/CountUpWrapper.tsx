"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

type CountUpWrapperProps = {
  value: number;
};

export const CountUpWrapper = ({ value }: CountUpWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "-";

  return (
    <CountUp decimals={2} duration={1} end={value} preserveValue suffix="€" />
  );
};
