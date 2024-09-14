/*

TODO: Prefetching should be applied to the Bookings page for optimized performance

*/
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../Services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../Utils/config";
export default function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // 1.Status Filter
  const statusFilter = searchParams.get("status");
  const status =
    statusFilter === "all" || statusFilter === null
      ? null
      : { field: "status", value: statusFilter };
  // 2 .Sortings
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };
  // 3. Page
  const selectedPage = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", status, sortBy, selectedPage],
    queryFn: () => getBookings({ status, sortBy, selectedPage }),
  });

  return { data, isLoading, error };
}
