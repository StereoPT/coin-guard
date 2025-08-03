import { GetStats } from '@/actions/analytics/getStats';
import { KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useStatCards = () => {
  return useQuery({
    queryKey: KEYS.analytics,
    queryFn: () => GetStats(),
  });
};
