import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./client";
import type { ReactNode } from "react";

const queryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}
export default queryProvider;