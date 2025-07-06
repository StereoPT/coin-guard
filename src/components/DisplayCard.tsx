import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

type DisplayCardProps = {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
};

export const DisplayCard = ({ title, icon, children }: DisplayCardProps) => {
  const Icon = icon;

  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon
          size={120}
          className="text-muted-foreground absolute -bottom-2 -right-2 stroke-primary opacity-5"
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
