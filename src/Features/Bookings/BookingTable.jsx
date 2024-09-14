import Table from "../../Ui/Table";
import BookingRow from "./BookingRow";
import useBookings from "./useBookings";
import Spinner from "../../Ui/Spinner";
import Pagination from "../../Ui/Pagination";
import Menus from "../../Ui/Menu";
function BookingTable() {
  const { data: { data: bookingData, count } = {}, isLoading } = useBookings();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
        </Table.Header>
        <Table.Body
          data={bookingData}
          render={(booking, index) => (
            <BookingRow key={index} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
export default BookingTable;
