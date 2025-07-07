import { format, parseISO } from 'date-fns';

export const formatDate = (isoString: string): string => {
  return format(parseISO(isoString), 'dd/MM/yyyy HH:mm:ss');
};
