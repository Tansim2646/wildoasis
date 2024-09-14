import UpdatePasswordForm from "../Features/authentication/UpdatePasswordForm";
import UpdateUserdataForm from "../Features/authentication/UpdateUserdataForm";
import Heading from "../Ui/Heading";
import Row from "../Ui/Row";
export default function Account() {
  return (
    <>
      <Heading as="h1">Update Your Account</Heading>
      <Row>
        <Heading as="h3">Update User Data</Heading>
        <UpdateUserdataForm />
      </Row>
      <Row>
        <Heading as="h3">Update Password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}
