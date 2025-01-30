import api from "../api";
import { ErrorResponse } from "../auth/authServices";

export const getUserTranscriptions = async () => {
    try {
        const response = await api.get("/transcriptions");
        return response.data.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const createTranscription = async (data: {publicId: string, publicUrl: string, fileType: string}) => {
    try {
        const response = await api.post("/transcriptions", data);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const getTranscription = async (id: string) => {
    try {
         const response = await api.get(`/transcriptions/${id}`);
         return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
   
    
};

export const deleteTranscription = async (id: string) => {
    try {
        const response = await api.delete(`/transcriptions/${id}`);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
};

export const getTranscriptionSummary = async (id: string) => {
    try {
        const response = await api.get(`/transcriptions/${id}/summary`);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
 

};

export const getTranscriptionInsight = async (id: string) => {
    try {
        const response = await api.get(`/transcriptions/${id}/insight`);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
};

