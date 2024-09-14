/*
======== In query client if we use {active:true} then it invalide all the active cached queries ==========
*/
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../Services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success("Successfully checked in the guests");
      navigate("/");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error("Failed to update the checkin status");
      console.error(error.message);
    },
  });
  return { checkin, isCheckingIn };
}
