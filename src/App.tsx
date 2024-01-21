import { useState, useCallback} from 'react'
import { AppContext } from './contexts/message-log-context'

import './App.scss'
import { AssistantResponseStage, Message } from './types/message'
import MessageInput from './components/message-input/message-input';
import MessageBox from './components/message-box/message-box';
import MessageDisplay from './components/message-display/message-display';

function App() {
  const [messageLog, setMessageLog] = useState<Message[]>([]);
  const [stage, setStage] = useState<AssistantResponseStage>(AssistantResponseStage.Asessing);
  const [awaitingChatResponse, setAwaitingChatResponse] = useState<boolean>(false);
  const [assassingQuestions, setAssassingQuestions] = useState<{[key: string]: string}>({});
  
  const addToMessageLog = useCallback((message: Message) => {
    setMessageLog((prev) => [...prev, message]);
  },[]);

  return (
      <AppContext.Provider value={{
        messages: messageLog,
        addToMessageLog: addToMessageLog,
        stage,
        setStage,
        awaitingChatResponse,
        setAwaitingChatResponse,
        assassingQuestions,
        setAssassingQuestions
        }}>
 <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:"100vh"}}>
          <MessageDisplay />
          <MessageInput/>
        </div>
      </AppContext.Provider>
  )
}

export default App
