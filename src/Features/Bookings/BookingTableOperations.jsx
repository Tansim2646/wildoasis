import TableOperations from "../../Ui/TableOperations";
import Filter from "../../Ui/Filter";
import SortBy from "../../Ui/SortBy";
export default function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        fieldValue="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked In" },
          { value: "checked-out", label: "Chekced Out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort By Date (recent first)" },
          { value: "startDate-asc", label: "Sort By Date (oldest first" },
          { value: "totalPrice-asc", label: "Sort By Price (low to high)" },
          { value: "totalPrice-desc", label: "Sort By Price (high to low)" },
        ]}
      />
    </TableOperations>
  );
}
