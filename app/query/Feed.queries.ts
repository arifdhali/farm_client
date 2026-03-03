import { addFeedAPI, deleteFeeds, deliveryFeed, editFeedAPI, getFeedListAPI, getFeedReturnedListAPI, getSingleFeedAPI, returnedFeed } from "@/api/feed.api";
import type { addFeed, editFeed, FeedDeliveryFormValues, returnFeed } from "@/types/Feed.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "./client";
import toast from "react-hot-toast";
import { deleteFarms } from "@/api/farm.api";


export const useGetFeedListQuery = () => {
    return useQuery({
        queryFn: getFeedListAPI,
        queryKey: ["feeds"]
    })
}
export const useGetFeedReturnedListQuery = () => {
    return useQuery({
        queryFn: getFeedReturnedListAPI,
        queryKey: ["feeds-returned"]
    })
}



export const useAddMutations = () => {
    return useMutation({
        mutationFn: (payload: addFeed) => addFeedAPI(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["feed"] });
            toast.success(data?.message);
        },
        onError: (err) => {
            const error: any = err;
            console.log(error)
            if (!error.fieldErrors || Object.keys(error.fieldErrors).length <= 0) {
                toast.error(error.message);
            }
        }
    })

}

export const useSingleFeedQuery = (id: number) => {
    return useQuery({
        queryKey: ["feeds", id],
        queryFn: () => getSingleFeedAPI(id),
    })
}


export const useEditMutations = () => {

    return useMutation({
        mutationFn: ({ payload, id }: { payload: editFeed, id: number }) => editFeedAPI(payload, id),
        onSuccess: async (data) => {
            await queryClient.refetchQueries({ queryKey: ["feeds"] });
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


export const useDeleteFeedMutation = () => {
    return useMutation({
        mutationFn: (id: number) => deleteFeeds(id),
        onSuccess: async (data) => {
            console.log(data);
            await queryClient.invalidateQueries({ queryKey: ["feeds"] });
            toast.success("Feed deleted successfully");
        },
        onError: (err) => {
            const error: any = err;
            toast.error(error.response.data.message);
        }

    })
}


export const useFeedReturnedMutation = () => {
    return useMutation({
        mutationFn: (payload: returnFeed) => returnedFeed(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["feeds-returned"] })
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
export const useFeedDeliveryMutation = () => {
    return useMutation({
        mutationFn: (payload: FeedDeliveryFormValues) => deliveryFeed(payload),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ["feeds"] })
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
