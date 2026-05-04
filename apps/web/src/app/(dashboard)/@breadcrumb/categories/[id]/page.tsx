import { GetCategory } from "@/actions/categories/getCategory";
import { BreadcrumbShell } from "@/components/BreadcrumbShell";
import { ROUTES } from "@/constants/routes";
import { notFound } from "next/navigation";

type BreadcrumbSlotProps = {
  params: Promise<{ id: string }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { id: categoryId } = await params;
  const category = await GetCategory(categoryId);

  if (!category) notFound();

  return (
    <BreadcrumbShell
      currentPage={category.name}
      trail={[{ label: "Categories", href: ROUTES.categories }]}
    />
  );
};

export default BreadcrumbSlot;
