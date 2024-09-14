import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../Services/apiCabin";

export default function useCabins() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });
  return { isLoading, data, error };
}
