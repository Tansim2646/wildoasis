import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../Services/apiCabin";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Failed to delete cabin");
    },
  });
  return { isPending, deleteCabin: mutate };
}
