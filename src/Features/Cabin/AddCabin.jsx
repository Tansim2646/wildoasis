import CreateCabinForm from "./CreateCabinForm";
import Button from "../../Ui/Button";
import Modal from "../../Ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Button opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Button>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
