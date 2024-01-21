import { createContext } from 'react';
import { AssistantResponseStage, Message } from '../types/message';

export type AppContextType = {
    messages: Message[],
    addToMessageLog: (message: Message) => void,
    stage: AssistantResponseStage,
    setStage: (stage: AssistantResponseStage) => void,
    awaitingChatResponse: boolean,
    setAwaitingChatResponse: (x: boolean) => void,
}
export const AppContext = createContext<AppContextType|null>(null);

