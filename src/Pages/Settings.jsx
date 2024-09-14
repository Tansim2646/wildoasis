import UpdateSettingsForm from "../Features/Settings/UpdateSettings";
import Heading from "../Ui/Heading";
import Row from "../Ui/Row";

function Settings() {
  return (
    <Row type="vertical">
      <Heading as="h1">Settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
