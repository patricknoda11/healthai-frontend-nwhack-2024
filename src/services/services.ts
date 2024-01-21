import axios, { AxiosError, AxiosResponse } from 'axios';

// Import Types:
import { Message } from '../types/message';

export enum RESPONSE_STATUS {
    Success,
    Error,
}

interface QueryResponse<T> {
    status: RESPONSE_STATUS,
    data: T
}

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

export async function sendMessage(newMessage: Message, messageLog: Message[]): 
    Promise<QueryResponse<{ response: string, questions: string[]} | string>> {

    try {
        const { data }: AxiosResponse
            = await axiosClient.post('api/', { 'user_input': newMessage.content, 'message_log': messageLog});
        return {status: RESPONSE_STATUS.Success, data };
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data) as string;
        return { status: RESPONSE_STATUS.Error, data: errorMessage };
    }
}

export async function sendAssessmentAnswers(questionAnswers: {[key: string]: string}, messageLog: Message[]): Promise<QueryResponse<string>> {
    try {
        const { data }: AxiosResponse
            = await axiosClient.post('api/assessment/', { message_history: messageLog, user_inputs: questionAnswers });
        return {status: RESPONSE_STATUS.Success, data };
    } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data) as string;
        return { status: RESPONSE_STATUS.Error, data: errorMessage };
    }
}
