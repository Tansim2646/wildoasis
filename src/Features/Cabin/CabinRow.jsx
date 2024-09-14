import styled from "styled-components";
import Modal from "../../Ui/Modal";
import { formatCurrency } from "../../Utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../Ui/ConfirmDelete";
import Menus from "../../Ui/Menu";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);
`;
const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "sono";
`;
const Price = styled.div`
  font-family: "sono";
  font-weight: 600;
`;
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { isPending, deleteCabin } = useDeleteCabin();
  const { insertCabin, isInserting } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  function handleDuplicate() {
    insertCabin({
      data: {
        name: `${name} (Copy)`,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
    });
  }

  return (
    <TableRow>
      <Img src={image} alt={name} />
      <CabinName>{name}</CabinName>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount === 0 ? "---" : formatCurrency(discount)}</Discount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>
            <Modal.Button opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Button>
            <Modal.Button opens="confirm-delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Button>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="edit">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>
        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resourceName="Cabin"
            disabled={isPending}
            onConfirm={() => deleteCabin(cabinId)}
          />
        </Modal.Window>
      </Modal>
    </TableRow>
  );
}

export default CabinRow;
