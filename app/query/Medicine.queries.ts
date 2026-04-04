import { addMedicine, deleteMedicine, deliveryMedicine, getMedicineList, getSingleMedicine, updateMedicine } from "@/api/Medicine.api";
import queryClient from "@/query/client";
import type { MedicineDeliveryFormValues } from "@/types/Medicine";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useAddMedicineMutation = () => {
    return useMutation({
        mutationFn: addMedicine,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["medicines"] })
            toast.success("Medicine added successfully");
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}

export const useMedicineDeliveryMutation = () => {
    return useMutation({
        mutationFn: (payload: MedicineDeliveryFormValues) => deliveryMedicine(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["medicines"] })
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


export const useGetMedicineListQuery = () => {
    return useQuery({
        queryKey: ["medicines"],
        queryFn: getMedicineList,
    })
}


export const useGetSingleMedicine = (medicineId: number) => {
    return useQuery({
        queryKey: ["medicines", medicineId],
        queryFn: () => getSingleMedicine(medicineId),
        enabled: !!medicineId
    })

}

export const useUpdateMedicineMutation = () => {
    return useMutation({
        mutationFn: ({ updateData, id }: { updateData: any; id: number; }) => updateMedicine({ updateData, id }),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["medicines"] });

            toast.success(data?.message);
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.response.data.message);
            }
        }
    })
}

export const useDeleteMedicineMutation = () => {
    return useMutation({
        mutationFn: ({id, force_delete}:{id:number;force_delete:boolean}) => deleteMedicine(id, force_delete),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["medicines"] });
            toast.success("Medicine deleted successfully");
        },
        onError: (err) => { 
            const error: any = err;
            toast.error(error.response.data.message);
        }

    })
}