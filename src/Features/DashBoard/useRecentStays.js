import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../Services/apiBookings";

export default function useRecentStays(){
    const [searchParams,setSearchParams] = useSearchParams();
    const numofdays = searchParams.get('last') ? Number(searchParams.get('last')) : 7;
    // we need to convert this night to the exact date
    const queryDate = subDays(new Date(),numofdays).toISOString();
    // react query
    const {data:stays,isLoading} = useQuery({
        queryFn:()=>getStaysAfterDate(queryDate),
        queryKey:["stays",`last-${numofdays}-days`],
    });
    const confirmedStays = stays?.filter((stay)=>stay.status === 'checked-in' || stay.status === 'checked-out');
    return {stays,confirmedStays,isLoading,numofdays};
}