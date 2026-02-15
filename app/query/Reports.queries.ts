import { getFarmer } from "@/api/reports.api";
import { useQuery } from "@tanstack/react-query";



export const useGetReportFarmerQuery = () => {
    return useQuery({
        queryKey: ["report-farmer"],
        queryFn: getFarmer,
    })
}