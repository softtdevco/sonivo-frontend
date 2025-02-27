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

export const updateSubscription = async (data: {subscriptionConfigId: string}) => {
    try{
        const response = await api.put("/subscriptions/update-subscription", data);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const cancelUserSubscription = async (data: {reason: string}) => {
    try {
        const response = await api.put("/subscriptions/cancel-subscription", data);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const reactivateUserSubscription = async (data: {subscriptionConfigId: string}) => {
    try {
        const response = await api.put("/subscriptions/reactivate-subscription", data);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const getCredit = async () => {
    try{
        const response = await api.get("/credits");
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}

export const topUpCredit = async (data: {amount: number}) => {
    try{
        const response = await api.post("/credits/top-up", data);
        return response.data;
    }catch (error){
        throw error as ErrorResponse;
    }
}