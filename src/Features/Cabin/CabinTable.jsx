import Table from "../../Ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../Ui/Spinner";
import Menus from "../../Ui/Menu";
import { useSearchParams } from "react-router-dom";
function CabinTable() {
  const { data, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();
  if (error) console.log(error.message);
  if (isLoading) return <Spinner />;
  // 1)Filtering
  let filterdData;
  if (searchParams.get("discount") === "all" || !searchParams.get("discount"))
    filterdData = data?.data;
  if (searchParams.get("discount") === "with-discount")
    filterdData = data?.data.filter((cabin) => cabin.discount > 0);
  if (searchParams.get("discount") === "no-discount")
    filterdData = data?.data.filter((cabin) => cabin.discount === 0);
  // 2) Sorting
  const sortBy = searchParams.get("sort");
  const [field, direction] = sortBy?.split("-") || [];
  const modifier = direction === "asc" ? 1 : -1;
  if (field)
    filterdData = filterdData.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2fr 1fr 1fr 1fr" role="table">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Action</div>
        </Table.Header>
        {data && (
          <Table.Body
            data={filterdData}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        )}
      </Table>
    </Menus>
  );
}

export default CabinTable;
