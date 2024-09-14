import Filter from "../../Ui/Filter";
import SortyBy from "../../Ui/SortBy";
import TableOperations from "../../Ui/TableOperations";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        fieldValue="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With-Discount" },
          { value: "no-discount", label: "No-Discount" },
        ]}
      />
      <SortyBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (Low-High)" },
          { value: "regularPrice-desc", label: "Sort By Price (High-Low)" },
          { value: "discount-asc", label: "Sort By Discount (Low-High)" },
          { value: "discount-desc", label: "Sort By Discount (High-Low)" },
        ]}
      />
    </TableOperations>
  );
}
