import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTool, assignPhoneNumber, createAssistant, getAssistantById, getAssistants, publishAssistant, unassignPhoneNumber, updateAssistantModel, updateAssistantName } from "./assistantService";
import { ErrorResponse } from "../auth/authServices";

export function useCreateAssistant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {name: string}) => createAssistant(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants"]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
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

export function useUpdateAssistantName(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {name: string}) => updateAssistantName(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants", id]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
        }
    })
}

export function useUpdateAssistantModel(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {firstMessage: string, prompt: string, language: string, voice: string, maxTokens: number}) => updateAssistantModel(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants", id]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
        }
    })
}

export function useUnassignPhoneNumber(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {phoneNumberId: string}) => unassignPhoneNumber(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants", id]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
        }
    })
}

export function useAssignPhoneNumber(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {phoneNumberId: string}) => assignPhoneNumber(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants", id]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
        }
    })
}

export function usePublishAssistant(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => publishAssistant(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants", id]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
        }
    })
}

export function useAddTool(id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {name: string, description: string, url: string, method: string, executionText: string, timeout: number, headers: {key: string, value: string}[], parameters: {name: string, type: string, required: boolean, description: string}[], fixedParams: {key: string, value: string}[]}) => addTool(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assistants", id]});
        },
        onError: (error: ErrorResponse) => {
            throw error;
        }
    })
}
