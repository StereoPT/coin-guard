"use client";

import { DateRangeSelection } from "@/components/DateRangeSelection";
import { categoryTransactionsRangeAtom } from "@/store/categoryStore";
import { useAtom } from "jotai";

export const CategoryTransactionsDateSelection = () => {
  const [range, setRange] = useAtom(categoryTransactionsRangeAtom);

  return <DateRangeSelection onRangeChange={setRange} range={range} />;
};
