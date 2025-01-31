import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTranscription, getUserTranscriptions, getTranscription, deleteTranscription, getTranscriptionSummary, getTranscriptionInsight } from "./transcriptionsService";
import { FileItem } from "@/app/dashboard/components/uploadsList";
import type { Transcription } from "@/app/transcriptions/[id]/page";
import { UseQueryOptions } from "@tanstack/react-query";

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

export function useGetTranscription(id: string, options?: Omit<UseQueryOptions<Transcription>, 'queryKey' | 'queryFn'>) {
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

interface SummaryResponse {
    transctriptionSummary: string;
    createdAt: string;
    duration: string;
}

export function useGetTranscriptionSummary(
  id: string, 
  options?: Omit<UseQueryOptions<SummaryResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['transcription-summary', id],
    queryFn: () => getTranscriptionSummary(id),
    ...options
  });
}

interface InsightResponse {
 transcriptionInsight: string;
 createdAt: string;
 duration: string;
}

export function useGetTranscriptionInsight(
  id: string, 
  options?: Omit<UseQueryOptions<InsightResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['transcription-insight', id],
    queryFn: () => getTranscriptionInsight(id),
    ...options
  });
}

