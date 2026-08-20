"use client";

import { DateRangeSelection } from "@/components/DateRangeSelection";
import { relatedTransactionsRangeAtom } from "@/store/transactionStore";
import { useAtom } from "jotai";

export const RelatedTransactionsDateSelection = () => {
  const [range, setRange] = useAtom(relatedTransactionsRangeAtom);

  return <DateRangeSelection onRangeChange={setRange} range={range} />;
};
