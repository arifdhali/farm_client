import { getMeQuery } from "@/query/Auth.queries";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => useQuery(getMeQuery());


