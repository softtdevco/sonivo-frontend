import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAssistant, getAssistantById, getAssistants } from "./assistantService";

export function useCreateAssistant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {name: string}) => createAssistant(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants"]});
        }
    })
}

export function useGetAssistants() {
    return useQuery({
        queryKey: ["assistants"],
        queryFn: () => getAssistants()
    })
}

export function useGetAssistantById(id: string) {
    return useQuery({
        queryKey: ["assistants", id],
        queryFn: () => getAssistantById(id)
    })
}

