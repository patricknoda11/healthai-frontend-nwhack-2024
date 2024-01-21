import { useState, useCallback} from 'react'
import { MessageLogContext } from './contexts/message-log-context'

import { Message } from './types/message'
import MessageBox from './components/message-box/message-box';
import MessageDisplay from './components/message-display/message-display';

function App() {
  const [messageLog, setMessageLog] = useState<Message[]>([]);

  const addToMessageLog = useCallback((message: Message) => {
    setMessageLog((prev) => [...prev, message]);
  },[]);



  return (
      <MessageLogContext.Provider value={{messages: messageLog, addToMessageLog: addToMessageLog}}>
        <MessageDisplay />
      </MessageLogContext.Provider>
  )
}

export default App
