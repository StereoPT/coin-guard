import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { eachMonthOfInterval, endOfYear, format, startOfYear } from 'date-fns';

type MonthDropdownProps = {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
};

export const MonthDropdown = ({
  selectedMonth,
  setSelectedMonth,
}: MonthDropdownProps) => {
  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  return (
    <Select
      value={selectedMonth.toString()}
      onValueChange={(value) => setSelectedMonth(Number(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => {
          return (
            <SelectItem
              key={month.getMonth() + 1}
              value={(month.getMonth() + 1).toString()}>
              {format(month, 'MMMM')}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
