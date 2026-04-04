import { useMutation, useQuery } from "@tanstack/react-query"
import { getUnitList } from "@/api/unit.api"


export const useGetUnitsList = () => {
  
    return useQuery({
        queryKey: ["unit-list"],
        queryFn: () => getUnitList(),
    })
}
