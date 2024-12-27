import { format } from 'date-fns';

export const FULL_DATE_TIME = 'yyyy.MM.dd HH:mm';

export default function useDateFormat(
  date: Date | string,
  formatStr = FULL_DATE_TIME,
) {
  const val = typeof date === 'string' ? new Date(date) : date;
  return format(val, formatStr);
}
