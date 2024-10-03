import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../Utils/helpers";
export default function Stats({bookings,confirmedStays,numOfDays,numOfCabins}){
    // 1) total booking
    const totalBooking = bookings?.length;
    // 2) Total Sales Amount
    const totalSale = bookings?.reduce((acc,curr)=>acc + curr.totalPrice,0);
    // 3) number of checkins
    const checkins = confirmedStays?.length;
    // 4) Occupancy Rate is the number of occupation / the number of nights available
    // Here the number of occupation means (Number of nights * number of cabins)
    //  We got confirmed stays from the booking table which has removed all unconfirmed bookings
    // so the total booked nights will be the the bights occupied by these guests
    const occupation = confirmedStays.reduce((acc,curr)=>acc+curr.numNights,0);
    const occupancyRate = occupation / (numOfDays * numOfCabins);

    return(
        <>
            <Stat color="blue" title="Bookings" value={totalBooking} icon={<HiOutlineBriefcase />} />
            <Stat color="green" title="Sales" value={formatCurrency(Math.round(totalSale))} icon={<HiOutlineBanknotes />} />
            <Stat color="indigo" title="Check In's" value={checkins} icon={<HiOutlineCalendarDays />} />
            <Stat color="yellow" title="Total Occupancy" value={`${Math.round(occupancyRate * 100)}%`} icon={<HiOutlineChartBar />} />
        </>
    )
}