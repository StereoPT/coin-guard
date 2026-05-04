import { ROUTES } from "@/constants/routes";
import { buildBreadcrumbTrail } from "@/lib/breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@coin-guard/ui";
import type { ReactElement } from "react";
import React from "react";

type BreadcrumbSlotProps = {
  params: Promise<{ all: string[] }>;
};

const BreadcrumbSlot = async ({ params }: BreadcrumbSlotProps) => {
  const { all } = await params;

  const trail = buildBreadcrumbTrail(all);

  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = <></>;

  for (let i = 0; i < trail.length; i++) {
    const item = trail[i];
    if (!item) continue;

    const { label, href } = item;

    if (i === trail.length - 1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={`${href ?? label}-${i}`}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {href ? (
              <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            ) : (
              label
            )}
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
        {trail.length > 0 && <BreadcrumbSeparator />}
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbSlot;
