import { useQuery } from "@tanstack/react-query";
import { getSocketUrl } from "./liveCallsService";

export function useGetSocketUrl(assitId: string) {
    return useQuery ({
        queryKey: ["socketUrl"],
        queryFn: () => getSocketUrl(assitId)
    })
}