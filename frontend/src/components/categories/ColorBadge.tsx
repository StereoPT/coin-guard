import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type ColorBadgeProps = {
  color: 'cyan';
  className?: string;
};

export const ColorBadge = ({ className, color }: ColorBadgeProps) => {
  return (
    <Badge className={cn(className, 'capitalize')} variant={color}>
      {color}
    </Badge>
  );
};
