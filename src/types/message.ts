export enum AssistantResponseStage {
    Asessing,
    Questioning,
    Instructing,
}

export interface Message {
    role: string;
    content: string;
}
