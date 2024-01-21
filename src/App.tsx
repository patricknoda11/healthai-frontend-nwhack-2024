import { useState, useCallback} from 'react'
import { MessageLogContext } from './contexts/message-log-context'

import './App.scss'
import { Message } from './types/message'
import MessageInput from './components/message-input/message-input';
import MessageBox from './components/message-box/message-box';
import MessageDisplay from './components/message-display/message-display';

function App() {
  const [messageLog, setMessageLog] = useState<Message[]>([]);
  
  const addToMessageLog = useCallback((message: Message) => {
    setMessageLog((prev) => [...prev, message]);
  },[]);



  return (
      <MessageLogContext.Provider value={{messages: messageLog, addToMessageLog: addToMessageLog}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:"100vh"}}>
          <MessageDisplay />
          <MessageInput/>
        </div>
      </MessageLogContext.Provider>
  )
}

export default App
