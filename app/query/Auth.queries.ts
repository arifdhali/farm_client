import { ForgotPassword, getMe, Login, logout, ResetPassword } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import queryClient from "./client";


export const getMeQuery = (cookies?: string | undefined) => ({
    queryKey: ["me"],
    queryFn: () => getMe(cookies),
    retry: false,
    staleTime: 5 * 60 * 1000,
})

export const useLoginMutation = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: Login,
        onSuccess: async (e) => {
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            toast.success(e.message);
            navigate("/",{replace:true})
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}
export const useResetPasswordMutation = () => {

    return useMutation({
        mutationFn: ResetPassword,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["reset-password"] });
            toast.success(data.message)
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}
export const useForgotPasswordMutation = () => {

    return useMutation({
        mutationFn: ForgotPassword,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["forgot-password"] });
            toast.success(data.message)
        },
        onError: (err) => {
            const error: any = err;
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })
}


export const useLogoutMutation = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ["me"] });
            toast.success("Logout Successful");
            navigate("/auth/login", { replace: true });
        },
    })
}