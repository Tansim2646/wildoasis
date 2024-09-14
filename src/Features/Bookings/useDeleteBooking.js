import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteThisBooking } from "../../Services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteThisBooking,
    onSuccess: () => {
      toast.success(`Booking has been successfully deleted 😍`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => {
      toast.error(`Failed to delete the booking with booking id`);
    },
  });
  return { deleteBooking, isDeletingBooking };
}
