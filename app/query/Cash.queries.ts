import { addCash, addCollections, editCollections, getCashList, getCollectionList, getCollectionSingle } from "@/api/cash.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import queryClient from "./client"
import toast from "react-hot-toast"
import type { AddAmount, cashType } from "@/types/Cash.type"


export const useGetCashList = (filter: any) => {
    console.log(filter)
  
    return useQuery({
        queryKey: ["cashList", filter],
        queryFn: () => getCashList(filter),
    })
}

export const useAddCashMutations = () => {
    return useMutation({
        mutationFn: (payload: cashType) => addCash(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cashList"] });
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
export const useGetCollectionsListByID = (id: number) => {
    return useQuery({
        queryKey: ["payments", id],
        queryFn: () => getCollectionSingle(id),
        enabled: !!id
    })
}

export const useGetCollectionsUpdateMutations = () => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) => editCollections({ id, payload }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
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

export const useAddCollectionMutations = () => {
    return useMutation({
        mutationFn: (payload: AddAmount) => addCollections(payload),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cashList"] });
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


export const useGetCollectionsList = () => {
    return useQuery({
        queryKey: ["collections"],
        queryFn: getCollectionList,
    })
}
