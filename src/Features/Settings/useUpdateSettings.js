import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../Services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings(){
    const queryClient = useQueryClient();
    const {mutate:updateSetting,error,isPending} = useMutation({
        mutationFn:updateSettings,
        onSuccess:()=>{
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey:["settings"]
            })
        },
        onError:()=>{
            toast.error("An error occured while updating settings");
        }

    });
    return {updateSetting,error,isPending};
}