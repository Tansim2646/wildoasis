import styled from "styled-components";
import useUser from "../Features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/*
 
 FIXME: Steps involved in the protecting route
 1. Load the authenticated user . It is considered a godd practice if we check the user is authenticated or not in the protected route from the server
 2. While loading the user, show a spinner in a full page component.Here we are using Styled compoenents
 3. if the user is authenticated, show the child components
 4. If the user is not authenticated, redirect the user to the login page
 
*/
const FullPage = styled.div`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) return children;
}
