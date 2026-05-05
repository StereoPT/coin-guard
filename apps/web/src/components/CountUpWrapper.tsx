"use client";

import { CountType } from "@/types/dashboard";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

type CountUpWrapperProps = {
  value: number;
  type: CountType;
};

const MoneyCountUp = ({ value }: Pick<CountUpWrapperProps, "value">) => {
  return (
    <CountUp decimals={2} duration={1} end={value} preserveValue suffix="€" />
  );
};

const NumberCountUp = ({ value }: Pick<CountUpWrapperProps, "value">) => {
  return <CountUp decimals={0} duration={1} end={value} preserveValue />;
};

export const CountUpWrapper = ({ value, type }: CountUpWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "-";

  switch (type) {
    case CountType.MONEY:
      return <MoneyCountUp value={value} />;
    case CountType.NUMBER:
      return <NumberCountUp value={value} />;
    default:
      return "-";
  }
};
