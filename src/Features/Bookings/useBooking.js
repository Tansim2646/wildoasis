import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../Services/apiBookings";
import { useParams } from "react-router-dom";
/*

  FIXME: Here in this querykey we also need to add the booking Id otherwise it will consider the same key for all the booking and that might introduce a a problem like data persisting for a short amout of time

*/
export default function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { booking, isLoading, error };
}
