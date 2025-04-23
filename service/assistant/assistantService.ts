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

export const updateAssistantName = async (id: string, data: {name: string}) => {
    try{
        const response = await api.put(`/assists/${id}/update-name`, data);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const updateAssistantModel = async (id: string, data: {firstMessage: string, prompt: string, language: string, voice: string, maxTokens: number}) => {
    try{
        const response = await api.put(`/assists/${id}/configure`, data);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const assignPhoneNumber = async (id: string, data: {phoneNumberId: string}) => {
    try {
        const response = await api.put(`/assists/${id}/assign-number`, data)
        return response.data;
    } catch (error) {
        throw error as ErrorResponse
    }
}

export const unassignPhoneNumber = async (id: string, data: {phoneNumberId: string}) => {
    try {
        const response = await api.put(`/assists/${id}/unassign-number`, data)
        return response.data;
    } catch (error) {
        throw error as ErrorResponse
    }
}

export const publishAssistant = async (id: string) => {
    try {
        const response = await api.put(`/assists/${id}/publish-or-unpublish`)
        return response.data;
    } catch (error) {
        throw error as ErrorResponse
    }
}

export const addTool = async (id: string, data: {name: string, description: string, url: string, method: string, executionText: string, timeout: number, headers: {key: string, value: string}[], parameters: {name: string, type: string, required: boolean, description: string}[], fixedParams: {key: string, value: string}[]}) => {
    try {
        const response = await api.post(`/assists/${id}/tools`, data)
        return response.data;
    } catch (error) {
        throw error as ErrorResponse
    }
}