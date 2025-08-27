import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/constants/routes";
import React from "react";
import type { ReactElement } from "react";

type BreadcrumbSlotProps = {
  params: Promise<{ all: string[] }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { all } = await params;

  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  for (let i = 0; i < all.length; i++) {
    const route = all[i];
    const href = `/${all.at(0)}/${route}`;

    if (i === all.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{route}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize" href={href}>
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>,
      );
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={ROUTES.home}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbSlot;
