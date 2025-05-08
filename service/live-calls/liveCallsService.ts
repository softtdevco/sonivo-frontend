import api from "../api"
import { ErrorResponse } from "../auth/authServices";


export const getSocketUrl = async (assistId: string) => {
    try {
        const reponse = await api.get(`/call/web-assist/${assistId}`);
        return reponse.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}