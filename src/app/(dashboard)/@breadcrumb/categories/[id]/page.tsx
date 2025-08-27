import { GetCategory } from "@/actions/categories/getCategory";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/constants/routes";

type BreadcrumbSlotProps = {
  params: Promise<{ id: string }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { id } = await params;
  const category = await GetCategory(id);

  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href={ROUTES.home}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={ROUTES.categories}>Categories</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">{category?.name}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
};

export default BreadcrumbSlot;
