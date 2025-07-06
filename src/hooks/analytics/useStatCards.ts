import { GetStats } from '@/actions/analytics/getStats';
import { useQuery } from '@tanstack/react-query';

export const useStatCards = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => GetStats(),
  });
};
