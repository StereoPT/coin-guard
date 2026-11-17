import { GetCategory } from "@/actions/categories/GetCategory";
import { BreadcrumbShell } from "@/components/BreadcrumbShell";
import { ROUTES } from "@/constants/routes";

type BreadcrumbSlotProps = {
  params: Promise<{ id: string }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { id: categoryId } = await params;
  const category = await GetCategory(categoryId).catch(() => null);

  return (
    <BreadcrumbShell
      currentPage={category?.name ?? "Not found"}
      trail={[{ label: "Categories", href: ROUTES.categories }]}
    />
  );
};

export default BreadcrumbSlot;
