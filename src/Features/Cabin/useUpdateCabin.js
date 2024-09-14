import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../Services/apiCabin";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateCabin, isUpdating };
}
