import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getKnowledgeBaseFiles, 
  createKnowledgeBaseFile, 
  deleteKnowledgeBaseFile,
  KnowledgeBaseFile,
  CreateKnowledgeBaseData
} from "./knowledgeBaseService";

// Query key constants
const KNOWLEDGE_BASE_KEYS = {
  all: ['knowledgeBase'] as const,
  files: () => [...KNOWLEDGE_BASE_KEYS.all, 'files'] as const,
  file: (id: string) => [...KNOWLEDGE_BASE_KEYS.files(), id] as const,
};

// Hook to fetch all knowledge base files
export const useKnowledgeBaseFiles = () => {
  return useQuery({
    queryKey: KNOWLEDGE_BASE_KEYS.files(),
    queryFn: getKnowledgeBaseFiles,
  });
};

// Hook to create a new knowledge base file
export const useCreateKnowledgeBaseFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateKnowledgeBaseData) => createKnowledgeBaseFile(data),
    onSuccess: () => {
      // Invalidate and refetch the files list after a successful creation
      queryClient.invalidateQueries({ queryKey: KNOWLEDGE_BASE_KEYS.files() });
    },
  });
};

// Hook to delete a knowledge base file
export const useDeleteKnowledgeBaseFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteKnowledgeBaseFile(id),
    onSuccess: () => {
      // Invalidate and refetch the files list after a successful deletion
      queryClient.invalidateQueries({ queryKey: KNOWLEDGE_BASE_KEYS.files() });
    },
    onMutate: async (id) => {
      // Optimistic update: remove the file from the cache before the server responds
      await queryClient.cancelQueries({ queryKey: KNOWLEDGE_BASE_KEYS.files() });
      
      // Get the current files from the cache
      const previousFiles = queryClient.getQueryData<KnowledgeBaseFile[]>(KNOWLEDGE_BASE_KEYS.files());
      
      if (previousFiles) {
        // Update the cache with the file removed
        queryClient.setQueryData(
          KNOWLEDGE_BASE_KEYS.files(),
          previousFiles.filter(file => file.id !== id)
        );
      }
      
      return { previousFiles };
    },
    onError: (_, __, context) => {
      // If the mutation fails, restore the previous files data
      if (context?.previousFiles) {
        queryClient.setQueryData(KNOWLEDGE_BASE_KEYS.files(), context.previousFiles);
      }
    },
  });
};
