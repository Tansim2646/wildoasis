import { Login } from "../../Services/apiAuthentication";
import Button from "../../Ui/Button";
import Form from "../../Ui/Form";
import FormRowVertical from "../../Ui/FormRowVertical";
import Input from "../../Ui/Input";
import { useState } from "react";
import useLogin from "./useLogin";
import SpinnerMini from "../../Ui/SpinnerMini";
/*
    In login form autoCOmplete helps the password manager to fill the data
*/
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoginIn } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email Address">
        <Input
          type="email"
          id="email"
          autoComplete="usernmame"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoginIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoginIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button variant="primary">
          {!isLoginIn ? "Log In" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}
export default LoginForm;
