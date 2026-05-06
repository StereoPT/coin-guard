import { GetTransaction } from "@/actions/transactions/GetTransaction";
import { BreadcrumbShell } from "@/components/BreadcrumbShell";
import { ROUTES } from "@/constants/routes";
import { notFound } from "next/navigation";

type BreadcrumbSlotProps = {
  params: Promise<{ id: string }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { id: transactionId } = await params;
  const transaction = await GetTransaction(transactionId);

  if (!transaction) notFound();

  return (
    <BreadcrumbShell
      currentPage={transaction.transaction.description}
      trail={[{ label: "Transactions", href: ROUTES.transactions }]}
    />
  );
};

export default BreadcrumbSlot;
