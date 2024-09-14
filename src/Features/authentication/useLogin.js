import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginByEmail } from "../../Services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoginIn } = useMutation({
    mutationFn: ({ email, password }) => LoginByEmail({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLoginIn };
}
