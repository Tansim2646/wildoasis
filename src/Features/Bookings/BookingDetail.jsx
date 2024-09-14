import styled from "styled-components";
import Row from "../../Ui/Row";
import Heading from "../../Ui/Heading";
import Tag from "../../Ui/Tag";
import ButtonText from "../../Ui/ButtonText";
import ButtonGroup from "../../Ui/ButtonGroup";
import Button from "../../Ui/Button";
import useMoveBack from "../../Hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import useBooking from "./useBooking";
import Spinner from "../../Ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../Ui/Modal";
import ConfirmDelete from "../../Ui/ConfirmDelete";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
export default function BookingDetail() {
  // this is used oly for demo purpose
  const navigate = useNavigate();
  const { booking, isLoading, error } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  const { id: BookingId, status } = booking[0];
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {BookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking[0]} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${BookingId}`)}
          >
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variation="primary"
            onClick={() => checkout(BookingId)}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Checking Out..." : "Check Out"}
          </Button>
        )}
        <Modal>
          <Modal.Button opens="delete-booking-2">
            <Button variation="danger">Delete</Button>
          </Modal.Button>
          <Modal.Window name="delete-booking-2">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(BookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
