import { getMonth, subMonths } from 'date-fns';

export const getLastMonth = () => getMonth(subMonths(new Date(), 1)) + 1;
