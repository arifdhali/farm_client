import { createFarmer, deleteFarms, getFarmersList, getLastOrderID, getLfitingList, getSingleFarm, makeLifiting, updateFarm } from "@/api/farm.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import queryClient from "./client";
import type { makeLifting } from "@/types/Farm";




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

export const useGetFarmersList = () => {
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

export const useGetLastOrderID = (farmId: number) => {
    return useQuery({
        queryKey: ["last-order-id", farmId],
        queryFn: () => getLastOrderID(farmId),
        enabled: !!farmId
    });
}

export const useUpdateFarmerMutation = () => {

    return useMutation({
        mutationFn: updateFarm,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["farmers",] });
            // toast.success()
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.response.data.message);
            }
        }
    })

}


export const useDeleteFarmMutation = () => {
    return useMutation({
        mutationFn: deleteFarms,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["farmers"] });
            toast.success("Farm deleted successfully");
        },
        onError: (err) => {
            const error: any = err;
            toast.error(error.response.data.message);
        }

    })
}


export const useGetLiftingList = () => {
    return useQuery({
        queryKey:["lifiting"],
        queryFn:getLfitingList,
    })

}

export const useLifitingMutations = () => {
    return useMutation({
        mutationFn: (payload: makeLifting) => makeLifiting(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["lifting"] });
            toast.success(data?.message);
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}