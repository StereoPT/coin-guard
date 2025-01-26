import { LayoutDashboard, Table, Blocks, LucideIcon } from 'lucide-react';

type NavigationItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: Table,
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: Blocks,
  },
];
