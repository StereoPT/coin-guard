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
      <BreadcrumbItem>Analytics</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Monthly</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
};

export default BreadcrumbSlot;
