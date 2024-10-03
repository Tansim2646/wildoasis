import { formatDistance, parseISO, toDate } from "date-fns";
import { differenceInDays } from "date-fns";
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(dateStr1), parseISO(dateStr2));
export const formatDistanceFromNow = (dateStr) => {
  return formatDistance(parseISO(dateStr), new Date(), { addSuffix: true })
    .replace("about", "")
    .replace("in", "In");
};
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
export function getToday(options = {}){
  const today = new Date();
  if(options?.end)
     today.setUTCHours(23,59,59,999);
  today.setUTCHours(0,0,0,0);
  return today.toISOString();
}