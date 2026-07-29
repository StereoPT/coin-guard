import { getBankAccountsOptions } from "@/lib/queryOptions/bankAccounts";
import { useQuery } from "@tanstack/react-query";

export const useGetBankAccounts = () => {
  return useQuery(getBankAccountsOptions());
};
