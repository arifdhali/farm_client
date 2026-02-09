import { useMutation, useQuery } from "@tanstack/react-query"
import queryClient from "./client"
import toast from "react-hot-toast"
import { addMortality, getMoralityList } from "@/api/mortality.api"


export const useGetMoralityListQuery = () => {
    return useQuery({
        queryKey: ["mortality"],
        queryFn: getMoralityList,
    })
}

export const useAddMoratlityMutations = () => {
    return useMutation({
        mutationFn: (payload: any) => addMortality(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["mortality"] });
            toast.success(data?.message)
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}

