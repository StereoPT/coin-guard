import { BreadcrumbShell } from "@/components/BreadcrumbShell";
import { buildBreadcrumbTrail } from "@/lib/breadcrumbs";

type BreadcrumbSlotProps = {
  params: Promise<{ all: string[] }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { all } = await params;

  const trail = buildBreadcrumbTrail(all);
  const currentPage = trail.pop();

  if (!currentPage) return null;

  return <BreadcrumbShell currentPage={currentPage.label} trail={trail} />;
};

export default BreadcrumbSlot;
