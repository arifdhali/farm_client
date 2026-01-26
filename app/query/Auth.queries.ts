import { getMe, Login } from "@/api/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


export const getMeQuery = () => ({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
})



export const useLoginMutation = () => {
    const navigate = useNavigate();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: Login,
        onSuccess: async (e) => {
            await qc.invalidateQueries({ queryKey: ["me"] });
            toast.success(e.message);
            navigate("/", { replace: true });
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors ||Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}