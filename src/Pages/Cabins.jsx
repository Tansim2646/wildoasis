import AddCabin from "../Features/Cabin/AddCabin";
import CabinTable from "../Features/Cabin/CabinTable";
import CabinTableOperations from "../Features/Cabin/CabinTableOperations";
import Heading from "../Ui/Heading";
import Row from "../Ui/Row";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
