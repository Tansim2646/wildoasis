import { useMutation } from "@tanstack/react-query";
import { signup as signupapi } from "../../Services/apiAuthentication";
import toast from "react-hot-toast";
export default function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupapi,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the account from the user's email address"
      );
    },
    onerror: (error) => {
      toast.error(error.message);
    },
  });
  return { signup, isPending };
}
