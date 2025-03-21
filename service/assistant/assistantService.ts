import api from "../api";
import { ErrorResponse } from "../auth/authServices";


export const createAssistant = async (data: {name: string}) => {
    try{
        const response = await api.post("/assists", data);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const getAssistants = async () => {
    try{
        const response = await api.get("/assists");
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const getAssistantById = async (id: string) => {
    try{
        const response = await api.get(`/assists/${id}`);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

