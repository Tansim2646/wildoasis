import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../Services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: () => {
      toast.success(`Guest has been successfully checked out 😍`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`Failed to checkout the guest with booking id`);
    },
  });
  return { checkout, isCheckingOut };
}
