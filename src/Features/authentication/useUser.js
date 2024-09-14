import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../Services/apiAuthentication";

export default function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    user,
    isLoading,
    error,
    isAuthenticated: user?.aud === "authenticated",
  };
}
