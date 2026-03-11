import { addBounus, createFarmer, deleteFarms, getFarmersList, getLastOrderID, getLfitingList, getSingleFarm, makeCompleteLifting, makeLifiting, updateFarm, viewSinglLifting } from "@/api/farm.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import queryClient from "@/query/client";
import type { AddBonusType, makeComplete, makeLifting } from "@/types/Farm";




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

export const useGetFarmersList = (filter?: any) => {
    return useQuery({
        queryKey: ["farmers", filter],
        queryFn: () => getFarmersList(filter),
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
        mutationFn: ({ updateData, farmID }: { updateData: any, farmID: number }) => updateFarm({ updateData, farmID }),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["farmers",] });
            toast.success(data?.message)
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


export const useGetLiftingList = ({ status }: { status: string }) => {
    return useQuery({
        queryKey: ["lifiting", status],
        queryFn: () => getLfitingList({ status }),
    })

}

export const useMakeLifitingMutations = () => {
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


export const useSingleLiftingQuery = ({ farm_id, order_id }: { farm_id: number, order_id: string }) => {
    return useQuery({
        queryKey: ["single-lifting", farm_id],
        queryFn: () => viewSinglLifting({ farm_id, order_id })
    })
}

export const useAddBonusMutation = () => {
    return useMutation({
        mutationFn: (payload: AddBonusType) => addBounus(payload),
        onSuccess: async (data) => {

        }
    })

};


export const useMakeCompleteMutations = () => {
    return useMutation({
        mutationFn: (payload:makeComplete ) => makeCompleteLifting(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["lifting-complete"] });
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