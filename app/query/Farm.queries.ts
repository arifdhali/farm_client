import { createFarmer, deleteFarms, getFarmersList, getSingleFarm } from "@/api/farm.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import queryClient from "./client";




export const useCreateFarmerMutation = () => {
    return useMutation({
        mutationFn: createFarmer,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["farmers"] });
            toast.success(data.message)
        },
        onError: (err) => {
            console.log(err);
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.response.data.message);
            }
        }
    })
}

export const getFarmersListList = () => {
    return useQuery({
        queryKey: ["farmers"],
        queryFn: getFarmersList,
    })
}

export const useGetSingleFarm = (farmId: number) => {

    return useQuery({
        queryKey: ["farmers", farmId],
        queryFn: () => getSingleFarm(farmId),
        enabled: !!farmId
    })

}

export const useUpdateFarmerMutation = () => { }


export const useDeleteFarmMutation = () => {
    return useMutation({
        mutationFn: deleteFarms,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["farmers"] });
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        }

    })
}