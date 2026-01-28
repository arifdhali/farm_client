import { createFarmer, getFarmers } from "@/api/farm.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import queryClient from "./client";



export const useCreateFarmerMutation = () => {
    return useMutation({
        mutationFn: createFarmer,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["farmers"] });
            toast.success(data?.message);
        },
    })
}

export const getFarmersList = () => {
    return useQuery({
        queryKey: ["farmers"],
        queryFn: getFarmers,
    })
}