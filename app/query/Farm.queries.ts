import { createFarmer, getFarmers } from "@/api/farm.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";



export const useCreateFarmerMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createFarmer,
        onSuccess: (data) => {
            qc.invalidateQueries({ queryKey: ["farmers"] });
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