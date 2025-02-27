import api from "../api"
import { ErrorResponse } from "../auth/authServices";
import { createSubscriptionData } from "./subscription";


export const getSubscriptionConfig = async () => {
    try{
        const response = await api.get("/configs");
        return response.data
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const createSubscription = async (data: createSubscriptionData) => {
    try{
        const response = await api.post("/subscriptions/create-subscription", data);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const getUserSubscription = async ()=> {
    try{
        const response = await api.get("/subscriptions/my-subscription");
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const getSubscriptionHistories = async ()=> {
    try{
        const response = await api.get("/subscriptions/subscription-history");
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}
