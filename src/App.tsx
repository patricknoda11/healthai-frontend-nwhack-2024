import { useState, useCallback} from 'react'
import { MessageLogContext } from './contexts/message-log-context'

import './App.css'
import { Message } from './types/message'

function App() {
  const [messageLog, setMessageLog] = useState<Message[]>([]);

  const addToMessageLog = useCallback((message: Message) => {
    setMessageLog((prev) => [...prev, message]);
  },[]);



  return (
      <MessageLogContext.Provider value={{messages: messageLog, addToMessageLog: addToMessageLog}}>
        
      </MessageLogContext.Provider>
  )
}

export default App
