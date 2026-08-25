import { GetBankAccounts } from "@/actions/bankAccounts/GetBankAccounts";
import { KEYS } from "@/constants/queryKeys";
import { queryOptions } from "@tanstack/react-query";

export const getBankAccountsOptions = () => {
  return queryOptions({
    queryKey: KEYS.bankAccounts,
    queryFn: () => GetBankAccounts(),
    throwOnError: true,
  });
};
