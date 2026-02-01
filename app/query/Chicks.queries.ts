import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "./client";
import { getDeliveredList, makeChicksDelivery } from "@/api/chicks.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { DeliveryFormValues } from "@/types/Chicks";


export const useChickDeliveryMutation = () => {
    let navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: DeliveryFormValues) => makeChicksDelivery(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["chicks"] });
            navigate("/chicks/list", { replace: true });
            toast.success(data.message);

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

export const useGetDeliveredListQuery = () => {
    return useQuery({
        queryKey: ["chicks", "delivered"],
        queryFn: getDeliveredList,
    })
}