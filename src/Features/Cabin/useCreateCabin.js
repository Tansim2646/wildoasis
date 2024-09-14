import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../Services/apiCabin";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: insertCabin, isPending: isInserting } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin added successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Cabin can not be added");
    },
  });
  return { insertCabin, isInserting };
}
