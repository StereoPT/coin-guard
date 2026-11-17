import { GetTransaction } from "@/actions/transactions/GetTransaction";
import { BreadcrumbShell } from "@/components/BreadcrumbShell";
import { ROUTES } from "@/constants/routes";

type BreadcrumbSlotProps = {
  params: Promise<{ id: string }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { id: transactionId } = await params;
  const transaction = await GetTransaction(transactionId).catch(() => null);

  return (
    <BreadcrumbShell
      currentPage={transaction?.description ?? "Not found"}
      trail={[{ label: "Transactions", href: ROUTES.transactions }]}
    />
  );
};

export default BreadcrumbSlot;
