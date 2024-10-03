import DashboardFilter from "../Features/DashBoard/DashboardFilter";
import DashBoardLayout from "../Features/DashBoard/DashBoardLayout";
import useRecentBookings from "../Features/DashBoard/useRecentBookings";
import useCabins from "../Features/Cabin/useCabins";

import Heading from "../Ui/Heading";
import Spinner from "../Ui/Spinner";
import Row from "../Ui/Row";
import useRecentStays from "../Features/DashBoard/useRecentStays";
import Stats from "../Features/DashBoard/Stats";
import SalesChart from "../Features/DashBoard/Saleschart";
import DurationChart from "../Features/DashBoard/DurationChart";
import TodayActivity from "../Features/check-in-out/TodayActivity";

function Dashboard() {
  const {bookings,isLoading} = useRecentBookings();
  const {stays,isLoading:isloading2,confirmedStays,numofdays} = useRecentStays();
  const {data:cabin,isLoading:isLoading3} = useCabins();
  if(isLoading || isloading2 || isLoading3) return <Spinner />
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashBoardLayout>
        <Stats bookings={bookings} confirmedStays={confirmedStays} numOfDays={numofdays} numOfCabins={cabin?.data?.length}/>
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart bookings={bookings} numOfDays={numofdays} />
      </DashBoardLayout>
    </>
  );
}

export default Dashboard;
