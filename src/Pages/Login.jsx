import styled from "styled-components";

import LoginForm from "../Features/authentication/LoginForm";
import Logo from "../Ui/Logo";
import Heading from "../Ui/Heading";
const LoginLayout = styled.main`
  min-height: 100vh;
  margin: auto 0;
  display: grid;
  grid-template-columns: 48rem;
  justify-content: center;
  align-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
export default function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}
