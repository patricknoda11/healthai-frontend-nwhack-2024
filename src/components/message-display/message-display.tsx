import { useContext } from "react";
import { AppContext } from "../../contexts/message-log-context";
import MessageBox from "../message-box/message-box";

export default function MessageDisplay() {
    const messageLogContext = useContext(AppContext);

    return (
<div className="message-display" style={{display:"flex", flexDirection:"column", gap: "10px"}}>            {(messageLogContext ?? {messages:[]}).messages.map((message, index) => (
                <MessageBox key={index} role={message.role} message={message.content} />
            ))}
        </div>
    );

}