import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTranscription, getUserTranscriptions, getTranscription, deleteTranscription } from "./transcriptionsService";
import { FileItem } from "@/app/dashboard/components/uploadsList";
import type { Transcription } from "@/app/transcriptions/[id]/page";

export function useGetUserTranscriptions() {
    return useQuery<FileItem[]>({
        queryKey: ['transcriptions'],
        queryFn: () => getUserTranscriptions()
    });
}

export function useCreateTranscription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {publicId: string, publicUrl: string, fileType: string}) => createTranscription(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
        }
    });
}

export function useGetTranscription(id: string, options?: { refetchInterval?: (query: { state: { data: Transcription | undefined } }) => number | false }) {
  return useQuery<Transcription>({
    queryKey: ['transcription', id],
    queryFn: () => getTranscription(id),
    enabled: !!id,
    ...options
  });
}

export function useDeleteTranscription(options?: { onSuccess?: () => void }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTranscription(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transcriptions'] });
            options?.onSuccess?.();
        }
    });
}

