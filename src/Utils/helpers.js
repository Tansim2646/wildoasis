import { formatDistance, parseISO } from "date-fns";
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
export const serverResponseMimic = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};
