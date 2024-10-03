import { useQuery } from "@tanstack/react-query";
import { getTodaysActivity } from "../../Services/apiBookings";

export default function useActivityToday(){
    const {isLoading,data:activities,error} = useQuery({
        queryKey:["Toda's Activity"],
        queryFn:getTodaysActivity
    });
    return {isLoading,activities,error};
}