import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "./client";
import { addCustomer, deleteCustomer, getCustomersList } from "@/api/customers.api";
import toast from "react-hot-toast";
import type { CreateCustomer } from "@/types/Customers.type";

export const useGetCustomersList = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: () => getCustomersList(),
    })
}



export const useAddCustomerMutation = () => {
    return useMutation({
        mutationFn: (payload: CreateCustomer) => addCustomer(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["customers"] });
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


export const useDeleteCustomerMutation = () => {
    return useMutation({
        mutationFn: deleteCustomer,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["customers"] });
            toast.success("Customer deleted successfully");
        },
        onError: (err) => {
            const error: any = err;
            toast.error(error.response.data.message);
        }

    })
}