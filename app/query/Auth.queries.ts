import { Login } from "@/api/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: Login,
        onSuccess: (e) => {
            qc.invalidateQueries({ queryKey: ["auth"] });
            toast.success(e.message);
            navigate("/", { replace: true });
        },
        onError: (err) => {
            const error: any = err;
            if (Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}