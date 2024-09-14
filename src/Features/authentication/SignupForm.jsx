import Form from "../../Ui/Form";
import FormRow from "../../Ui/FormRow";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import SpinnerMini from "../../Ui/SpinnerMini";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";
export default function SignupForm() {
  const { register, getValues, formState, handleSubmit, reset } = useForm();
  const { signup, isPending: isSigninigup } = useSignup();
  const { errors } = formState;
  function onSubmission({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmission)}>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email Address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 character)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>
      <FormRow label="Repeat Password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Passoword does not match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigninigup}>
          {!isSigninigup ? "Create new user" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}
