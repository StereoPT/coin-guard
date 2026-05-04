import { ROUTES } from "@/constants/routes";
import type { BreadcrumbTrailItem } from "@/lib/breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@coin-guard/ui";

type BreadcrumbShellProps = {
  trail: BreadcrumbTrailItem[];
  currentPage: string;
};

export const BreadcrumbShell = ({
  trail,
  currentPage,
}: BreadcrumbShellProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={ROUTES.home}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {trail.map(({ label, href }, i) => (
          <span className="contents" key={`${href ?? label}-${i}`}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {href ? (
                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
              ) : (
                label
              )}
            </BreadcrumbItem>
          </span>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
