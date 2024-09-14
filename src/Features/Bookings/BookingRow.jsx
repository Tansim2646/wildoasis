import styled from "styled-components";
import Table from "../../Ui/Table";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../Utils/helpers";
import Tag from "../../Ui/Tag";
import Menus from "../../Ui/Menu";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../Ui/Modal";
import ConfirmDelete from "../../Ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "sono";
`;
const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;
const Amount = styled.div`
  font-family: "sono";
  font-weight: 500;
`;
// In this booking now React Component we are using Immeadiate desructuring of the "booking" object
function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Table.Row columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(startDate) ? "Today" : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{""}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
              >
                {isCheckingOut ? "Checking Out..." : "Check Out"}
              </Menus.Button>
            )}
            <Modal.Button opens="delete-booking">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Button>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete-booking">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
export default BookingRow;
