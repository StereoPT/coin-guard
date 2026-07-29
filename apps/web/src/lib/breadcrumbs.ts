export type BreadcrumbTrailItem = {
  label: string;
  href?: string;
};

type BreadcrumbTrail = BreadcrumbTrailItem[];

const BREADCRUMB_LABELS: Record<string, string> = {
  etl: "ETL",
};

const CONTAINER_ROUTES = new Set(["etl", "analytics"]);

const formatBreadcrumbLabel = (segment: string) => {
  if (BREADCRUMB_LABELS[segment]) {
    return BREADCRUMB_LABELS[segment];
  }

  return segment
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const buildBreadcrumbTrail = (segments: string[]): BreadcrumbTrail => {
  const trail: BreadcrumbTrail = [];
  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    const label = formatBreadcrumbLabel(segment);
    if (!label) continue;

    if (CONTAINER_ROUTES.has(segment)) {
      trail.push({ label });
    } else {
      trail.push({ label, href: currentPath });
    }
  }

  return trail;
};
