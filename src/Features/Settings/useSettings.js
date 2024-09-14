import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../Services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, isLoading, error };
}
