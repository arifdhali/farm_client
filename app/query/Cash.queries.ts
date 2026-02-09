import { addCash, addCollctions, getCashList, getCollectionList } from "@/api/cash.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import queryClient from "./client"
import toast from "react-hot-toast"
import type { AddAmount, cashType } from "@/types/Cash.type"


export const useGetCashList = () => {
    return useQuery({
        queryKey: ["cashList"],
        queryFn: getCashList,
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
export const useAddCollectionMutations = () => {
    return useMutation({
        mutationFn: (payload: AddAmount) => addCollctions(payload),
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


export const useGetCollectionsist = () => {
    return useQuery({
        queryKey: ["collections"],
        queryFn: getCollectionList,
    })
}
