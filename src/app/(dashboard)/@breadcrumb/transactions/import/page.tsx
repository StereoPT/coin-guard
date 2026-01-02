import { ROUTES } from "@/constants/routes";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";

const BreadcrumbSlot = async () => {
  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href={ROUTES.home}>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={ROUTES.transactions}>Transactions</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">Import</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
};

export default BreadcrumbSlot;
