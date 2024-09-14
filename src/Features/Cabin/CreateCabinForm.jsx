import { useForm } from "react-hook-form";
import Form from "../../Ui/Form";
import FormRow from "../../Ui/FormRow";
import Input from "../../Ui/Input";
import Button from "../../Ui/Button";
import TextArea from "../../Ui/TextArea";
import FileInput from "../../Ui/FileInput";
import { useCreateCabin } from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

export default function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editvalue } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { insertCabin, isInserting } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editvalue : {},
  });
  const { errors } = formState;
  const isWorking = isInserting || isUpdating;
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      return updateCabin(
        { data: { ...data, image }, cabinId: editId },
        {
          onSuccess: () => {
            reset();
            onClose?.();
          },
        }
      );
    }
    insertCabin(
      { data: { ...data, image: image } },
      {
        onSuccess: () => {
          reset();
          onClose?.();
        },
      }
    );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value should be 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            validate: (value) =>
              value <= parseInt(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <TextArea
          type="text"
          disabled={isWorking}
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="image">
        <FileInput
          accept="image/*"
          id="image"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit Cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}
