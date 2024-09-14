import Form from "../../Ui/Form";
import FormRow from "../../Ui/FormRow";
import Input from "../../Ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../Ui/Spinner";
import { useUpdateSettings } from "./useUpdateSettings";

export default function UpdateSettingsForm() {
  const {
    settings: {
      minimumBookingLength,
      maxBookingLength,
      maxNumberofGuestPerBook,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  const { isPending, updateSetting } = useUpdateSettings();
  function handleUpadate(e, fieldName) {
    const value = e.target.value;
    if (!value) return;
    updateSetting({ [fieldName]: value });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumBookingLength}
          disabled={isPending}
          onBlur={(e) => handleUpadate(e, "minimumBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isPending}
          onBlur={(e) => handleUpadate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxNumberofGuestPerBook}
          onBlur={(e) => handleUpadate(e, "maxNumberofGuestPerBook")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Breakfast Price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isPending}
          onBlur={(e) => handleUpadate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}
