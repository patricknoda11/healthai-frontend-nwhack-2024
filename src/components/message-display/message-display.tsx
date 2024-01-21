import { useContext } from "react";
import { MessageLogContext, MessageLogContextType } from "../../contexts/message-log-context";
import MessageBox from "../message-box/message-box";

interface MessageDisplayProps {
}

export default function MessageDisplay() {
    const messageLogContext = useContext(MessageLogContext) as MessageLogContextType;

    return (
        <div className="message-display" style={{display:"flex", flexDirection:"column", gap: "10px"}}>
            {messageLogContext.messages.map((message, index) => (
                <MessageBox key={index} role={message.role} message={message.content} />
            ))}
        </div>
    );

}