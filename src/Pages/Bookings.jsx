import BookingTable from "../Features/Bookings/BookingTable";
import BookingTableOperations from "../Features/Bookings/BookingTableOperations";
import Heading from "../Ui/Heading";
import Row from "../Ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
