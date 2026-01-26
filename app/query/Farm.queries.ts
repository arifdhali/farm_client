import { createFarmer } from "@/api/farm.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";



export const useCreateFarmerMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createFarmer,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["farmers"] });
        },
    })
}