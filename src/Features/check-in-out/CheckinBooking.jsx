/*

#FIXME: Mutation should be added

*/
import styled from "styled-components";
import BookingDataBox from "../Bookings/BookingDataBox";

import Row from "../../Ui/Row";
import Heading from "../../Ui/Heading";
import ButtonGroup from "../../Ui/ButtonGroup";
import Button from "../../Ui/Button";
import ButtonText from "../../Ui/ButtonText";
import CheckBox from "../../Ui/Checkbox";
import useMoveBack from "../../Hooks/useMoveBack";
import useBooking from "../Bookings/useBooking";
import Spinner from "../../Ui/Spinner";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { useSettings } from "../Settings/useSettings";
import { formatCurrency } from "../../Utils/helpers";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { checkin, isCheckingIn } = useCheckin();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  useEffect(() => {
    setConfirmPaid(booking?.[0].isPaid ?? false);
  }, [booking]);
  if (isLoading || isSettingsLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking[0];

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking[0]} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((value) => !value);
              setConfirmPaid(false);
            }}
            id="add-breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((value) => !value)}
          id="confirm"
          disabled={isCheckingIn || confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? formatCurrency(totalPrice + optionalBreakfastPrice)
            : formatCurrency(totalPrice)}
          {addBreakfast &&
            `( ${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfastPrice
            )} )`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
