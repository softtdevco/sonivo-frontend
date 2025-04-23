import api from "../api";
import { ErrorResponse } from "../auth/authServices";

export type KnowledgeBaseFile = {
  id: string;
  fileName: string;
  fileSize: number;
  fileExtention: string;
  file: {
    publicUrl: string;
    publicId: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateKnowledgeBaseData = {
  fileName: string;
  fileSize: number;
  fileExtention: string;
  file: {
    publicUrl: string;
    publicId: string;
  };
};

export const getKnowledgeBaseFiles = async () => {
  try {
    const response = await api.get("/knowledgebase");
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const createKnowledgeBaseFile = async (data: CreateKnowledgeBaseData) => {
  try {
    const response = await api.post("/knowledgebase", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const deleteKnowledgeBaseFile = async (id: string) => {
  try {
    const response = await api.delete(`/knowledgebase/${id}`);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};
