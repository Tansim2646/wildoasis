import SignupForm from "../Features/authentication/SignupForm";
import Heading from "../Ui/Heading";
import Row from "../Ui/Row";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Create a new user</Heading>
      </Row>
      <SignupForm />
    </>
  );
}

export default Users;
