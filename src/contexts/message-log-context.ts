import { createContext } from 'react';
import { Message } from '../types/message';

export type MessageLogContextType = {
    messages: Message[],
    addToMessageLog: (message: Message) => void
}
export const MessageLogContext = createContext<MessageLogContextType|null>(null);

