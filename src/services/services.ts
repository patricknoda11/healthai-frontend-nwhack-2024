import axios, { AxiosError, AxiosResponse } from 'axios';

// Import Types:
import { Message } from '../types/message';

enum RESPONSE_STATUS {
    Success,
    Error,
}

interface QueryResponse<T> {
    status: RESPONSE_STATUS,
    data: T
}

const axiosClient = axios.create({
    baseURL: '/',
});

export async function sendMessage(newMessage: Message, messageLog: Message[]): 
    Promise<QueryResponse<{ response: string, questions: string[]} | string>> {

    try {
        const { data }: AxiosResponse
            = await axiosClient.post('api/', { 'user_input': newMessage, 'message_log': messageLog});
        return {status: RESPONSE_STATUS.Success, data };
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data) as string;
        return { status: RESPONSE_STATUS.Error, data: errorMessage };
    }
}
