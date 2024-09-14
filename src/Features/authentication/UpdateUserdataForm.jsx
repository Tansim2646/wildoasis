import { useState } from "react";
import Form from "../../Ui/Form";
import FormRow from "../../Ui/FormRow";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import FileInput from "../../Ui/FileInput";
import SpinnerMini from "../../Ui/SpinnerMini";
import useUser from "./useUser";
import useUpdateuser from "./useUpdateuser";
function UpdateUserdataForm() {
  const {
    user: {
      email: userEmail,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateuser();
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    updateUser(
      { fullName: name, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email Address">
        <Input
          type="email"
          value={userEmail}
          disabled={true}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Full Name">
        <Input
          type="text"
          value={name}
          disabled={isUpdating}
          onChange={(e) => setName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Avatar Image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? "save" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}
export default UpdateUserdataForm;
