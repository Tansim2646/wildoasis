import DashboardFilter from "../Features/DashBoard/DashboardFilter";
import DashBoardLayout from "../Features/DashBoard/DashBoardLayout";
import Heading from "../Ui/Heading";
import Row from "../Ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Hello from the heading</Heading>
        <DashboardFilter />
      </Row>
      <DashBoardLayout></DashBoardLayout>
    </>
  );
}

export default Dashboard;
